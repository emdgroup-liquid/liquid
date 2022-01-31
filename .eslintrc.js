const commonTSConfig = {
  extends: [
    'eslint:recommended',
    'plugin:compat/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'promise'],
  rules: {
    '@stencil/decorators-style': 0,
    '@stencil/element-type': 0,
    '@stencil/strict-boolean-conditions': 0,
    '@stencil/strict-mutable': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-extra-semi': 0,
    'prettier/prettier': 'error',
    'react/jsx-no-bind': 0,
  },
}

module.exports = {
  env: { browser: true, amd: true, node: true, es6: true },
  root: true,
  extends: ['eslint:recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  overrides: [
    {
      ...commonTSConfig,
      files: ['*.ts'],
    },
    {
      ...commonTSConfig,
      files: ['src/liquid/**/*.ts', 'src/liquid/**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      ...commonTSConfig,
      files: [
        'src/docs/**/*.ts',
        'src/docs/**/*.tsx',
        'src/liquid/**/test/*.ts',
      ],
      parserOptions: {
        project: ['./tsconfig.docs.json'],
      },
    },
  ],
  plugins: ['@babel'],
  settings: {
    react: {
      version: '0',
    },
  },
}
