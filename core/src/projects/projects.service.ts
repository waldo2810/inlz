import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { projectsTable } from 'src/database/schema';

@Injectable()
export class ProjectsService {
  constructor(private dbService: DatabaseService) {}

  async getProjects() {
    return await this.dbService.db.select().from(projectsTable);
  }
}
