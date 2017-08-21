const fs = require('fs');

module.exports = {
  process(src, filename, config, options) {
    const contents = fs.readFileSync(filename, 'utf8');
    return `module.exports = ${JSON.stringify(contents)}`;
  }
};
