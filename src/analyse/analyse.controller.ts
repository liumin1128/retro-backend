import { Controller, Get, Param } from '@nestjs/common';
import { AnalyseService } from './analyse.service';
import { Item } from './interfaces/analyse.interface';

@Controller('analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.analyseService.fetchList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
}
