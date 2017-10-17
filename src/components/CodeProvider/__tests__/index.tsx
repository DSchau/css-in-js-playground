/* eslint import/first: "off" */
jest.mock('../../../utils/libraries');
jest.mock('../../../utils/web-fonts');
jest.mock('../../../snippets/');

import * as React from 'react';
import { shallow } from 'enzyme';

import { CodeProvider } from '../';

(global as any).onmessage = () => {};

test('it can be rendered', () => {
  expect(() =>
    shallow(
      <CodeProvider
        activeModule="index"
        code={{ index: '', header: '', form: '', login: '' }}
        library="styled-components"
        onUpdate={() => {}}
      />
    )
  ).not.toThrow();
});
