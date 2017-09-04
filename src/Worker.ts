import * as buble from 'buble';

onmessage = ev => {
  const { data: code } = ev;
  try {
    const { code: transformed } = buble.transform(code, {
      transforms: {
        modules: false,
        templateString: false
      }
    });
    (postMessage as any)(transformed);
  } catch (e) {
    console.warn(e);
  }
};

export default () => {}; // only to get around annoying typescript errors
