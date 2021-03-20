import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
// import { AuthGuard } from '@nestjs/passport';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  // constructor(private readonly appService: AppService) {}
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

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
