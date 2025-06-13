import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
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
