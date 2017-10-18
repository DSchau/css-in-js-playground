/* eslint import/first: "off" */
jest.mock('../');
import snippets, { files } from '../';

test('it matches snippets', () => {
  expect(Object.keys(snippets)).toMatchSnapshot();
});

test('it matches files', () => {
  expect(files).toMatchSnapshot();
});
