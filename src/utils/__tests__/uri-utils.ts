import { compress, decompress } from '../uri-utils';

const snippet = `
import React, { Component } from 'react';
import styled from 'styled-components';

const Heading = styled.h1\`
  color: red;
\`;

export default class Login extends Component {
  render() {
    return <Heading>Hello World</Heading>;
  }
}
`;

test('it compresses code snippet', () => {
  expect(compress(snippet)).toMatchSnapshot();
});

test('it decompresses code snippet', () => {
  const compressed = compress(snippet);

  expect(decompress(compressed)).toBe(snippet);
});
