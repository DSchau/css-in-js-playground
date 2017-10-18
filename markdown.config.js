const path = require('path');
const fs = require('fs');

module.exports = {
  transforms: {
    LIBRARIES(content, options) {
      const base = path.join(process.cwd(), 'src/snippets');
      return fs.readdirSync(base)
        .filter(fileOrDirectory => fs.statSync(path.join(base, fileOrDirectory)).isDirectory())
        .filter(directory => !/^__/.test(directory))
        .sort()
        .map(library => `- [${library}](./src/snippets/${library}/index.js)`)
        .join('\n');
    }
  }
};
