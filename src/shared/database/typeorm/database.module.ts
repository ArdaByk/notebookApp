import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('HOST'),
            port: configService.get('PORT'),
            username: "root",
            password: configService.get('PASSWORD'),
            database: configService.get('DATABASE'),
            entities: entities,
            synchronize: true,
        }),
        inject: [ConfigService],
    })]
})
export class DatabaseModule { }
