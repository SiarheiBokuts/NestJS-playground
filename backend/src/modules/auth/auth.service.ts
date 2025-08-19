/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    // const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = { email: dto.email, password: dto.password };
    // this.users.push(user);
    return { email: user.email };
  }

  //   async validateUser(email: string, password: string) {
  //     const user = this.users.find((u) => u.email === email);
  //     if (!user) return null;
  //     const isValid = await bcrypt.compare(password, user.password);
  //     return isValid ? user : null;
  //   }
}
