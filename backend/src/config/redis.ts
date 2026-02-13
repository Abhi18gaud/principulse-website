import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

let redisClient: RedisClientType | null = null;

/**
 * Connect to Redis and return the client instance.
 */
export async function connectRedis(): Promise<RedisClientType> {
  if (redisClient) return redisClient; // Prevent duplicate connections

  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis reconnection failed after 10 attempts');
            return new Error('Redis reconnection failed');
          }
          return Math.min(retries * 100, 2000); // exponential backoff
        },
      },
    });

    redisClient.on('error', (err) => logger.error('Redis Client Error:', err));
    redisClient.on('connect', () => logger.info('Redis Client Connected'));
    redisClient.on('ready', () => logger.info('Redis Client Ready'));
    redisClient.on('end', () => logger.info('Redis Client Disconnected'));

    await redisClient.connect();
    await redisClient.ping();
    logger.info('Redis connection test successful');

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await disconnectRedis();
      process.exit(0);
    });

    return redisClient;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
}

/**
 * Get the active Redis client.
 */
export function getRedisClient(): RedisClientType {
  if (!redisClient) {
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  return redisClient;
}

/**
 * Disconnect from Redis.
 */
export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    logger.info('Redis client disconnected');
    redisClient = null;
  }
}

/**
 * Redis Service wrapper with utility methods.
 */
export class RedisService {
  private client: RedisClientType;

  constructor(client?: RedisClientType) {
    this.client = client || getRedisClient();
  }

  private prefix(key: string): string {
    return `principulse:${key}`; // namespace keys
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const namespacedKey = this.prefix(key);
    if (ttl) {
      await this.client.setEx(namespacedKey, ttl, value);
    } else {
      await this.client.set(namespacedKey, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(this.prefix(key));
  }

  async del(key: string): Promise<number> {
    return await this.client.del(this.prefix(key));
  }

  async exists(key: string): Promise<number> {
    return await this.client.exists(this.prefix(key));
  }

  async expire(key: string, ttl: number): Promise<boolean> {
    return await this.client.expire(this.prefix(key), ttl);
  }

  async setJson(key: string, value: object, ttl?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttl);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const val = await this.get(key);
    return val ? JSON.parse(val) : null;
  }

  async hSet(key: string, field: string, value: string): Promise<number> {
    return await this.client.hSet(this.prefix(key), field, value);
  }

  async hGet(key: string, field: string): Promise<string | undefined> {
    return await this.client.hGet(this.prefix(key), field);
  }

  async hGetAll(key: string): Promise<Record<string, string>> {
    return await this.client.hGetAll(this.prefix(key));
  }

  async hDel(key: string, field: string): Promise<number> {
    return await this.client.hDel(this.prefix(key), field);
  }

  async lPush(key: string, ...values: string[]): Promise<number> {
    return await this.client.lPush(this.prefix(key), values);
  }

  async rPop(key: string): Promise<string | null> {
    return await this.client.rPop(this.prefix(key));
  }

  async lRange(key: string, start: number, stop: number): Promise<string[]> {
    return await this.client.lRange(this.prefix(key), start, stop);
  }

  async incr(key: string): Promise<number> {
    return await this.client.incr(this.prefix(key));
  }

  async decr(key: string): Promise<number> {
    return await this.client.decr(this.prefix(key));
  }

  // Refresh token management methods
  async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    await this.set(key, refreshToken, 7 * 24 * 60 * 60); // 7 days TTL
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const key = `refresh_token:${userId}`;
    return await this.get(key);
  }

  async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    const storedToken = await this.get(key);
    if (storedToken === refreshToken) {
      await this.del(key);
    }
  }

  async invalidateAllRefreshTokens(userId: string): Promise<void> {
    const key = `refresh_token:${userId}`;
    await this.del(key);
  }
}