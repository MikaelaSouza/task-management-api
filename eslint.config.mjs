import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'src/generated/**', 'node_modules', 'coverage'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommended,

  prettierConfig,

  {
    files: ['**/*.ts'],

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
);
