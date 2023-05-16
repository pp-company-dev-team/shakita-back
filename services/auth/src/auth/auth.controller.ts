import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // В случае невалидных учетных данных можешь выбросить исключение UnauthorizedException
    }
    const token = await this.authService.generateToken(user);
    return { token };
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(@Request() req) {
    return req.user;
  }
}
