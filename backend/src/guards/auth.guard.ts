import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtTokenData } from 'src/modules/auth/auth.model';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(private configService: ConfigService) {
    this.jwtSecret = this.configService.getOrThrow('JWT_SECRET');
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.token;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decoded: JwtTokenData = jwt.verify(
        token,
        this.jwtSecret,
      ) as JwtTokenData;

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = decoded;
    } catch (error) {
      console.error('JWT verification failed:', error);
      throw new UnauthorizedException();
    }
    return true;
  }
}
