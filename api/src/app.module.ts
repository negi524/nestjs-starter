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
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { OpenTelemetryModule } from 'nestjs-otel';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true, // Includes Host Metrics
    // apiMetrics: {
    //   // @deprecated - will be removed in 8.0 - you should start using the semcov from opentelemetry metrics instead
    //   enable: true, // Includes api metrics
    //   defaultAttributes: {
    //     // You can set default labels for api metrics
    //     custom: 'label',
    //   },
    //   ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
    //   ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
    //   prefix: 'my_prefix', // Add a custom prefix to all API metrics
    // },
  },
});

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
      },
    }),
    TasksModule,
    HealthModule,
    PrismaModule,
    AccountModule,
    EmployeeModule,
    SampleMailerModule,
    PrometheusModule.register(),
    OpenTelemetryModuleConfig,
    ConfigModule.forRoot({
      validate: validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
