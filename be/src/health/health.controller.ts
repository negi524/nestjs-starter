import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'ヘルスチェックエンドポイント' })
  check(): HealthCheckResult {
    return {
      status: 'ok',
      details: {},
    };
  }
}
