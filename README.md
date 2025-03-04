# NestJS Boilerplate

NestJS 기반의 API 서버 보일러플레이트입니다.

## 기술 스택

- NestJS
- TypeScript
- Swagger (API 문서화)
- Helmet (보안)
- Class Validator (데이터 검증)

## 시작하기

### 필수 조건

- Node.js (v16 이상)
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
# 또는
yarn install
```

### 실행

```bash
# 개발 환경
npm run start:dev
# 또는
yarn start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
# 또는
yarn build
yarn start:prod
```

## API 문서

- Swagger UI: `http://localhost:3000/api`
- API 엔드포인트: `http://localhost:3000/api/v1`

## 주요 기능

- 전역 유효성 검사 (ValidationPipe)
- 보안 미들웨어 (Helmet)
- API 문서화 (Swagger)
- 글로벌 API 프리픽스 (/api/v1)
- 에러 핸들링

## 환경 변수

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
PORT=3000
```

## 프로젝트 구조

```

## 라이선스

MIT
```
