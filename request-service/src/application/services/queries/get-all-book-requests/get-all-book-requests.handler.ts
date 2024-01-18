import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BookRequestEntity } from 'domain/models';
import { BookRequestRepository } from 'domain/services';
import { GetAllBookRequestsQuery } from './get-all-book-requests.query';
import { findAndCountAll } from 'infrastructure/database';

@QueryHandler(GetAllBookRequestsQuery)
export class GetAllBookRequestsHandler
  implements
    IQueryHandler<GetAllBookRequestsQuery, findAndCountAll<BookRequestEntity>>
{
  constructor(private readonly bookRequestRepository: BookRequestRepository) {}

  async execute(
    query: GetAllBookRequestsQuery,
  ): Promise<findAndCountAll<BookRequestEntity>> {
    const { requestedBook, requesterName, skip, limit } = query;
    let requests: findAndCountAll<BookRequestEntity>;
    if (requesterName)
      requests = await this.bookRequestRepository.findByRequesterName(
        requesterName,
        skip,
        limit,
      );
    else if (requestedBook)
      requests = await this.bookRequestRepository.findByRequestedBook(
        requestedBook,
        skip,
        limit,
      );
    else requests = await this.bookRequestRepository.findAll({ skip, limit });

    return requests;
  }
}
