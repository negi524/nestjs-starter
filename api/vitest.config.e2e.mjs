import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      'generated/prisma': resolve(__dirname, 'generated/prisma'),
    },
  },
  test: {
    globals: true,
    include: ['test/e2e/**/*.e2e-spec.ts'],
    testTimeout: 30000,
    server: {
      deps: {
        external: [/generated\/prisma/],
      },
    },
  },
});
