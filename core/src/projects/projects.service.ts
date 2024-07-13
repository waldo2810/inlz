import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { InsertProject, projectsTable } from 'src/database/schema';
import { UserService } from 'src/user/user.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private dbService: DatabaseService,
    private userService: UserService,
  ) {}

  async getProjects() {
    return await this.dbService.db.select().from(projectsTable);
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
