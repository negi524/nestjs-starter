import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  onApplicationShutdown(signal?: string) {
    console.log(`onApplicationShutdown: ${signal}`);
  }

  getHello(): string {
    const envName = this.configService.get<string>('NODE_ENV');
    return `Hello World! env=${envName}`;
  }
}
