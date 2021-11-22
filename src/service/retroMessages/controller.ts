import { Controller, Get } from '@nestjs/common';
import { RetroMessagesService } from './service';

@Controller('retroMessages')
export class RetroMessagesController {
  constructor(private readonly retroMessagesService: RetroMessagesService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.retroMessagesService.findAll();
  }
}
