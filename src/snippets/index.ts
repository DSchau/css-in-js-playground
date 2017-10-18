const context = require.context('.', true, /\.js$/);
const keys = context.keys();

const lib = keys.reduce((lib, path) => {
  let [, library, fileName] = path.split('/');
  const [file] = fileName.split('.js');
  lib[library] = {
    ...(lib[library] || {}),
    [file]: context(path)
  };
  return lib;
}, {});

const { libraries, files } = keys.reduce(
  (lib, path) => {
    let [, library, fileName] = path.split('/');
    const [file] = fileName.split('.js');
    if (lib.files.indexOf(file) === -1) {
      lib.files.push(file);
    }
    lib.libraries[library] = {
      ...(lib.libraries[library] || {}),
      [file]: context(path)
    };
    return lib;
  },
  {
    libraries: {},
    files: []
  }
);

export { files };

export default libraries;
