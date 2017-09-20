import * as React from 'react';
import { shallow } from 'enzyme';

import { CodeEditorBase as CodeEditor } from '../';

test('it matches snapshot', () => {
  expect(shallow(<CodeEditor />)).toMatchSnapshot();
});
