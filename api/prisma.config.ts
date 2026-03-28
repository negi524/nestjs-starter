import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.MIGRATION_DATABASE_URL!,
  },
  migrations: {
    seed: 'tsx src/prisma/seed.ts',
  },
});
