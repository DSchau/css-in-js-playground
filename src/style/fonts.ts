import { css } from 'styled-components';

export const SANS_SERIF = css`
  font-family: sans-serif;
  .wf-active & {
    font-family: 'Montserrat', sans-serif;
  }
`;

export const SERIF = css`
  font-family: serif;
  .wf-active & {
    font-family: 'Bitter', serif;
  }
`;
