import { BookRequestEntity } from 'domain/models';
import { ReservationStatusEnum } from 'infrastructure/enum';

export class ChangeBookRequestStatusCommand {
  constructor(
    public bookRequestEntity: BookRequestEntity,
    public status: ReservationStatusEnum,
    public throeError = true,
  ) {}
}
