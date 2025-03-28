import { defineConfig } from 'eslint';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2021,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
