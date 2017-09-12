import React from 'react';
import { shallow } from 'enzyme';

import Timer from '../';

test('it can be rendered', () => {
  expect(() =>
    shallow(<Timer duration={5000} onElapsed={() => {}} />)
  ).not.toThrow();
});
