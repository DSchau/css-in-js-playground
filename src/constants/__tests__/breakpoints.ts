import * as BREAKPOINTS from '../breakpoints';

test('it exports sized breakpoint helpers', () => {
  const helpers = Object.keys(BREAKPOINTS).sort();

  expect(helpers).toEqual([
    'LARGE_UP',
    'MEDIUM_UP',
    'SMALL_UP'
  ]);
});
