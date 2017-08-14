const expr = library => new RegExp(`["']${library}["']`);

const matchesExpression = (text, library) => text.match(expr(library));

export default code => {
  const matches = matchesExpression.bind(undefined, code);

  if (matches('styled-components')) {
    return import('styled-components')
      .then(styled => ({ styled: styled.default }));
  } else if (matches('glamor')) {
    return import('glamor')
      .then(glamor => ({ css: glamor.css, glamor }));
  } else if (matches('glam')) {
    return import('glam')
      .then(({ default: glam }) => ({ css: glam, glam }));
  } else if (matches('glamorous')) {
    return import('glamorous')
      .then(glamorous => ({ glamorous: glamorous.default }));
  } else if (matches('emotion/react')) {
    return import('emotion/react')
      .then(({ default: emotion }) => ({ css: emotion.css, emotion, styled: emotion }));
  } else if (matches('aphrodite')) {
    return import('aphrodite')
      .then(aphrodite => ({ aphrodite, css: aphrodite.css, StyleSheet: aphrodite.StyleSheet }));
  } else if (matches('cxs')) {
    return import('cxs')
      .then(cxs => ({ cxs }));
  }
  return Promise.resolve({});
}
