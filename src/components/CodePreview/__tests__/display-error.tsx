import * as React from 'react';
import { shallow } from 'enzyme';

import DisplayError from '../display-error';

test('it renders', () => {
  expect(() =>
    shallow(
      <DisplayError
        error={new Error('Hello World')}
        errorInfo={{
          componentStack: 'asdf'
        }}
      />
    )
  ).not.toThrow();
});
