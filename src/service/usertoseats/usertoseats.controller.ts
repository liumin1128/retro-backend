import { Controller, Get } from '@nestjs/common';
import { UsertoseatsService } from './usertoseats.service';

@Controller('usertoseats')
export class UsertoseatsController {
  constructor(private readonly usertoseatsService: UsertoseatsService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.usertoseatsService.findAll();
  }
}
