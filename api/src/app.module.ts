import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { TasksModule } from './modules/task/tasks.module';
import { UserModule } from './modules/user/user.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { SampleMailerModule } from './modules/mail/sampleMailer.module';

@Module({
  imports: [
    TasksModule,
    HealthModule,
    PrismaModule,
    UserModule,
    EmployeeModule,
    SampleMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
