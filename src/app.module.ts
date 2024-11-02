import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/typeorm/database.module';
import { ConfigurationModule } from './shared/configuration/configuration.module';
import { RedisService } from './shared/redis/redis.service';
import { RabbitMQService } from './shared/rabbitmq/rabbitmq.service';
import { jwtAuthModule } from './shared/security/jwtAuthModule.module';

@Module({
  imports: [AuthModule, NotesModule, UsersModule, DatabaseModule, ConfigurationModule, jwtAuthModule],
  providers: [RedisService, RabbitMQService]
})
export class AppModule { }
