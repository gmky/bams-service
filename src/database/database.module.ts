import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBFactory } from './database.factory';
import { User } from './entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DBFactory,
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class DatabaseModule {}
