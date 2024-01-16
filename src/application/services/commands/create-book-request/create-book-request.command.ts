import { BookRequestEntity } from 'domain/models';

export class CreateBookRequestCommand {
  constructor(public bookRequestEntity: BookRequestEntity) {}
}
