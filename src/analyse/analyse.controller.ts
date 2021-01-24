import { Controller, Get } from '@nestjs/common';
import { AnalyseService } from './analyse.service';
import { Item } from './interfaces/analyse.interface';

@Controller('analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.analyseService.findAll();
  }
}
