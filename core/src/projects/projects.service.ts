import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { and, eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import {
  InsertProject,
  projectsTable,
  SelectProject,
} from 'src/database/schema';
import { UserService } from 'src/user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private dbService: DatabaseService,
    private userService: UserService,
  ) {}

  async getProjectById(user: AccessTokenDecoded, id: string) {
    const { id: userId } = await this.userService.findOneByEmail(user.email);
    const result = await this.dbService.db
      .select()
      .from(projectsTable)
      .where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId)));
    return result[0] as SelectProject;
  }

  async getProjects(user: AccessTokenDecoded) {
    const { id: userId } = await this.userService.findOneByEmail(user.email);
    return await this.dbService.db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.userId, userId));
  }

  async createProject(user: AccessTokenDecoded, project: CreateProjectDto) {
    const { id: userId } = await this.userService.findOneByEmail(user.email);
    const projectToSave: InsertProject = {
      id: randomUUID(),
      userId,
      ...project,
    };
    return await this.dbService.db
      .insert(projectsTable)
      .values(projectToSave)
      .returning();
  }
}
