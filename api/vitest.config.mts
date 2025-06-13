import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      include: ['src/**'], // 対象はsrcディレクトリ配下
      reporter: ['text', 'json', 'json-summary', 'html'],
    },
  },
});
