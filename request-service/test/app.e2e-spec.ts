import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LibraryModule } from '../src/library.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LibraryModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/library/request (POST)', () => {
    return request(app.getHttpServer())
      .post('/request')
      .send({
        requester_name: 'test',
        requested_book: 'test',
      })
      .expect(200);
  });
});
