import { Inject, Injectable } from '@nestjs/common';
import { LIBRARY_PROCESS_SERVICE } from 'infrastructure/constants';
import { ClientProxy } from '@nestjs/microservices';
import { BookRequestInterface } from 'infrastructure/interfaces';

@Injectable()
export class ProcessBookProxy {
  constructor(
    @Inject(LIBRARY_PROCESS_SERVICE) private amqpClient: ClientProxy,
  ) {}

  public processRequestBook(bookRequest: BookRequestInterface) {
    return this.amqpClient.emit('book.request', bookRequest);
  }

  public processReturnBook(bookRequest: BookRequestInterface) {
    return this.amqpClient.emit('book.return', bookRequest);
  }
}
