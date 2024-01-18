import { GetBookRequestHandler } from './get-book-request';
import { GetAllBookRequestsHandler } from './get-all-book-requests';

export * from './get-book-request';
export * from './get-all-book-requests';

export const queryHandlers = [GetBookRequestHandler, GetAllBookRequestsHandler];
