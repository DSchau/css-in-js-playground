/* eslint import/first: "off" */
jest.mock('../../../utils/libraries');
jest.mock('../../../utils/web-fonts');
jest.mock('../../../snippets/');

import * as React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../';
import { Theme, THEME } from '../../../style';

test('it can be rendered', () => {
  expect(() =>
    shallow(
      <Header
        activeModule="index"
        defaultLibrary="styled-components"
        files={['index.js']}
        primary="dark"
        snippets={{}}
        theme={THEME as Theme}
        onActiveChange={() => {}}
        onFileAdd={() => {}}
        onSelect={() => {}}
      />
    )
  ).not.toThrow();
});
