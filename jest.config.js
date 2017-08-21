module.exports = {
  transform: {
    '^.+snippets/.+\\.js$': '<rootDir>/js-transformer.js',
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)?$',
  setupTestFrameworkScriptFile: 'mock-local-storage',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  testPathIgnorePatterns: [
    '__fixtures__',
    'node_modules',
    '/dist'
  ]
}
