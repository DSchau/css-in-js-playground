import * as React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';

const ErrorContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${lighten(0.45, 'red')};
  border-top: 1px solid ${lighten(0.4, 'red')};
  z-index: 4;
`;

const Error = styled.pre`
  white-space: pre-wrap;
  color: ${lighten(0.2, 'red')};
  font-size: 12px;
`;

interface Props {
  error: Error | null
};

export default function DisplayError({ error }: Props) {
  return <ErrorContainer><Error>{error.message}</Error></ErrorContainer>;
}