import { JwtTokenData } from 'src/modules/auth/auth.model';

declare global {
  namespace Express {
    interface Request {
      user?: JwtTokenData;
      token?: string;
    }
  }
}
