import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';

export class BaseEntity extends AggregateRoot {
  public id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public tags: Array<string>;

  constructor(initial: Partial<BaseEntity>) {
    super();

    this.id = initial?.id || new Types.ObjectId().toString();
    this.createdAt = initial?.createdAt || new Date();
    this.updatedAt = initial?.updatedAt || new Date();
    this.tags = initial?.tags || [];
  }
}
