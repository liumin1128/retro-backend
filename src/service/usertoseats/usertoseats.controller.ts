import { Controller, Get } from '@nestjs/common';
import { UserToSeatsService } from './userToSeats.service';

@Controller('userToSeats')
export class UserToSeatsController {
  constructor(private readonly userToSeatsService: UserToSeatsService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.userToSeatsService.findAll({});
  }
}
