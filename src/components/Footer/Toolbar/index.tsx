import * as React from 'react';
import glamorous from 'glamorous';
import { darken } from 'polished';

import { SANS_SERIF, ThemeProps } from '../../../style';

const Container = glamorous.div<ThemeProps>(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.5rem'
  },
  ({ theme }) => ({
    borderTop: `1px solid ${darken(0.1, theme[theme.primary].baseSecondary)}`,
    backgroundColor: theme[theme.primary].baseSecondary
  })
);

const Message = glamorous.h1<ThemeProps>(
  {
    margin: 0,
    padding: 0,
    fontSize: 14,
    textTransform: 'uppercase'
  },
  SANS_SERIF,
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

const Button = glamorous.button<ThemeProps>(
  {
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box',
    padding: '0.25rem 0.5rem',
    textTransform: 'uppercase'
  },
  SANS_SERIF,
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].text,
    color: theme[theme.primary].base
  })
);

interface Props {
  onReset(): any;
}

interface State {}

export class Toolbar extends React.Component<Props, State> {
  render() {
    return (
      <Container>
        <Message>You have local changes</Message>
        <Button aria-label="Discard code snippet" onClick={this.props.onReset}>
          Discard
        </Button>
      </Container>
    );
  }
}
