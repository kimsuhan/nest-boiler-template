import { Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { ENV_SCHEMA } from '../env/core-env.provider';

@Injectable()
export class CoreLogService implements LoggerService, OnModuleInit {
  private logger: winston.Logger;

  /**
   * 로그 포맷
   */
  private readonly format = winston.format.combine(
    winston.format.errors({ stack: true, message: true }),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(({ timestamp, level, message, context = 'Application', stack, trace }) => {
      const contextString = typeof context === 'string' ? context : 'Application';
      const formatDate = new Date(timestamp as string).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const contextMessage = `${message as string} ${trace ? `\n${trace as string}` : ''} ${stack ? `\n${stack as string}` : ''}`;
      return `${formatDate} [${contextString}] ${level}: ${contextMessage}`;
    }),
  );

  /**
   * 로그 전송 트랜스포트 생성
   *
   * @param name 로그 이름
   * @param level 로그 레벨
   * @returns 로그 전송 트랜스포트
   */
  private makeTransport(name: string, level: string): DailyRotateFile {
    return new DailyRotateFile({
      dirname: this.configService.get<string>(ENV_SCHEMA.LOGGING_PATH),
      filename: `${name}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '1024m',
      maxFiles: '30d', // 30일 이후 로그 파일 자동 삭제
      format: this.format,
      level,
    });
  }

  constructor(private readonly configService: ConfigService) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'silly',
          format: winston.format.combine(
            this.format,
            winston.format.colorize({
              all: true,
              message: true,
              level: true,
            }),
          ),
        }),

        this.makeTransport('application', 'info'),
        this.makeTransport('debug', 'debug'),
        this.makeTransport('error', 'error'),
      ],
    });
  }

  /**
   * 모듈 초기화
   */
  onModuleInit() {
    this.ensureLogDirectory();
  }

  /**
   * 로그 디렉토리가 존재하는지 확인하고, 없으면 생성
   */
  private ensureLogDirectory(): void {
    try {
      const loggingPath = this.configService.get<string>(ENV_SCHEMA.LOGGING_PATH);
      if (!loggingPath) {
        this.error('Logging path is not set');
        return;
      }

      if (!existsSync(loggingPath)) {
        mkdirSync(loggingPath, { recursive: true });
        this.log(`Created logging directory: ${loggingPath}`);
      }
    } catch (error) {
      this.error(`Error ensuring log directory: ${error}`);
    }
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
