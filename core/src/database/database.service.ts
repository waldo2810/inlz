import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { ConfigService } from '@nestjs/config';
import * as schema from './schema';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  private connectionURL = this.configService.get<string>(
    'TURSO_CONNECTION_URL',
  );
  private authToken = this.configService.get<string>('TURSO_AUTH_TOKEN');

  private client = createClient({
    url: this.connectionURL,
    authToken: this.authToken,
  });

  db = drizzle(this.client);
}
