import * as STYLE from '../';

test('it contains expected exports', () => {
  expect(Object.keys(STYLE)).toMatchSnapshot();
});
