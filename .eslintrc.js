const commonTSConfig = {
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@stencil/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'promise'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@stencil/strict-boolean-conditions': 0,
  },
}

module.exports = {
  env: { browser: true, amd: true, node: true },
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
      files: ['src/liquid/**/*.ts', 'src/liquid/**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      ...commonTSConfig,
      files: ['src/docs/**/*.ts', 'src/docs/**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.docs.json'],
      },
    },
    {
      ...commonTSConfig,
      files: ['stencil.config*.ts', './src/test/**/*.ts'],
    },
  ],
  plugins: ['@babel'],
}
