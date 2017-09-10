import evalCode from '../eval';

test('it returns a function', () => {
  expect(typeof evalCode('export default () => null')).toBe('function');
});

test('it returns null from noop if snippet does not default export', () => {
  expect(evalCode('')()).toBeNull();
});

test('it changes export default to return statement', () => {
  const returnValue = 'red';
  const snippet = `
    export default () => ${JSON.stringify(returnValue)};
  `;

  expect(evalCode(snippet)()).toBe(returnValue);
});

test('it removes import expressions', () => {
  const snippet = `
import React from 'react';
import styled from 'styled-components';

export default () => null;
  `;

  const Component = evalCode(snippet);

  expect(Component.toString()).not.toMatch(/import/);
});
