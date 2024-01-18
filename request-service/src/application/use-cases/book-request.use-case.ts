import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BookRequestMapper } from 'domain/services';
import { BookRequestInterface } from 'infrastructure/interfaces';
import { BookRequestEntity } from 'domain/models';
import {
  CreateBookRequestCommand,
  GetBookRequestQuery,
  GetAllBookRequestsQuery,
} from 'application/services';
import { ProcessBookProxy } from 'application/services/proxies';
import { ReservationStatusEnum } from 'infrastructure/enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  REQUEST_FAILED_QUEUE,
  RETRY_REQUEST_JOB,
} from 'infrastructure/constants';
import { findAndCountAll } from 'infrastructure/database';

@Injectable()
export class BookRequestUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly processBookProxy: ProcessBookProxy,
    @InjectQueue(REQUEST_FAILED_QUEUE)
    private readonly retryQueue: Queue,
  ) {}

  async requestOneBook(bookRequest: BookRequestInterface) {
    const reservedBook = await this.queryBus.execute<
      GetBookRequestQuery,
      BookRequestEntity
    >(
      new GetBookRequestQuery(
        {
          requested_book: bookRequest.requested_book,
          requester_name: bookRequest.requester_name,
        },
        ReservationStatusEnum.Reserved,
      ),
    );
    if (reservedBook) {
      throw new NotAcceptableException('Book already reserved for you');
    }

    const pendingRequest = await this.queryBus.execute<
      GetBookRequestQuery,
      BookRequestEntity
    >(
      new GetBookRequestQuery(
        {
          requested_book: bookRequest.requested_book,
          requester_name: bookRequest.requester_name,
        },
        ReservationStatusEnum.Pending,
      ),
    );
    if (pendingRequest) {
      throw new NotAcceptableException(
        'Book already requested for you and pending to process.',
      );
    }

    const newRequest = await this.commandBus.execute<
      CreateBookRequestCommand,
      BookRequestEntity
    >(
      new CreateBookRequestCommand(
        BookRequestMapper.convertRequestToEntity(bookRequest),
      ),
    );
    bookRequest.id = newRequest.id;
    await this.retryQueue.add(RETRY_REQUEST_JOB, bookRequest, {
      delay: 120 * 1000, // 2 minutes
      removeOnComplete: false,
      jobId: bookRequest.id,
      attempts: 10,
      backoff: 120 * 1000, // 2 minutes
    });
    this.processBookProxy.processRequestBook(bookRequest);
    return newRequest;
  }

  async getRequestById(id: string) {
    const request = await this.queryBus.execute<
      GetBookRequestQuery,
      BookRequestEntity
    >(new GetBookRequestQuery({ id }));
    if (!request) {
      throw new NotAcceptableException('Book request not found');
    }
    return request;
  }

  async getMyRequests(requesterName: string) {
    const requests = await this.queryBus.execute<
      GetAllBookRequestsQuery,
      findAndCountAll<BookRequestEntity>
    >(new GetAllBookRequestsQuery(requesterName));
    return requests;
  }
}
