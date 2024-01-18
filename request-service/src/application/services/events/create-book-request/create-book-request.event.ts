import { BookRequestEntity } from 'domain/models';

export class CreateBookRequestEvent {
  constructor(public bookRequestEntity: BookRequestEntity) {}
}
