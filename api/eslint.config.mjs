import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

const configs = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    name: 'base-setting',
    files: ['**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
);

export default configs;
