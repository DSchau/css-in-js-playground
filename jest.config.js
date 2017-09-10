module.exports = {
  transform: {
    '^.+snippets/.+\\.js$': '<rootDir>/js-transformer.js',
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js)?$',
  setupFiles: [
    'raf/polyfill',
    'mock-local-storage'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.css$': "<rootDir>/__mocks__/styleMock.js"
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  testPathIgnorePatterns: [
    '__fixtures__',
    'node_modules',
    '/dist'
  ]
}
