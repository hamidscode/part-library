import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BookProcessResultInterface,
  BookRequestInterface,
} from 'common/interfaces';
import { LIBRARY_REQUEST_SERVICE } from 'common/constants';
import { RedisClientType } from 'redis';
import { ClientProxy } from '@nestjs/microservices';
import { LockUtil } from 'common/utils';
import { v4 as uuid_v4 } from 'uuid';

@Injectable()
export class LibraryProcessService {
  constructor(
    @Inject('REDIS_MODULE')
    private readonly redis: RedisClientType,
    @Inject('LOCK_MODULE')
    private readonly locker: LockUtil,
    @Inject(LIBRARY_REQUEST_SERVICE) private amqpClient: ClientProxy,
  ) {}

  getNormalizedBookName(bookName: string): string {
    return bookName.toLowerCase().replace(/ /g, '_');
  }
  async getExistsCount(normalizedBookName: string): Promise<number> {
    const savedCount = await this.redis.get(normalizedBookName);
    if (isNaN(parseInt(savedCount))) {
      const existsCount = Math.floor(Math.random() * 3);
      await this.redis.set(normalizedBookName, existsCount);
      Logger.log(
        `new book requested. mock exist count of book: there are ${existsCount} books for ${normalizedBookName}`,
      );
      return existsCount;
    }
    Logger.log(
      `use saved book. there are ${savedCount} books for ${normalizedBookName}`,
    );
    return parseInt(savedCount);
  }
  private processBook(bookRequest: BookRequestInterface): Promise<void> {
    return new Promise((resolve, reject) => {
      const simulateFailedState = Math.random() > 0.6;
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
        const normalizedBookName = this.getNormalizedBookName(
          bookRequest.requested_book,
        );
        try {
          await this.locker.acquireExclusiveLock(normalizedBookName, uuid_v4());
          const existsCount = await this.getExistsCount(normalizedBookName);
          if (existsCount > 0) {
            await this.redis.DECR(normalizedBookName);
          }

          const bookProcessResult: BookProcessResultInterface = {
            ...bookRequest,
            exists: existsCount > 0,
          };
          this.amqpClient.emit('book.process.result', bookProcessResult);
        } finally {
          await this.locker.releaseExclusiveLock(normalizedBookName);
        }
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
