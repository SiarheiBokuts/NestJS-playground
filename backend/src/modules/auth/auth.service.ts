import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

const SALT_ROUNDS = 12; // Define a constant for the salt rounds

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
    console.log(
      'Registering user:',
      dto.email,
      'with hashed password:',
      hashedPassword,
    );
    const user = { email: dto.email, password: hashedPassword };

    await this.userRepository.save(user);

    return { email: user.email };
  }

  //   async validateUser(email: string, password: string) {
  //     const user = this.users.find((u) => u.email === email);
  //     if (!user) return null;
  //     const isValid = await bcrypt.compare(password, user.password);
  //     return isValid ? user : null;
  //   }
}
