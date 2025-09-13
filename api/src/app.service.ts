import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnApplicationShutdown {
  constructor(private prisma: PrismaService) {}
  onApplicationShutdown(signal?: string) {
    console.log(`onApplicationShutdown: ${signal}`);
  }

  getHello(): string {
    return `Hello World! env=${process.env.NODE_ENV}`;
  }
}
