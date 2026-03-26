import { Module } from '@nestjs/common';
import { TasksService } from './application/service/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService],
})
export class TasksModule {}
