import { ConfigService } from '@nestjs/config';

export const REDIS_OPTIONS = (
  configService: ConfigService,
): {
  host: string;
  port: number;
  password?: string;
} => {
  const password = configService.get<string>('REDIS_PASS', '');
  const host = configService.get<string>('REDIS_HOST', 'localhost');
  const port = configService.get<number>('REDIS_PORT', 6379);

  return {
    host,
    port,
    ...(password ? { password } : {}),
  };
};
export const RedisConfig = (configService: ConfigService): string => {
  const { host, port, password } = REDIS_OPTIONS(configService);
  let url = null;
  if (!password) {
    url = `redis://${host}:${port}`;
  } else {
    url = `redis://:${password}@${host}:${port}`;
  }
  return url;
};

export const REDIS_CONFIG = (): string => {
  const password = process.env.REDIS_PASS;
  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT);

  let uri = null;
  if (!password) {
    uri = `redis://${host}:${port}`;
  } else {
    uri = `redis://:${password}@${host}:${port}`;
  }

  return uri;
};
