import { LibraryController } from './library.controller';
import { LibraryProcessController } from './library-process.controller';

export * from './library.controller';
export * from './library-process.controller';

export const controllers = [LibraryController, LibraryProcessController];
