import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BookRequestMapper } from 'domain/services';
import { BookRequestInterface } from 'infrastructure/interfaces';
import { BookRequestEntity } from 'domain/models';
import { CreateBookRequestCommand } from 'application/services';
import { request } from 'express';

@Injectable()
export class BookRequestUseCase {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly bookRequestMapper: BookRequestMapper,
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
    return savedRequest;
  }
}
