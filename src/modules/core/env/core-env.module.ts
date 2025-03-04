import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envProvider, envValidators } from './core-env.provider';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true, // 캐시 사용 여부
      isGlobal: true, // 전역 모듈 여부
      envFilePath: `.env.${process.env.NODE_ENV}`, // 환경 변수 파일 경로
      validationSchema: envValidators, // 환경 변수 검증 스키마
      load: envProvider(), // 환경 변수 로드 프로바이더
    }),
  ],
})
export class CoreEnvModule {}
