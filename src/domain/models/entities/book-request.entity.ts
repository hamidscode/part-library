import { BaseEntity } from './base.entity';
import { ReservationStatusEnum } from 'infrastructure/enum';

export class BookRequestEntity extends BaseEntity {
  public requesterName: string;
  public requestedBook: string;
  status: ReservationStatusEnum;
  public reservedAt: Date;
  public returnedAt: Date;

  constructor(initial: Partial<BookRequestEntity>) {
    super(initial);

    this.requesterName = initial?.requesterName;
    this.requestedBook = initial?.requestedBook;
    this.status = initial?.status || ReservationStatusEnum.Pending;
    this.reservedAt = initial?.reservedAt;
    this.returnedAt = initial?.returnedAt;
  }
}
