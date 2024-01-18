import { BookRequestEntity } from 'domain/models';

export class ChangeBookRequestStatusEvent {
  constructor(public bookRequestEntity: BookRequestEntity) {}
}
