import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import helmet from 'helmet';
import * as compression from 'compression';
import { logToConsoleOption, logToFileOption } from './shared/utils/log.util';
import { ConfigService } from '@nestjs/config';
import {
  IAppConfig,
  ILoggingConfig,
  IOpenAPIConfig,
  IServerConfig,
} from './shared/configs';
import { PaginatedDto } from './shared/dto';
import { OkDto } from './shared/dto/ok.dto';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  app.setGlobalPrefix('api', { exclude: ['api-docs'] });
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      stopAtFirstError: true,
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
    { extraModels: [PaginatedDto, OkDto] },
  );
  SwaggerModule.setup(openapiConfig.path, app, swaggerDocument);

  const serverConfig = configService.get<IServerConfig>('server');
  const appPort = process.env.PORT || serverConfig.port;
  await app.listen(appPort);
}
bootstrap();
