import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookRequestSchema, BookRequestEntity } from 'domain/models';
import { BaseFactory } from './base.factory';
import { BookRequestMapper } from '../mappers';

@Injectable()
export class BookRequestFactory extends BaseFactory<
  BookRequestSchema,
  BookRequestEntity
> {
  constructor(
    protected readonly bookRequestMapper: BookRequestMapper,
    @InjectModel(BookRequestSchema.name)
    private bookRequestModel: Model<BookRequestSchema>,
  ) {
    super(bookRequestMapper, bookRequestModel);
  }
}
