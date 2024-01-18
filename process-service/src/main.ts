import { NestFactory } from '@nestjs/core';
import { LibraryProcessModule } from './library-process.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RMQ_CONFIG } from 'common/config';
import { PROCESS_QUEUE } from 'common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LibraryProcessModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RMQ_CONFIG()],
        queue: PROCESS_QUEUE,
        prefetchCount: 1,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
  console.log(`process-service is running...`);
}
bootstrap();
