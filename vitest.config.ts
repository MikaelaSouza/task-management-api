import { defineConfig } from 'vitest/config';

// Configuração dos testes automatizados.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
