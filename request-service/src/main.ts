import { NestFactory } from '@nestjs/core';
import { LibraryModule } from './library.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NODE_ENV, RMQ_CONFIG } from './infrastructure/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  PROCESS_RESULT_QUEUE,
  REQUEST_FAILED_QUEUE,
} from 'infrastructure/constants';
import { BullMonitorExpress } from '@bull-monitor/express';
import { BullAdapter } from '@bull-monitor/root/dist/bull-adapter';
import * as Queue from 'bull';
import { REDIS_CONFIG } from 'infrastructure/config/redis.config';

async function bootstrap() {
  const app = await NestFactory.create(LibraryModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_CONFIG()],
      queue: PROCESS_RESULT_QUEUE,
      prefetchCount: 1,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  const monitor = new BullMonitorExpress({
    queues: [
      new BullAdapter(new Queue(REQUEST_FAILED_QUEUE, REDIS_CONFIG()), {
        readonly: true,
      }),
    ],
    metrics: { collectInterval: { hours: 1 } },
  });
  await monitor.init();
  app.use('/bull', monitor.router);

  if (NODE_ENV().IS_DEVELOPMENT) {
    const options = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setDescription(process.env.npm_package_description)
      .setVersion(process.env.npm_package_version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: { docExpansion: 'none' },
    });
  }
  await app.startAllMicroservices();
  await app.listen(3000);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger UI is running on: ${url}/api`);
  console.log(`OpenApi Spec is running on: ${url}/api-json`);
  console.log(`Standard UI for Bull is running on: ${url}/bull`);
}
bootstrap();
