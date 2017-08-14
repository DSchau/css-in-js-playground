import * as buble from 'buble';

export default function transform(code): string {
  try {
    return buble.transform(code, {
      transforms: {
        modules: false,
        templateString: false
      }
    }).code;
  } catch (e) {}
}
