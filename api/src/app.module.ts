import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health.module';
import { TasksModule } from './tasks.module';
import { EmployeeModule } from './employee.module';
import { SampleMailerModule } from './sampleMailer.module';
import { AccountModule } from './account.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validaton';
import { LoggerModule } from 'nestjs-pino';
import { trace, context } from '@opentelemetry/api';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        formatters: {
          level: (label: string) => {
            return { level: label };
          },
        },
        transport:
          process.env.NODE_ENV === 'local'
            ? {
                target: 'pino-pretty',
              }
            : undefined,
        customProps: () => {
          const span = trace.getSpan(context.active());
          return { traceId: span?.spanContext().traceId ?? null };
        },
      },
    }),
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
