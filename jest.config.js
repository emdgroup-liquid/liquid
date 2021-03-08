const tsPreset = require('ts-jest/jest-preset')
const pa11yPreset = require('jest-pa11y/jest-preset')

module.exports = {
  ...tsPreset,
  ...pa11yPreset,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(a11y).ts'],
}
