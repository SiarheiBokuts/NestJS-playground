import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtTokenData } from 'src/modules/auth/auth.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly jwtSecret: string;

  constructor(private configService: ConfigService) {
    this.jwtSecret = this.configService.getOrThrow('JWT_SECRET');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      req.token = authHeader.split(' ')[1]; // Save token to req object

      try {
        const decoded: JwtTokenData = jwt.verify(
          req.token,
          this.jwtSecret,
        ) as JwtTokenData;

        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        req.user = decoded;
      } catch {
        // silently ignore invalid token
      }
    }
    next();
  }
}
