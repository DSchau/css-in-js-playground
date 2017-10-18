import Worker from '../Worker';

import { Module } from '../interfaces';

const worker = new Worker();

export function transform(code: Module): Promise<any> {
  return new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      resolve(ev.data);
    };

    worker.postMessage({
      code
    });
  });
}
