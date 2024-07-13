import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(
    @User() user: AccessTokenDecoded,
    @Query('projectId') projectId: string,
  ) {
    return await this.taskService.getTasks(user, projectId);
  }

  @Post()
  async createTask(
    @User() user: AccessTokenDecoded,
    @Query('projectId') projectId: string,
    @Body() task: CreateTaskDto,
  ) {
    return await this.taskService.createTask(user, projectId, task);
  }

  @Put()
  async updateTask(@Body() task: UpdateTaskDto) {
    return await this.taskService.updateTask(task);
  }
}
