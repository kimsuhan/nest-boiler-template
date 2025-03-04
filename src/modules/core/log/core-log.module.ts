import { Global, Module } from '@nestjs/common';
import { CoreLogService } from './core-log.service';

@Global()
@Module({
  providers: [CoreLogService],
  exports: [CoreLogService],
})
export class CoreLogModule {}
