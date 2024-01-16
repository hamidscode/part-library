import { BaseEntity } from './base.entity';

export class BookRequestEntity extends BaseEntity {
  public requesterName: string;
  public requestedBook: string;
  public reservedAt: Date;

  constructor(initial: Partial<BookRequestEntity>) {
    super(initial);

    this.requesterName = initial?.requesterName;
    this.requestedBook = initial?.requestedBook;
    this.reservedAt = initial?.reservedAt;
  }
}
