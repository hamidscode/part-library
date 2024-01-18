import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookRequestCommand } from './create-book-request.command';
import { BookRequestEntity } from 'domain/models';
import { BookRequestFactory } from 'domain/services';
import { ReservationStatusEnum } from 'infrastructure/enum';
import { BadRequestException } from '@nestjs/common';
import { CreateBookRequestEvent } from 'application/services';

@CommandHandler(CreateBookRequestCommand)
export class CreateBookRequestHandler
  implements ICommandHandler<CreateBookRequestCommand>
{
  constructor(
    private readonly bookRequestFactory: BookRequestFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  /**
   * Checks the status of a book request.  It checks if the status of the bookRequestEntity is not equal to "Pending". If it is not "Pending", it throws a BadRequestException
   *
   * @param {BookRequestEntity} bookRequestEntity - The book request entity to check.
   */
  checkBookRequestStatus(bookRequestEntity: BookRequestEntity) {
    if (bookRequestEntity.status !== ReservationStatusEnum.Pending) {
      throw new BadRequestException(
        'You can not request book with specific status',
      );
    }
  }
  async execute({
    bookRequestEntity,
  }: CreateBookRequestCommand): Promise<BookRequestEntity> {
    this.checkBookRequestStatus(bookRequestEntity);
    const result = await this.bookRequestFactory.create(bookRequestEntity);
    const bookRequest = this.eventPublisher.mergeObjectContext(result);
    const bookRequestCreateEvent = new CreateBookRequestEvent(bookRequest);
    bookRequest.apply(bookRequestCreateEvent);
    bookRequest.commit();
    return result;
  }
}
