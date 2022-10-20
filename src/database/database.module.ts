import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBFactory } from './database.factory';
import { User } from './entities';
import { UserRepository } from './repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DBFactory,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class DatabaseModule {}
