import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ChangeBookRequestStatusEvent } from './change-book-request-status.event';
import { Logger } from '@nestjs/common';
import { NoticeProxy } from 'application/services';
import { ReservationStatusEnum } from 'infrastructure/enum';

@EventsHandler(ChangeBookRequestStatusEvent)
export class ChangeBookRequestStatusEventHandler
  implements IEventHandler<ChangeBookRequestStatusEvent>
{
  constructor(private readonly noticeProxy: NoticeProxy) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: ChangeBookRequestStatusEvent) {
    Logger.log(
      `status of book request with id ${event.bookRequestEntity.id} changed to ${event.bookRequestEntity.status}. Assumed to update read database ...`,
    );
    if (event.bookRequestEntity.status === ReservationStatusEnum.Reserved) {
      this.noticeProxy.sendReserveNotification(
        event.bookRequestEntity.requesterName,
      );
    }
    if (event.bookRequestEntity.status === ReservationStatusEnum.Rejected) {
      this.noticeProxy.sendRejectRequestNotification(
        event.bookRequestEntity.requesterName,
      );
    }
  }
}
