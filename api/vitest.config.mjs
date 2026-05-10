import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      enabled: true,
      include: ['src/**'],
      exclude: ['src/**/*.ejs'],
      reporter: ['text', 'json', 'json-summary', 'html'],
    },
  },
});
