import { Controller, Get } from '@nestjs/common';

@Controller('oauth')
export class OauthController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
