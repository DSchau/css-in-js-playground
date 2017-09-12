module.exports = {
  transform: {
    '^.+snippets/.+\\.js$': '<rootDir>/js-transformer.js'
  },
  setupFiles: [
    'raf/polyfill',
    'mock-local-storage'
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
