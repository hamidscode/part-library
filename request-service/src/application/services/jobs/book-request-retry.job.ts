import {
  REMOVE_NO_RESULT_JOB,
  REQUEST_FAILED_QUEUE,
  RETRY_REQUEST_JOB,
} from 'infrastructure/constants/bull.constant';

import {
  ChangeBookRequestStatusCommand,
  GetBookRequestQuery,
  ProcessBookProxy,
} from 'application/services';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { BookRequestInterface } from 'infrastructure/interfaces';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BookRequestEntity } from 'domain/models';
import { ReservationStatusEnum } from 'infrastructure/enum';

@Processor(REQUEST_FAILED_QUEUE)
@Injectable()
export class BookRequestRetryJob {
  constructor(
    private readonly processBookProxy: ProcessBookProxy,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @InjectQueue(REQUEST_FAILED_QUEUE)
    private readonly retryQueue: Queue,
  ) {}

  @Process(REMOVE_NO_RESULT_JOB)
  async processRemoveNoResultJob(job: Job<BookRequestInterface>) {
    const request = job.data;
    await (await this.retryQueue.getJob(request.id)).remove();
    const bookRequest = await this.queryBus.execute<
      GetBookRequestQuery,
      BookRequestEntity
    >(
      new GetBookRequestQuery({
        id: request.id,
      }),
    );

    if (bookRequest) {
      await this.commandBus.execute(
        new ChangeBookRequestStatusCommand(
          bookRequest,
          ReservationStatusEnum.Rejected,
        ),
      );
    }
  }

  @Process(RETRY_REQUEST_JOB)
  async processRetryJob(job: Job<BookRequestInterface>) {
    const request = job.data;
    Logger.error(
      `no response for processing book: ${request.requested_book} with id: ${request.id} retrying... attempts: ${job.attemptsMade + 1}`,
    );
    this.processBookProxy.processRequestBook(request);
    if (job.attemptsMade + 1 === job.opts.attempts) {
      await this.retryQueue.add(REMOVE_NO_RESULT_JOB, request, {
        delay: 180 * 1000, // 3 minutes
        removeOnComplete: true,
        attempts: 5,
        backoff: 180 * 1000, // 3 minutes
      });
    } else {
      await job.retry();
    }
  }
}
