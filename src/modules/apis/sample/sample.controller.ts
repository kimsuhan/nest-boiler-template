import { Controller, Get } from '@nestjs/common';

@Controller('sample')
export class SampleController {
  @Get()
  getSample() {
    throw new Error('test');
  }
}
