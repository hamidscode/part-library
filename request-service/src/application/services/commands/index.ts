import { CreateBookRequestHandler } from './create-book-request';
import { ChangeBookRequestStatusHandler } from './change-book-request-status';

export * from './create-book-request';
export * from './change-book-request-status';

export const commandHandlers = [
  CreateBookRequestHandler,
  ChangeBookRequestStatusHandler,
];
