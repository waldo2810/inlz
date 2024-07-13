import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get(':id')
  async getProjectById(
    @User() userInfo: AccessTokenDecoded,
    @Param() params: { id: string },
  ) {
    const id = params.id;
    return this.projectsService.getProjectById(userInfo, id);
  }

  @Get()
  async getProjects(@User() userInfo: AccessTokenDecoded) {
    return this.projectsService.getProjects(userInfo);
  }

  @Post()
  async createProject(
    @User() userInfo: AccessTokenDecoded,
    @Body() project: CreateProjectDto,
  ) {
    return this.projectsService.createProject(userInfo, project);
  }
}
