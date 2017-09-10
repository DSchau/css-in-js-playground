import * as React from 'react';
import { shallow } from 'enzyme';

import Header from '../';

test('it can be rendered', () => {
  expect(() =>
    shallow(
      <Header
        defaultSnippet="styled-components"
        primary="dark"
        onSelect={() => {}}
      />
    )
  ).not.toThrow();
});
