import * as Babel from 'babel-standalone';

let hasEmotionBabel = false;

onmessage = ev => {
  const { data = {} } = ev;
  const { code = '', plugins = [] } = data;
  try {
    let promises = [];
    if (!hasEmotionBabel) {
      hasEmotionBabel = true;
      promises.push(import('emotion/babel'));
    }
    Promise.all(promises).then(values => {
      if (values.length > 0) {
        Babel.registerPlugin('emotion/babel', values[0]);
      }
      const { code: transformed } = Babel.transform(code, {
        presets: [['es2015', { modules: false }], 'stage-2', 'react'],
        plugins: ['transform-class-properties'].concat(plugins)
      });
      (postMessage as any)(transformed);
    });
  } catch (e) {
    console.warn(e);
  }
};

export default () => {}; // only to get around annoying typescript errors
