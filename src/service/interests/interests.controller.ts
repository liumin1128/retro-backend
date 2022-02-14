import { Controller, Get } from '@nestjs/common';
import { LikesService } from './interests.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.likesService.findAll();
  }
}
