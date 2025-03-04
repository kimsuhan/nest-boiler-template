import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { generateRandomNumber } from '../../../utils';
import { ErrorResponse } from './dto/error.response';
@Catch()
export class CoreExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    // private readonly logger: CoreLogService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const randomId = generateRandomNumber(10);
    const responseBody: ErrorResponse = {
      statusCode: httpStatus,
      message: 'Internal Server Error',
      developerMessage: `알 수 없는 오류 발생 : ${randomId}`,
      trace: exception,
    };

    Logger.error(exception, randomId, 'CoreExceptionFilter');

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
