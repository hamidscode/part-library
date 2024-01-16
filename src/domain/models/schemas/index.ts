import { ModelDefinition } from '@nestjs/mongoose';

import { BookRequestSchema } from './book-request.schema';

export * from './base.schema';
export * from './book-request.schema';

export const schemas: ModelDefinition[] = [
  {
    name: BookRequestSchema.name,
    schema: BookRequestSchema.getSchema(),
    collection: 'book_requests',
  },
]