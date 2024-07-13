import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { and, eq } from 'drizzle-orm';
import { DatabaseService } from 'src/database/database.service';
import { InsertTask, SelectTask, tasksTable } from 'src/database/schema';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private dbService: DatabaseService,
    private projectService: ProjectsService,
  ) {}

  async getTasks(user: AccessTokenDecoded, projectId: string) {
    await this.projectService.getProjectById(user, projectId);
    return await this.dbService.db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.projectId, projectId)));
  }

  async createTask(
    user: AccessTokenDecoded,
    projectId: string,
    task: CreateTaskDto,
  ) {
    await this.projectService.getProjectById(user, projectId);
    const taskToSave: InsertTask = {
      ...task,
      id: randomUUID(),
      projectId,
    };
    return await this.dbService.db
      .insert(tasksTable)
      .values(taskToSave)
      .returning();
  }

  async updateTask(task: UpdateTaskDto) {
    try {
      const foundTask = await this.dbService.db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.id, task.id));

      if (!foundTask) throw new NotFoundException('Task does not exist');
      return await this.dbService.db
        .update(tasksTable)
        .set(task)
        .where(
          and(
            eq(tasksTable.id, task.id),
            eq(tasksTable.projectId, task.projectId),
          ),
        );
    } catch (e) {
      throw e;
    }
  }
}
