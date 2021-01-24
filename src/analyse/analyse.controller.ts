import { Controller, Get } from '@nestjs/common';

@Controller('analyse')
export class AnalyseController {
  @Get()
  findAll(): string {
    return 'This action returns all analyse';
  }
}
