import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ description: 'HTTP 상태 코드' })
  statusCode: number;

  @ApiProperty({ description: '사용자에게 보여줄 메시지' })
  message: string;

  @ApiProperty({ description: '개발자에게 보여줄 메시지', required: false })
  developerMessage?: string;

  @ApiProperty({ description: '예외 추적 정보', required: false })
  trace?: unknown;
}
