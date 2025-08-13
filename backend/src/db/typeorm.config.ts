import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.getOrThrow('DATABASE_HOST'),
  port: configService.getOrThrow('DATABASE_PORT') || 5432,
  username: configService.getOrThrow('DATABASE_USER'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  database: configService.getOrThrow('DATABASE_NAME'),
  entities: [path.join(__dirname, '/entities/**/*.entity.{ts,js}')],
  logging: true,
  logger: 'formatted-console',
  synchronize: true, // ⚠ Only use in development. Automatically modifies the database schema, which can be dangerous in production. In production, use migrations instead.
});
