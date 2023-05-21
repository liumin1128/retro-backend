import { Controller, Get } from '@nestjs/common';
import { UserToRolesService } from './usertoroles.service';

@Controller('userToRoles')
export class UserToRolesController {
  constructor(private readonly userToRolesService: UserToRolesService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.userToRolesService.findAll();
  }
}
