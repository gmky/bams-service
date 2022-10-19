import { Logger, Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MainModule } from './main/main.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    DatabaseModule,
    MainModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
