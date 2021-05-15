import { Controller, Request, Get, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './service/auth/local-auth.guard';
import { JwtAuthGuard, Public } from './service/auth/jwt-auth.guard';
import { AuthService } from './service/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
