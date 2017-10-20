const preset = require('jest-preset-typescript');

module.exports = {
  preset: 'jest-preset-typescript',
  transform: Object.assign(preset.transform, {
    '^.+snippets/.+\\.js$': '<rootDir>/js-transformer.js'
  }),
  setupFiles: [
    'raf/polyfill',
    'mock-local-storage',
    '<rootDir>/jest.setup.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.css$': "<rootDir>/__mocks__/styleMock.js"
  },
  roots: [
    '<rootDir>/src'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  testPathIgnorePatterns: [
    '__fixtures__',
    'node_modules',
    '/dist'
  ]
}
