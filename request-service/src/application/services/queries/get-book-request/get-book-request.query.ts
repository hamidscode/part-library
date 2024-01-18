import { BookRequestInterface } from 'infrastructure/interfaces';
import { ReservationStatusEnum } from 'infrastructure/enum';

export class GetBookRequestQuery {
  constructor(
    public bookRequest: Partial<BookRequestInterface>,
    public status?: ReservationStatusEnum,
  ) {}
}
