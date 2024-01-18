import { CreateBookRequestEventHandler } from './create-book-request';
import { ChangeBookRequestStatusEventHandler } from './change-book-request-status';

export * from './create-book-request';
export * from './change-book-request-status';

export const events = [
  CreateBookRequestEventHandler,
  ChangeBookRequestStatusEventHandler,
];
