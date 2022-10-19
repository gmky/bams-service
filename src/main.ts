import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { logToConsoleOption, logToFileOption } from './shared/utils/log.util';
import { ConfigService } from '@nestjs/config';
import {
  IAppConfig,
  ILoggingConfig,
  IOpenAPIConfig,
  IServerConfig,
} from './shared/configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const configService = await app.get(ConfigService);
  const loggingConfig = configService.get<ILoggingConfig>('logging');
  const appConfig = configService.get<IAppConfig>('app');
  // Config logging
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

  // Config OpenAPI
  const openapiConfig = configService.get<IOpenAPIConfig>('openapi');
  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle(openapiConfig.name)
    .setDescription(openapiConfig.description)
    .setVersion(openapiConfig.version)
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
  );
  SwaggerModule.setup(openapiConfig.path, app, swaggerDocument);

  const serverConfig = configService.get<IServerConfig>('server');
  const appPort = process.env.PORT || serverConfig.port;
  await app.listen(appPort);
}
bootstrap();
