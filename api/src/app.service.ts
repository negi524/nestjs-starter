import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validaton';

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  onApplicationShutdown(signal?: string) {
    console.log(`onApplicationShutdown: ${signal}`);
  }

  getHello(): string {
    const envName = this.configService.get('NODE_ENV', { infer: true });
    return `Hello World! env=${envName}`;
  }
}
