import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() signUpData: RegisterDto) {
    console.log('/auth/register route. user:', signUpData);
    return await this.authService.register(signUpData);
  }

  @Post('login')
  async login(@Body() loginData: RegisterDto) {
    console.log('/auth/login route. user:', loginData);
    return await this.authService.login(loginData);
  }

  @UseGuards(AuthGuard)
  @Post('validate')
  validate(@Req() req: Request, @Body() data: { token: string }) {
    console.log('/auth/validate  route. token:', data.token);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { email: req['user']?.email };
  }
}
