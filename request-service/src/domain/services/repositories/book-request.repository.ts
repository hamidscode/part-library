import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BookRequestSchema, BookRequestEntity } from 'domain/models';
import { BaseRepository } from './base.repository';
import { BookRequestMapper } from '../mappers';
import { findAndCountAll } from 'infrastructure/database';
import { ReservationStatusEnum } from 'infrastructure/enum';

@Injectable()
export class BookRequestRepository extends BaseRepository<
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

  async findByRequesterName(
    requesterName: string,
    skip = 0,
    limit = 100,
  ): Promise<findAndCountAll<BookRequestEntity>> {
    const where: FilterQuery<BookRequestSchema> = {};
    where['requester_name'] = requesterName;

    return super.findAll({
      skip,
      limit,
      where,
    });
  }

  async findByRequestedBook(
    requestedBook: string,
    skip = 0,
    limit = 100,
  ): Promise<findAndCountAll<BookRequestEntity>> {
    const where: FilterQuery<BookRequestSchema> = {};
    where['requested_book'] = { $regex: requestedBook, $options: 'i' };

    return super.findAll({
      skip,
      limit,
      where,
    });
  }

  async findOneRequest(
    requestedBook: string,
    requesterName: string,
    status?: ReservationStatusEnum,
  ): Promise<BookRequestEntity> {
    const where: FilterQuery<BookRequestSchema> = {};
    where['requested_book'] = requestedBook;
    where['requester_name'] = requesterName;
    if (status) where['status'] = status;

    return super.findOne(where);
  }
}
