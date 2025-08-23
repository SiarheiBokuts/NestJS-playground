import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthResponse, JwtTokenPayload } from './auth.model';

const SALT_ROUNDS = 12; // Define a constant for the salt rounds

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow('JWT_SECRET');
  }

  createJwtToken(payload: JwtTokenPayload): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

    const user = { email: dto.email, password: hashedPassword };

    const savedUser = await this.userRepository.save(user);

    const payload: JwtTokenPayload = { email: user.email, id: savedUser.id };

    const jwtToken = this.createJwtToken(payload);

    return { email: user.email, token: jwtToken };
  }

  async login(loginData: LoginDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findOne({
      where: { email: loginData.email },
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtTokenPayload = {
      email: existingUser.email,
      id: existingUser.id,
    };

    const jwtToken = this.createJwtToken(payload);

    return { email: existingUser.email, token: jwtToken };
  }
}
