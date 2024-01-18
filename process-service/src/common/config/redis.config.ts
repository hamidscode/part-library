import { ConfigService } from '@nestjs/config';

export const RedisConfig = (configService: ConfigService): string => {
  const password = configService.get<string>('REDIS_PASS', '');
  const host = configService.get<string>('REDIS_HOST', 'localhost');
  const port = configService.get<number>('REDIS_PORT', 6379);

  let url = null;
  if (!password) {
    url = `redis://${host}:${port}`;
  } else {
    url = `redis://:${password}@${host}:${port}`;
  }
  return url;
};
