import { Injectable } from '@nestjs/common';
import { BookRequestEntity, BookRequestSchema } from 'domain/models';
import { BaseMapper } from './base.mapper';
import { Types } from 'mongoose';
import { BookRequestInterface } from 'infrastructure/interfaces';

@Injectable()
export class BookRequestMapper
  implements BaseMapper<BookRequestSchema, BookRequestEntity>
{
  constructor() {}

  convertEntityToSchema(entity: BookRequestEntity): BookRequestSchema {
    const schema = new BookRequestSchema();

    schema._id = new Types.ObjectId(entity?.id);
    schema.requester_name = entity.requesterName;
    schema.requested_book = entity.requestedBook;
    schema.reserved_at = entity.reservedAt;
    schema.created_at = entity.createdAt;
    schema.updated_at = entity.updatedAt;
    schema.tags = entity.tags;

    return schema;
  }

  convertSchemaToEntity(schema: BookRequestSchema): BookRequestEntity {
    if (!schema) return;

    return new BookRequestEntity({
      id: schema._id.toString(),
      requesterName: schema.requester_name,
      requestedBook: schema.requested_book,
      reservedAt: schema.reserved_at,
      createdAt: schema.created_at,
      updatedAt: schema.updated_at,
      tags: schema.tags,
    });
  }

  static convertRequestToEntity(
    request: BookRequestInterface,
  ): BookRequestEntity {
    return new BookRequestEntity({
      requesterName: request.requester_name,
      requestedBook: request.requested_book,
      tags: request.tags,
    });
  }
}
