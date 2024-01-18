import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BookProcessResultInterface,
  BookRequestInterface,
} from 'common/interfaces';
import { LIBRARY_REQUEST_SERVICE } from 'common/constants';
import { RedisClientType } from 'redis';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class LibraryProcessService {
  constructor(
    @Inject('REDIS_MODULE')
    private readonly redis: RedisClientType,
    @Inject(LIBRARY_REQUEST_SERVICE) private amqpClient: ClientProxy,
  ) {}

  getNormalizedBookName(bookName: string): string {
    return bookName.toLowerCase().replace(/ /g, '_');
  }
  async getExistsCount(bookName: string): Promise<number> {
    const savedCount = await this.redis.get(
      this.getNormalizedBookName(bookName),
    );
    if (isNaN(parseInt(savedCount))) {
      const existsCount = Math.floor(Math.random() * 3);
      await this.redis.set(this.getNormalizedBookName(bookName), existsCount);
      Logger.log(
        `new book requested. mock exist count of book: there are ${existsCount} books for ${bookName}`,
      );
      return existsCount;
    }
    Logger.log(`use saved book. there are ${savedCount} books for ${bookName}`);
    return parseInt(savedCount);
  }
  private processBook(bookRequest: BookRequestInterface): Promise<void> {
    return new Promise((resolve, reject) => {
      const simulateFailedState = Math.random() > 0.75;
      if (simulateFailedState) {
        Logger.log(
          `Simulate unexpected Error. Failed to process book and no response from process service for book request: ${bookRequest.requested_book} with id: ${bookRequest.id}`,
        );
        return reject(new Error('Failed to process book'));
      }
      const timeoutValue = Math.floor(Math.random() * 60);
      Logger.log(
        `Simulate response time ${timeoutValue} seconds to process book request: ${bookRequest.requested_book} with id: ${bookRequest.id}`,
      );

      setTimeout(async () => {
        const existsCount = await this.getExistsCount(
          bookRequest.requested_book,
        );
        if (existsCount > 0) {
          await this.redis.DECR(
            this.getNormalizedBookName(bookRequest.requested_book),
          );
        }

        const bookProcessResult: BookProcessResultInterface = {
          ...bookRequest,
          exists: existsCount > 0,
        };
        this.amqpClient.emit('book.process.result', bookProcessResult);

        resolve();
      }, timeoutValue * 1000);
    });
  }

  public async processRequestedBook(
    request: BookRequestInterface,
  ): Promise<void> {
    this.processBook(request)
      .then()
      .catch(async () => {
        Logger.error(
          `Failed to process book: ${request.requested_book} with id: ${request.id}. need retry from request service to process.`,
        );
      });
  }

  async processReturnBook(request: BookRequestInterface): Promise<void> {
    await this.redis.INCR(this.getNormalizedBookName(request.requested_book));
  }
}
