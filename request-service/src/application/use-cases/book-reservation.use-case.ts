import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BookProcessResultInterface } from 'infrastructure/interfaces';
import { BookRequestEntity } from 'domain/models';
import {
  ChangeBookRequestStatusCommand,
  GetBookRequestQuery,
} from 'application/services';
import { ProcessBookProxy } from 'application/services/proxies';
import { ReservationStatusEnum } from 'infrastructure/enum';

@Injectable()
export class BookReservationUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly processBookProxy: ProcessBookProxy,
  ) {}

  async ReserveOneBook(bookProcessResult: BookProcessResultInterface) {
    const bookRequest = await this.queryBus.execute<
      GetBookRequestQuery,
      BookRequestEntity
    >(
      new GetBookRequestQuery({
        id: bookProcessResult.id,
      }),
    );
    let newStatus = ReservationStatusEnum.Rejected;
    if (bookProcessResult.exists) {
      newStatus = ReservationStatusEnum.Reserved;
    }
    const result = await this.commandBus.execute(
      new ChangeBookRequestStatusCommand(bookRequest, newStatus),
    );
    return result;
  }

  async ReturnBook(id: string) {
    const bookRequest = await this.queryBus.execute<
      GetBookRequestQuery,
      BookRequestEntity
    >(
      new GetBookRequestQuery({
        id,
      }),
    );
    if (!bookRequest) {
      throw new NotFoundException('Book reservation not found');
    }
    const result = await this.commandBus.execute(
      new ChangeBookRequestStatusCommand(
        bookRequest,
        ReservationStatusEnum.Returned,
      ),
    );
    this.processBookProxy.processReturnBook({
      id: bookRequest.id.toString(),
      requested_book: bookRequest.requestedBook,
      requester_name: bookRequest.requesterName,
      tags: bookRequest.tags,
    });
    return result;
  }
}
