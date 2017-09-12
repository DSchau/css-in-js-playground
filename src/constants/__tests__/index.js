import * as CONSTANTS from '../';

test('it contains expected exports', () => {
  expect(Object.keys(CONSTANTS)).toMatchSnapshot();
});
