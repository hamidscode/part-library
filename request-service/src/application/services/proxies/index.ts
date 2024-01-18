import { ProcessBookProxy } from './process-book.proxy';
import { NoticeProxy } from './notice.proxy';

export * from './process-book.proxy';
export * from './notice.proxy';

export const proxies = [ProcessBookProxy, NoticeProxy];
