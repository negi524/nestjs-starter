import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { TasksModule } from './modules/task/tasks.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { SampleMailerModule } from './modules/mail/sampleMailer.module';
import { AccountModule } from './modules/account/account.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validaton';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    TasksModule,
    HealthModule,
    PrismaModule,
    AccountModule,
    EmployeeModule,
    SampleMailerModule,
    ConfigModule.forRoot({
      validate: validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
