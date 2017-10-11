jest.mock('../../../utils/libraries', () => {
  return () => {};
});

import * as React from 'react';
import { shallow } from 'enzyme';

import { CodeProvider } from '../';

(global as any).onmessage = () => {};

test('it can be rendered', () => {
  expect(() => shallow(<CodeProvider activeModule="index" code={{ index: '', header: '', login: '' }} library="styled-components" />)).not.toThrow();
});
