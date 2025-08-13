import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkDatabase(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1');
      return 'Database connection OK ✅';
    } catch (err) {
      console.error(err);
      return 'Database connection FAILED ❌';
    }
  }
}
