import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { logToConsoleOption, logToFileOption } from './shared/utils/log.util';
import { ConfigService } from '@nestjs/config';
import { IAppConfig, ILoggingConfig, IServerConfig } from './shared/configs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const configService = await app.get(ConfigService);
  const loggingConfig = configService.get<ILoggingConfig>('logging');
  const appConfig = configService.get<IAppConfig>('app');
  app.useLogger(
    WinstonModule.createLogger({
      level: loggingConfig.level,
      transports: [
        new winston.transports.Console(
          logToConsoleOption(appConfig, loggingConfig),
        ),
        new winston.transports.File(logToFileOption(appConfig, loggingConfig)),
      ],
    }),
  );
  const serverConfig = configService.get<IServerConfig>('server');
  const appPort = process.env.PORT || serverConfig.port;
  await app.listen(appPort);
}
bootstrap();
