import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { controllers } from 'presentation/controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { schemas } from 'domain/models';
import { mongoConfig } from 'infrastructure/config';
import { factories, mappers, repositories } from 'domain/services';

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
  ],
  controllers: [...controllers],
  providers: [...factories, ...mappers, ...repositories],
})
export class LibraryModule {}
