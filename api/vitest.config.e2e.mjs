import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    include: ['test/e2e/**/*.e2e-spec.ts'],
    testTimeout: 30000,
  },
});
