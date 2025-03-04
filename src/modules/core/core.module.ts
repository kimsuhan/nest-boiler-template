import { Module } from '@nestjs/common';
import { CoreEnvModule } from './env/core-env.module';
import { CoreLogModule } from './log/core-log.module';
import { CoreLogService } from './log/core-log.service';

@Module({
  imports: [CoreEnvModule, CoreLogModule],
  providers: [CoreLogService],
  exports: [CoreLogService],
})
export class CoreModule {}
