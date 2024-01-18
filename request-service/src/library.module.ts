import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { controllers } from 'presentation/controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { schemas } from 'domain/models';
import { mongoConfig, REDIS_OPTIONS, RMQ_CONFIG } from 'infrastructure/config';
import { factories, mappers, repositories } from 'domain/services';
import {
  commandHandlers,
  proxies,
  queryHandlers,
  events,
  jobs,
} from 'application/services';
import { useCases } from 'application/use-cases';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  LIBRARY_PROCESS_SERVICE,
  PROCESS_QUEUE,
  REQUEST_FAILED_QUEUE,
} from 'infrastructure/constants';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${
        process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''
      }`,
      ignoreEnvFile: process.env.ENV_FILES
        ? process.env.ENV_FILES !== 'true'
        : false,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: mongoConfig,
    }),
    MongooseModule.forFeature(schemas),
    CqrsModule.forRoot(),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: REDIS_OPTIONS(configService),
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: false,
        },
      }),
    }),
    BullModule.registerQueue({
      name: REQUEST_FAILED_QUEUE,
    }),
    ClientsModule.register([
      {
        name: LIBRARY_PROCESS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_CONFIG()],
          queue: PROCESS_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [...controllers],
  providers: [
    ...factories,
    ...mappers,
    ...repositories,
    ...commandHandlers,
    ...useCases,
    ...proxies,
    ...queryHandlers,
    ...events,
    ...jobs,
  ],
})
export class LibraryModule {}
