const { globby } = require('markdown-magic');
const path = require('path');

module.exports = {
  transforms: {
    LIBRARIES(content, options) {
      return globby.sync(path.resolve('src/snippets/**/*.js'))
        .sort()  
        .map(fullPath => {
          return {
            filePath: `src${fullPath.split('src').pop()}`,
            library: fullPath.split('/').pop().replace(/\..+$/, '')
          };
        })
        .map(({ filePath, library }) => `- [${library}](./${filePath})`)
        .join('\n');
    }
  }
};
