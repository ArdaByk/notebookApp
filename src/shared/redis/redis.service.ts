import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {

    constructor(private configService: ConfigService) {

    }

    private client: Redis;
    private subscriberClient: Redis;

    onModuleInit() {
        this.client = new Redis(this.configService.get<string>("REDIS_URI"));

        this.subscriberClient = new Redis(this.configService.get<string>("REDIS_URI"));

        this.client.on('connect', () => console.log('Redis connected'));
        this.client.on('error', (err) => console.error('Redis connection error:', err));
    }

    onModuleDestroy() {
        this.client.quit();
        this.subscriberClient.quit();
    }

    async set(key: string, value: string, expireTimeInSeconds?: number) {
        await this.client.set(key, value);
        if (expireTimeInSeconds) {
            await this.client.expire(key, expireTimeInSeconds);
        }
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }

    async flushAll(): Promise<void> {
        await this.client.flushall();
    }

    async hset(key: string, field: string, value: string): Promise<void> {
        await this.client.hset(key, field, value);
    }

    async hget(key: string, field: string): Promise<string | null> {
        return await this.client.hget(key, field);
    }

    async publish(channel: string, message: string): Promise<void> {
        await this.client.publish(channel, message);
    }

    subscribe(channel: string, callback: (message: string) => void): void {
        this.subscriberClient.subscribe(channel);
        this.subscriberClient.on('message', (chan, message) => {
            if (chan === channel) {
                callback(message);
            }
        });
    }
}
