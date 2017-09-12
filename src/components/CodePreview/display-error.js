import React from 'react';
import glamorous from 'glamorous';
import { lighten } from 'polished';

const ErrorContainer = glamorous.div({
  position: 'absolute',
  left: '0',
  bottom: '0',
  right: '0',
  backgroundColor: lighten(0.45, 'red'),
  borderTop: `1px solid ${lighten(0.4, 'red')}`,
  zIndex: 4,
  padding: '0.5rem'
});

const Error = glamorous.pre({
  whiteSpace: 'pre-wrap',
  color: lighten(0.2, 'red'),
  fontSize: 12
});

const ErrorTitle = glamorous.strong({
  display: 'inline-block'
});

interface Props {
  error: Error | null,
  errorInfo: {
    componentStack: string
  }
}

export default function DisplayError({ error, errorInfo }: Props) {
  return (
    <ErrorContainer>
      <Error>
        <ErrorTitle>{error.name}</ErrorTitle>: {error.message}
      </Error>
      <Error>
        {errorInfo.componentStack}
      </Error>
    </ErrorContainer>
  );
}
