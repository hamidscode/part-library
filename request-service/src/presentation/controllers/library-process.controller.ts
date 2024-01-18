import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { BookProcessResultInterface } from 'infrastructure/interfaces';
import { BookReservationUseCase } from 'application/use-cases';

@Controller()
export class LibraryProcessController {
  constructor(
    private readonly bookReservationUseCase: BookReservationUseCase,
  ) {}

  @MessagePattern('book.process.result')
  async request(
    @Payload() bookRequest: BookProcessResultInterface,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.bookReservationUseCase.ReserveOneBook(bookRequest);
      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();
      channel.ack(orginalMessage);
    } catch (error) {
      Logger.error(error);
    }
  }
}
