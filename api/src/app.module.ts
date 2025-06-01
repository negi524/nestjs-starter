import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { TasksModule } from './task/tasks.module';
import { SampleMailerModule } from './mail/sampleMailer.module';

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

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
