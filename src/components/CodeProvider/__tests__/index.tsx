import * as React from 'react';
import { shallow } from 'enzyme';

jest.mock('../../../utils/libraries', () => {
  return () => {};
});

global.onmessage = jest.fn();

import CodeProvider from '../';

test('it can be rendered', () => {
  expect(() => shallow(<CodeProvider snippet="var a = 'b';" />)).not.toThrow();
});
