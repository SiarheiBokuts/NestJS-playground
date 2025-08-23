import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { method, originalUrl, query, body } = req;

    console.log('--- Incoming Request ---');
    console.log(`Method: ${method}`);
    console.log(`URL: ${originalUrl}`);

    console.log(
      `Query:`,
      query && Object.keys(query).length > 0 ? query : 'None',
    );
    console.log(`Body:`, body && Object.keys(body).length > 0 ? body : 'None');
    console.log(`User`, req.user ? req.user : 'None');
    console.log('------------------------');

    next();
  }
}
