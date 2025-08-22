import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtTokenPayload } from 'src/modules/auth/auth.model';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(private configService: ConfigService) {
    this.jwtSecret = this.configService.getOrThrow('JWT_SECRET');
  }

  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token: string = request.token;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decoded: JwtTokenPayload = jwt.verify(
        token,
        this.jwtSecret,
      ) as JwtTokenPayload;

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request['user'] = decoded;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
