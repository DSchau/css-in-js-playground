import * as fs from 'fs';
import * as path from 'path';

const base = path.join(__dirname, '../');
const ignore = ['.DS_Store', '__tests__', '__mocks__'];

const allFilesAndFolders = fs
  .readdirSync(base)
  .filter(fileOrDirectory => {
    if (ignore.indexOf(fileOrDirectory) > -1) {
      return false;
    }
    return fs.statSync(path.join(base, fileOrDirectory)).isDirectory();
  })
  .map(directory => {
    const snippets = fs
      .readdirSync(path.join(base, directory))
      .filter(file => ignore.indexOf(file) === -1);
    return [directory, snippets];
  }) as string[][];

const files = allFilesAndFolders
  .slice(0, 1)
  .shift()
  .slice(1)
  .pop();

export { files };

export default allFilesAndFolders.reduce((libraries, [folder, files]) => {
  libraries[folder] = [].concat(files).reduce((library, file) => {
    library[file] = fs.readFileSync(path.join(base, folder, file), 'utf8');
    return library;
  }, {});
  return libraries;
}, {});
