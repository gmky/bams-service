import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IDatabaseConfig } from 'src/shared/configs';

@Injectable()
export class DBFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const dbConfig = this.configService.get<IDatabaseConfig>('database');
    return {
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.user,
      password: dbConfig.pass,
      database: dbConfig.name,
      entities: [],
    };
  }
}
