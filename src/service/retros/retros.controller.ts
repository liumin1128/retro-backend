import { Controller, Get } from '@nestjs/common';
import { RetrosService } from './retros.service';

@Controller('retros')
export class RetrosController {
  constructor(private readonly retrosService: RetrosService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.retrosService.findAll();
  }
}
