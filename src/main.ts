import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CoreExceptionFilter } from './modules/core/exception/core-exception.filter';
import { CoreLogService } from './modules/core/log/core-log.service';

/**
 * NestJS 애플리케이션을 초기화하고 구성합니다.
 * - AppModule을 사용하여 Nest 애플리케이션을 생성합니다.
 * - 요청 검증을 위한 전역 유효성 파이프를 설정합니다.
 * - Helmet을 사용하여 보안 미들웨어를 적용합니다.
 * - 환경 변수에서 지정된 포트로 애플리케이션을 시작하거나 기본적으로 3000번 포트에서 시작합니다.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 유효성(class-validator) 검사
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // body, query, param 타입을 object로 변환
      whitelist: true, // request의 미매핑을 제거
      forbidNonWhitelisted: true, // 미매핑 된 값이 있으면 에러 발생
      forbidUnknownValues: true, // 미매핑 된 값이 있으면 에러 발생
    }),
  );

  // 보안 미들웨어 적용
  app.use(helmet());

  // 예외 필터 적용
  app.useGlobalFilters(new CoreExceptionFilter(app.get(HttpAdapterHost)));

  // Global Prefix 셋팅
  app.setGlobalPrefix('api/v1');

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Nest Boilerplate API')
    .setDescription('The Nest Boilerplate API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Nest Boilerplate API',
    swaggerOptions: {
      persistAuthorization: true, // Session 유지
      tagsSorter: 'alpha', // 태그 정렬
      operationsSorter: 'alpha', // 작업 정렬
      defaultModelsExpandDepth: 10, // 모델 확장 깊이
      defaultModelExpandDepth: 10, // 모델 확장 깊이
      displayRequestDuration: true, // 요청 시간 표시
      docExpansion: 'none', // 문서 확장
      filter: true, // 필터 표시
      showCommonExtensions: true, // 공통 확장 표시
      defaultModelRendering: 'model', // 모델 렌더링
    },
  });

  // 로거 설정
  const logger = app.get(CoreLogService);
  app.useLogger(logger);

  // 환경 변수에서 지정된 포트로 애플리케이션을 시작하거나 기본적으로 3000번 포트에서 시작합니다.
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  Logger.error('Bootstrap failed:', err);
  process.exit(1);
});
