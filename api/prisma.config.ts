import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: env('MIGRATION_DATABASE_URL'),
  },
  migrations: {
    seed: 'tsx src/prisma/seed.ts',
  },
});
