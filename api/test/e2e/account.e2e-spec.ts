import { describe, beforeAll, beforeEach, afterAll, test, expect } from 'vitest';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTestApp } from './setup';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    ({ app, prisma } = await createTestApp());
  });

  beforeEach(async () => {
    await prisma.accountEntity.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/accounts/create', () => {
    test('正常系', async () => {
      const res = await request(app.getHttpServer())
        .post('/v1/accounts/create')
        .send({ name: 'testuser', password: 'Passw0rd!' })
        .expect(201);
      expect(res.body).toMatchObject({ id: expect.any(Number), name: 'testuser' });
    });

    test('パスワード不正（バリデーション違反）', async () => {
      await request(app.getHttpServer())
        .post('/v1/accounts/create')
        .send({ name: 'testuser', password: 'weak' })
        .expect(500);
    });
  });

  describe('POST /v1/accounts/signin', () => {
    test('正常系', async () => {
      await request(app.getHttpServer())
        .post('/v1/accounts/create')
        .send({ name: 'signinuser', password: 'Passw0rd!' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .post('/v1/accounts/signin')
        .send({ name: 'signinuser', password: 'Passw0rd!' })
        .expect(200);
      expect(res.body).toMatchObject({ id: expect.any(Number), name: 'signinuser' });
    });

    test('パスワード不一致', async () => {
      await request(app.getHttpServer())
        .post('/v1/accounts/create')
        .send({ name: 'signinuser2', password: 'Passw0rd!' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .post('/v1/accounts/signin')
        .send({ name: 'signinuser2', password: 'WrongPass1!' })
        .expect(403);
      expect(res.body).toMatchObject({ message: 'Forbidden' });
    });
  });

  describe('GET /v1/accounts/:id', () => {
    test('正常系', async () => {
      const createRes = await request(app.getHttpServer())
        .post('/v1/accounts/create')
        .send({ name: 'getuser', password: 'Passw0rd!' })
        .expect(201);
      const { id } = createRes.body;

      const res = await request(app.getHttpServer())
        .get(`/v1/accounts/${id}`)
        .expect(200);
      expect(res.body).toMatchObject({ id, name: 'getuser' });
    });

    test('存在しないID', async () => {
      const res = await request(app.getHttpServer())
        .get('/v1/accounts/999999')
        .expect(404);
      expect(res.body).toMatchObject({ message: 'NotFound' });
    });

    test('文字列ID（型不正）', async () => {
      await request(app.getHttpServer())
        .get('/v1/accounts/abc')
        .expect(400);
    });
  });
});
