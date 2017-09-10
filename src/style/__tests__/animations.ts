import * as ANIMATIONS from '../animations';

test('it contains a SLIDE_UP animation', () => {
  expect(ANIMATIONS.SLIDE_UP).toMatchSnapshot();
});
