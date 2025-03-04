// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // any 타입 사용 금지
      '@typescript-eslint/no-floating-promises': 'warn', // 부수 효과가 있는 함수 호출 금지
      '@typescript-eslint/no-unsafe-argument': 'warn', // 안전하지 않은 인자 사용 금지

      'prettier/prettier': ['error', { endOfLine: 'auto' }], // 줄바꿈 스타일 표준화
      'no-console': 'warn', // console.log 사용 금지
    },
  },
);
