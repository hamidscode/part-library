import { BookRequestEntity } from 'domain/models';
import { BookRequestInterface } from 'infrastructure/interfaces';

export class GetBookRequestQuery {
  constructor(public bookRequest: Partial<BookRequestInterface>) {}
}
