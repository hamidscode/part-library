import { Controller, Logger } from '@nestjs/common';
import { LibraryProcessService } from './library-process.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BookRequestInterface } from 'common/interfaces';

@Controller()
export class LibraryProcessController {
  constructor(private readonly appService: LibraryProcessService) {}

  @MessagePattern(`book.request`)
  async processRequestedBook(
    @Payload() data: BookRequestInterface,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.appService.processRequestedBook(data);
      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      channel.ack(orginalMessage);
    } catch (error) {
      Logger.error(error);
    }
  }

  @MessagePattern(`book.return`)
  async processReturnedBook(
    @Payload() data: BookRequestInterface,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.appService.processReturnBook(data);
      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      channel.ack(orginalMessage);
    } catch (error) {
      Logger.error(error);
    }
  }
}
