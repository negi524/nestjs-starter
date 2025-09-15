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
// import { OpenTelemetryModule } from 'nestjs-otel';
import { trace, context } from '@opentelemetry/api';

// const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
//   metrics: {
//     hostMetrics: true, // Includes Host Metrics
//     // apiMetrics: {
//     //   // @deprecated - will be removed in 8.0 - you should start using the semcov from opentelemetry metrics instead
//     //   enable: true, // Includes api metrics
//     //   defaultAttributes: {
//     //     // You can set default labels for api metrics
//     //     custom: 'label',
//     //   },
//     //   ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
//     //   ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
//     //   prefix: 'my_prefix', // Add a custom prefix to all API metrics
//     // },
//   },
// });

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'local'
            ? {
                target: 'pino-pretty',
              }
            : undefined,
        customProps: () => {
          const span = trace.getSpan(context.active());
          if (span) {
            return { traceId: span.spanContext().traceId };
          }
          return {};
        },
      },
    }),
    // OpenTelemetryModuleConfig,
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
