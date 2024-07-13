import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [DatabaseModule, ProjectsModule],
})
export class TasksModule {}
