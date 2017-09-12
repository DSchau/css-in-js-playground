import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../';

test('it can be rendered', () => {
  expect(() => shallow(<Footer />)).not.toThrow();
});
