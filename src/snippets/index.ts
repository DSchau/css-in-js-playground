const context = require.context('.', true, /\.js$/);
const keys = context.keys();

const libraries = keys.reduce((libraries, path) => {
  let [, library, fileName] = path.split('/');
  const [file] = fileName.split('.js');
  libraries[library] = {
    ...(libraries[library] || {}),
    [file]: context(path)
  };
  return libraries;
}, {});

export default keys.reduce((libraries, path) => {
  let [, library, fileName] = path.split('/');
  const [file] = fileName.split('.js');
  libraries[library] = {
    ...(libraries[library] || {}),
    [file]: context(path)
  };
  return libraries;
}, {});
