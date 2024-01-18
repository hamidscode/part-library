import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LibraryProcessController, LibraryProcessService } from 'core';
import {
  LIBRARY_REQUEST_SERVICE,
  PROCESS_RESULT_QUEUE,
} from 'common/constants';
import { createClient } from 'redis';
import { RedisConfig, RMQ_CONFIG } from 'common/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    {
      global: true,
      module: Object,
      exports: ['REDIS_MODULE'],
      providers: [
        {
          inject: [ConfigService],
          provide: 'REDIS_MODULE',
          useFactory: (configService: ConfigService) => {
            const client = createClient({ url: RedisConfig(configService) });
            if (!client.isReady) {
              client
                .connect()
                .then()
                .catch((reason) => {
                  console.error(reason);
                });
            }
            return client;
          },
        },
      ],
    },
    ClientsModule.register([
      {
        name: LIBRARY_REQUEST_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_CONFIG()],
          queue: PROCESS_RESULT_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [LibraryProcessController],
  providers: [LibraryProcessService],
})
export class LibraryProcessModule {}
