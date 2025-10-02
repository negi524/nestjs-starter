import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  migrations: {
    seed: 'ts-node src/prisma/seed.ts',
  },
});
