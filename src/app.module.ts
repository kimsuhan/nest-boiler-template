import { Module } from '@nestjs/common';
import { ApiModule } from './modules/apis/api.module';
import { CoreModule } from './modules/core/core.module';

@Module({
  imports: [CoreModule, ApiModule],
})
export class AppModule {}
