module.exports = {
  preset: 'jest-preset-typescript',
  rootDir: '..',
  roots: [
    '<rootDir>/integration-tests'
  ],
  setupTestFrameworkScriptFile: '<rootDir>/integration-tests/jest.setup.ts'
};
