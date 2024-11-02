import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
    imports: [ConfigModule, JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
          global: true,
          secret: configService.get<string>("SECRET_KEY"),
          signOptions: { expiresIn: '20m' },
        }),
        inject: [ConfigService]
      })],
      exports: [JwtModule]
})
export class jwtAuthModule {}
