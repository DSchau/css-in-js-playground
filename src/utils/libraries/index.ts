export default code => {
  if (code.match('styled-components')) {
    return import('styled-components')
      .then(styled => ({ styled }));
  } else if (code.match('glamor')) {
    return import('glamor')
      .then(glamor => ({ css: glamor.css, glamor }));
  }
  return Promise.resolve({});
}
