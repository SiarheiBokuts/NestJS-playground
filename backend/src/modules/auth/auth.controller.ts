import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() signUpData: RegisterDto) {
    console.log('/auth/register route. user:', signUpData);
    return await this.authService.register(signUpData);
  }

  // @Post('login')
  // async checkDatabase(): Promise<string> {
  //   return 'true';
  //   // return await this.appService.checkDatabase();
  // }
}
