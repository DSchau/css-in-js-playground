/* eslint import/first: "off" */
jest.mock('../../../utils/libraries');
jest.mock('../../../utils/web-fonts');
jest.mock('../../../snippets/');

import * as React from 'react';
import { shallow } from 'enzyme';

import { Footer } from '../';

test('it can be rendered', () => {
  expect(() => shallow(<Footer />)).not.toThrow();
});
