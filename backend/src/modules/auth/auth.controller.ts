import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import express from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() signUpData: RegisterDto) {
    return await this.authService.register(signUpData);
  }

  @Post('login')
  async login(@Body() loginData: RegisterDto) {
    return await this.authService.login(loginData);
  }

  @UseGuards(AuthGuard)
  @Post('validate')
  async validate(@Req() req: express.Request) {
    const existingUser = await this.authService.findUser(
      req.user!.id,
      req.user!.email,
    );

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { email: req.user?.email };
  }
}
