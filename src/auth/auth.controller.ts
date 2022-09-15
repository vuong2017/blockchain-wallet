import {
  Controller,
  Get,
  Request,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { LocalAuthGuard } from '@/auth/local-auth.guard';
import { AuthService } from '@/auth/auth.service';
import { LoginUserDto } from '@/auth/dto/login-user.dto';
import { CreateUserDto } from '@/users/dto/create-user.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body: LoginUserDto) {
    try {
      const user = this.authService.login(body);
      return user;
    } catch (error) {
      console.log('Login error', error);
    }
  }

  @Post('auth/register')
  async register(@Body() body: CreateUserDto) {
    try {
      const user = this.authService.register(body);
      return user;
    } catch (error) {
      console.log('Register error', error);
    }
  }
}
