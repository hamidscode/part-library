import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NoticeProxy {
  constructor() {}

  public sendReserveNotification(requester: string) {
    Logger.log(`Sending Success Reservation notification to ${requester}... Email, SMS, Push Notification, In App Notification, etc`);
  }

  public sendRejectRequestNotification(requester: string) {
    Logger.log(`Sending Rejected notification to ${requester}... Email, SMS, Push Notification, In App Notification, etc`);
  }
}
