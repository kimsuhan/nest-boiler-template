import { registerAs } from '@nestjs/config';
import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import Joi from 'joi';

/**
 * 환경 변수 스키마
 *
 * @returns 환경 변수 스키마
 */
export enum ENV_SCHEMA {
  PORT = 'PORT',
  FILE_UPLOAD_PATH = 'FILE_UPLOAD_PATH',
  LOGGING_PATH = 'LOGGING_PATH',
  MAIL_HOST = 'MAIL_HOST',
  MAIL_PORT = 'MAIL_PORT',
  MAIL_USER = 'MAIL_USER',
  MAIL_PASSWORD = 'MAIL_PASSWORD',
}

const envSchema = {
  [ENV_SCHEMA.PORT]: Joi.number().required(),
  [ENV_SCHEMA.FILE_UPLOAD_PATH]: Joi.string().required(),
  [ENV_SCHEMA.MAIL_HOST]: Joi.string().required(),
  [ENV_SCHEMA.MAIL_PORT]: Joi.number().required(),
  [ENV_SCHEMA.MAIL_USER]: Joi.string().required(),
  [ENV_SCHEMA.MAIL_PASSWORD]: Joi.string().required(),
  [ENV_SCHEMA.LOGGING_PATH]: Joi.string().required(),
};

/**
 * 환경 변수 프로바이더
 *
 * @returns 환경 변수 프로바이더
 */
export const envProvider = (): Array<ConfigFactory | Promise<ConfigFactory>> => {
  const returnProvider: Record<string, string | undefined> = {};

  for (const key in envSchema) {
    returnProvider[key] = process.env[key];
  }

  const envConfig = registerAs('env', () => returnProvider);
  return [envConfig];
};

/**
 * 환경 변수 검증 스키마
 *
 * @returns 환경 변수 검증 스키마
 */
export const envValidators = Joi.object().append(envSchema);
