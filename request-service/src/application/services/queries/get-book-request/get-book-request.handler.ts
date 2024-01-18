import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BookRequestEntity } from 'domain/models';
import { BookRequestRepository } from 'domain/services';
import { NotFoundException } from '@nestjs/common';
import { GetBookRequestQuery } from './get-book-request.query';

@QueryHandler(GetBookRequestQuery)
export class GetBookRequestHandler
  implements IQueryHandler<GetBookRequestQuery, BookRequestEntity>
{
  constructor(private readonly bookRequestRepository: BookRequestRepository) {}

  async execute(query: GetBookRequestQuery): Promise<BookRequestEntity> {
    const bookRequest = query.bookRequest;
    let request: BookRequestEntity;
    if (bookRequest.id)
      request = await this.bookRequestRepository.findOneById(bookRequest.id);
    else
      request = await this.bookRequestRepository.findOneRequest(
        bookRequest.requested_book,
        bookRequest.requester_name,
      );

    if (!request) {
      // Throw an exception if the autopay entity is not found
      throw new NotFoundException('Book request not found');
    }

    return request;
  }
}
