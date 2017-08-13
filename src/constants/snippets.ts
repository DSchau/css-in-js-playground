export const StyledComponents = `
import React from 'react';
import styled from 'styled-components';

export default function Button() {

}
`;

export const Glamor = `
import { css } from 'glamor'

const rule = {
  color: 'red',
  ':hover': {
    color: 'pink'
  }
};

export default function Container() {
  return (
    <h1 className={rule}>Hello World</h1>
  );
}
`;
