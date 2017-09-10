import * as React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from '../';

test('it can be rendered', () => {
  expect(() => shallow(<ErrorBoundary code={``}><h1>sup</h1></ErrorBoundary>)).not.toThrow();
});
