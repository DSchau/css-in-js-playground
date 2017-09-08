import Worker from '../Worker';

const worker = new Worker();

export default function transform(code): Promise<any> {
  return new Promise((resolve, reject) => {
    worker.onmessage = ev => {
      resolve(ev.data);
    };

    worker.postMessage({
      code,
      plugins: code.match(/['"]emotion['"]/)
        ? [
            [
              'emotion/babel',
              {
                inline: true,
                autoImportCssProp: false
              }
            ]
          ]
        : []
    });
  });
}
