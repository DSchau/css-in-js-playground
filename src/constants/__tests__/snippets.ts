import * as SNIPPETS from '../snippets';

test('it exports common libraries', () => {
  const keys = Object.keys(SNIPPETS).sort();

  expect(keys).toMatchSnapshot();
});
