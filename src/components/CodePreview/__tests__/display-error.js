import React from 'react';
import { shallow } from 'enzyme';

import DisplayError from '../display-error';

test('it renders', () => {
  expect(() =>
    shallow(
      <DisplayError
        error={{
          name: 'hello-world'
        }}
        errorInfo={{
          componentStack: 'asdf'
        }}
      />
    )
  ).not.toThrow();
});
