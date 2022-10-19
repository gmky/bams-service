import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBFactory } from './database.factory';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DBFactory,
    }),
  ],
})
export class DatabaseModule {}
