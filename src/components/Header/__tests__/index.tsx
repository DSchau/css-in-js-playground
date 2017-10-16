/* eslint import/first: "off" */
jest.mock('../../../utils/libraries');
jest.mock('../../../utils/web-fonts');
jest.mock('../../../snippets/');

import * as React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../';

test('it can be rendered', () => {
  expect(() =>
    shallow(
      <Header
        defaultSnippet="styled-components"
        primary="dark"
        onSelect={() => {}}
        snippets={{}}
        theme={{primary: 'dark'}}
      />
    )
  ).not.toThrow();
});
