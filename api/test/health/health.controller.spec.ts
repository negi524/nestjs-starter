import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from 'src/health/health.controller';
import {describe, beforeEach, expect, test } from 'vitest'

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('check', () => {
    expect(controller.check()).toStrictEqual({
      status: 'ok',
      details: {},
    });
  });
});
