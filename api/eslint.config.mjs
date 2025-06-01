import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const configs = tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  eslintConfigPrettier,
  {
    name: 'base-setting',
    files: ['**/*'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
);

export default configs;
