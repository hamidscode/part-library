import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { BookRequestMapper } from 'domain/services';
import { BookRequestInterface } from 'infrastructure/interfaces';
import { BookRequestEntity } from 'domain/models';
import { CreateBookRequestCommand } from 'application/services';
import { ProcessBookProxy } from 'application/services/proxies';

@Injectable()
export class BookRequestUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly processBookProxy: ProcessBookProxy,
  ) {}

  async requestOneBook(bookRequest: BookRequestInterface) {
    const savedRequest = await this.commandBus.execute<
      CreateBookRequestCommand,
      BookRequestEntity
    >(
      new CreateBookRequestCommand(
        BookRequestMapper.convertRequestToEntity(bookRequest),
      ),
    );
    bookRequest.id = savedRequest.id;
    this.processBookProxy.processRequestBook(bookRequest);
    return savedRequest;
  }
}
