import { describe, beforeAll, afterAll, test, expect } from 'vitest';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTestApp } from './setup';

const TEST_EMPLOYEE_ID = '01ARYZ6S41TSV4RRFFQ69G5FAV';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    ({ app, prisma } = await createTestApp());

    await prisma.skillEntity.deleteMany();
    await prisma.employeeEntity.deleteMany();

    await prisma.employeeEntity.create({
      data: {
        id: TEST_EMPLOYEE_ID,
        name: 'テスト太郎',
      },
    });
  });

  afterAll(async () => {
    await prisma.skillEntity.deleteMany();
    await prisma.employeeEntity.deleteMany();
    await app.close();
  });

  test('GET /v1/employee - 全件取得', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/employee')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /v1/employee?name=テスト - 名前検索', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/employee?name=テスト')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((e: { name: string }) => e.name === 'テスト太郎')).toBe(true);
  });

  test('GET /v1/employee/download - CSV ダウンロード', async () => {
    await request(app.getHttpServer())
      .get('/v1/employee/download')
      .expect(200)
      .expect('Content-Type', /text\/csv/);
  });
});
