import { ClassSerializerInterceptor, Logger, Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MainModule } from './main/main.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtStrategy } from './configs';
import { JwtGuard } from './security/guards';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    MainModule,
  ],
  controllers: [],
  providers: [
    Logger,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
