const commonTSConfig = {
  extends: [
    'eslint:recommended',
    'plugin:compat/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier', 'promise'],
  rules: {
    '@stencil/decorators-style': 0,
    '@stencil/decorators-context': 0,
    '@stencil/element-type': 0,
    '@stencil/no-unused-watch': 0,
    '@stencil/own-methods-must-be-private': 0,
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
  env: { browser: true, node: true, es2022: true },
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
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
  settings: {
    react: {
      version: '0',
    },
  },
}
