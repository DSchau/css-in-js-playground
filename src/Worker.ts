import * as buble from 'buble';

import { Module } from './interfaces';

interface MessageEvent {
  data: {
    code: Module;
  };
}

onmessage = (ev: MessageEvent) => {
  const { data } = ev;
  const { code } = data;
  try {
    const transformed = Object.keys(code).reduce((components, name) => {
      components[name] = buble.transform(code[name], {
        transforms: {
          modules: false,
          templateString: false
        },
        sourcemap: false
      });

      return components;
    }, {});
    (postMessage as any)(transformed);
  } catch (e) {
    console.warn(e);
  }
};

export default () => {}; // only to get around annoying typescript errors
