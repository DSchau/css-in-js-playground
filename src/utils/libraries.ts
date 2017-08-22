const expr = library => new RegExp(`["']${library}["']`);

const matchesExpression = (text, library) => text.match(expr(library));
const exposeExports = (name, includeAll = true) => {
  return library => {
    const lib = library.default ? library.default : library;
    return Object.keys(includeAll ? lib : {}).reduce(
      (scope, key) => {
        scope[key] = lib[key];
        return scope;
      },
      {
        [name]: lib
      }
    );
  };
};

export default code => {
  const matches = matchesExpression.bind(undefined, code);

  if (matches('styled-components')) {
    return import('styled-components').then(exposeExports('styled', false));
  } else if (matches('glamor')) {
    return import('glamor').then(exposeExports('glamor'));
  } else if (matches('glamorous')) {
    return import('glamorous').then(exposeExports('glamorous', false));
  } else if (matches('aphrodite')) {
    return import('aphrodite').then(exposeExports('aphrodite'));
  } else if (matches('cxs')) {
    return import('cxs').then(exposeExports('cxs'));
  } else if (matches('radium')) {
    return import('radium').then(exposeExports('Radium'));
  }
  return Promise.resolve({});
};
