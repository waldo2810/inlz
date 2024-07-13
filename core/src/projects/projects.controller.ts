import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getProjects() {
    return this.projectsService.getProjects();
  }

  @Post()
  async createProject(
    @User() userInfo: AccessTokenDecoded,
    @Body() project: CreateProjectDto,
  ) {
    return this.projectsService.createProject(userInfo, project);
  }
}
