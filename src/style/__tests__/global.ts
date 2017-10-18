import { GLOBAL } from '../global';

test('it matches snapshot', () => {
  expect(GLOBAL).toMatchSnapshot();
});
