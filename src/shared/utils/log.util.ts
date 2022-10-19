import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { IAppConfig, ILoggingConfig } from '../configs';

export const getLogFileDate = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
};

export const logToFileOption = (
  appConfig: IAppConfig,
  loggingConfig: ILoggingConfig,
) => {
  return {
    filename: join(__dirname, '../../logs', `${getLogFileDate()}.log`),
    stream: createWriteStream(
      join(__dirname, '../../logs', `${getLogFileDate()}.log`),
      { flags: 'a' },
    ),
    maxFiles: loggingConfig.maxFile,
    maxsize: loggingConfig.maxSize,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple(),
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike(appConfig.name, {
        colors: false,
      }),
    ),
  };
};

export const logToConsoleOption = (
  appConfig: IAppConfig,
  loggingConfig: ILoggingConfig,
) => {
  return {
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple(),
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike(appConfig.name, {
        colors: loggingConfig.color,
      }),
    ),
  };
};
