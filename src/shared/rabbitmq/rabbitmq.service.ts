import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, Channel, connect } from 'amqplib';

@Injectable()
export class RabbitMQService {
    private connection: Connection;
    private channel: Channel;

    constructor(readonly configService: ConfigService) {
        this.initialize();
    }

    private async initialize() {
        this.connection = await connect();
        this.channel = await this.connection.createChannel(this.configService.get<string>("RABBITMQ_URL"));
    }

    async sendToQueue(queue: string, message: any): Promise<void> {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
    }

    async consumeFromQueue(queue: string, callback: (message: any) => void): Promise<void> {
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, (msg) => {
            if (msg !== null) {
                callback(JSON.parse(msg.content.toString()));
                this.channel.ack(msg);
            }
        });
    }
}
