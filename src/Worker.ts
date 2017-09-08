import * as Babel from 'babel-standalone';

onmessage = ev => {
  const { data = {} } = ev;
  const { code = '' } = data;
  try {
    const { code: transformed } = Babel.transform(code, {
      presets: [['es2015', { modules: false }], 'stage-2', 'react']
    });
    (postMessage as any)(transformed);
  } catch (e) {
    console.warn(e);
  }
};

export default () => {}; // only to get around annoying typescript errors
