import { Controller, Get } from '@nestjs/common';

@Controller('oauth')
export class OAuthController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
