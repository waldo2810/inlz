import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [DatabaseModule, UserModule],
  exports: [ProjectsService],
})
export class ProjectsModule {}
