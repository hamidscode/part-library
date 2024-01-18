import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { BookRequestEntity } from 'domain/models';
import { BookRequestFactory } from 'domain/services';
import { ReservationStatusEnum } from 'infrastructure/enum';
import { BadRequestException } from '@nestjs/common';
import { ChangeBookRequestStatusEvent } from 'application/services';
import { ChangeBookRequestStatusCommand } from './change-book-request-status.command';

@CommandHandler(ChangeBookRequestStatusCommand)
export class ChangeBookRequestStatusHandler
  implements ICommandHandler<ChangeBookRequestStatusCommand>
{
  constructor(
    private readonly bookRequestFactory: BookRequestFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  checkBookRequestStatus(
    bookRequestEntity: BookRequestEntity,
    newStatus: ReservationStatusEnum,
  ) {
    if (
      newStatus === ReservationStatusEnum.Returned &&
      bookRequestEntity.status !== ReservationStatusEnum.Reserved
    ) {
      throw new BadRequestException(
        'you can not return a book that is not reserved',
      );
    }
    if (
      newStatus !== ReservationStatusEnum.Returned &&
      bookRequestEntity.status !== ReservationStatusEnum.Pending
    ) {
      throw new BadRequestException(
        `you can not change book request status from ${bookRequestEntity.status} to ${newStatus}`,
      );
    }
  }
  async execute({
    bookRequestEntity,
    status,
  }: ChangeBookRequestStatusCommand): Promise<BookRequestEntity> {
    this.checkBookRequestStatus(bookRequestEntity, status);
    bookRequestEntity.status = status;
    if (status === ReservationStatusEnum.Returned) {
      bookRequestEntity.returnedAt = new Date();
    }
    if (status === ReservationStatusEnum.Reserved) {
      bookRequestEntity.reservedAt = new Date();
    }
    const result =
      await this.bookRequestFactory.updateOneById(bookRequestEntity);
    const bookRequest = this.eventPublisher.mergeObjectContext(result);
    const bookRequestRejectEvent = new ChangeBookRequestStatusEvent(
      bookRequest,
    );
    bookRequest.apply(bookRequestRejectEvent);
    bookRequest.commit();
    return result;
  }
}
