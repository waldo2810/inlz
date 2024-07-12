import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import { usersTable } from 'src/database/schema';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private dbService: DatabaseService) {}

  async findOneByEmail(email: string) {
    try {
      const result = await this.dbService.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!result.length) throw new NotFoundException('User not found');

      const user = result[0];
      return user as User;
    } catch (e) {
      throw e;
    }
  }

  async findOneByEmailNoValidate(email: string) {
    const result = await this.dbService.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    const user = result[0];
    return user as User;
  }

  async findOneById(id: string): Promise<User> {
    try {
      const result = await this.dbService.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));

      if (!result.length) throw new NotFoundException('User not found');

      const user = result[0];
      return user as User;
    } catch (e) {
      throw e;
    }
  }

  async create(user: User): Promise<User[]> {
    try {
      const res = await this.dbService.db
        .insert(usersTable)
        .values({
          id: randomUUID(),
          ...user,
        })
        .returning();

      return res;
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
