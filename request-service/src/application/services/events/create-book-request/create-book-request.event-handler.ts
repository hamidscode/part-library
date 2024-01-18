import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateBookRequestEvent } from './create-book-request.event';
import { Logger } from '@nestjs/common';

@EventsHandler(CreateBookRequestEvent)
export class CreateBookRequestEventHandler
  implements IEventHandler<CreateBookRequestEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: CreateBookRequestEvent) {
    Logger.log(
      'New book request created. Assumed to write in read database ...',
    );
  }
}
