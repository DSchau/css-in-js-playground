import * as FONTS from '../fonts';

test('it contains a SERIF font', () => {
  expect(FONTS.SERIF).toMatchSnapshot();
});

test('it contains a SANS_SERIF font', () => {
  expect(FONTS.SANS_SERIF).toMatchSnapshot();
});
