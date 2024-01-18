import { RedisClientType } from 'redis';

export class LockUtil {
  constructor(
    private redis: RedisClientType,
    private lockPrefixKey = 'ExRedisLock:',
  ) {
    this.redis = redis;
    this.lockPrefixKey = lockPrefixKey;
  }

  private sleep(millis) {
    return new Promise((resolve) => setTimeout(resolve, millis));
  }
  private refKey(target: string) {
    return `${this.lockPrefixKey}:${target}:ref`;
  }

  async acquireExclusiveLock(
    lockKey: string,
    lockValue: string,
    lockTime = 60000,
  ): Promise<boolean> {
    while (true) {
      const trx = await this.redis.set(this.refKey(lockKey), lockValue, {
        NX: true,
        PX: lockTime,
      });
      if (!!trx && trx === 'OK') {
        return true;
      }
      await this.sleep(50);
    }
  }

  async releaseExclusiveLock(lockKey: string): Promise<void> {
    await this.redis.DEL(this.refKey(lockKey));
  }
}
