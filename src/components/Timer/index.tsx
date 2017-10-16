import * as React from 'react';
import glamorous from 'glamorous';
import { darken } from 'polished';

import { SANS_SERIF, SLIDE_UP, ThemeProps, Z_INDEX_SUPER } from '../../style';

const Container = glamorous.div<ThemeProps>(
  {
    position: 'absolute',
    bottom: '7.5%',
    right: '2.5%',
    width: 'auto',
    padding: '0.5rem 1rem',
    margin: '0 auto',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    animation: `${SLIDE_UP} 325ms cubic-bezier(0.390, 0.575, 0.565, 1.000)`,
    zIndex: Z_INDEX_SUPER
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].base,
    borderColor: darken(0.05, theme[theme.primary].base)
  })
);

const TimerContainer = glamorous.div({
  textAlign: 'center'
});

const Title = glamorous.h1<ThemeProps>(
  {
    margin: 0,
    padding: 0,
    fontSize: 12,
    display: 'inline-block',
    textTransform: 'uppercase'
  },
  SANS_SERIF,
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

const Button = glamorous.button<ThemeProps>(
  {
    outline: 'none',
    borderWidth: 0,
    borderRadius: '0.125rem',
    marginLeft: '1rem',
    padding: '0.25rem 0.5rem',
    boxSizing: 'border-box'
  },
  SANS_SERIF,
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].text,
    color: theme[theme.primary].base
  })
);

interface Props {
  duration: number;
  onElapsed(): any;
}

interface State {
  seconds: number;
}

export class Timer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      seconds: props.duration / 1000
    };
  }

  interval: number;
  componentDidMount() {
    this.interval = setInterval(() => {
      const seconds = this.state.seconds - 1;
      let stateUpdatedCallback = () => {};
      if (seconds === 0) {
        clearInterval(this.interval);
        stateUpdatedCallback = this.handleElapsed;
      }
      this.setState(
        {
          seconds
        },
        stateUpdatedCallback
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleElapsed = () => {
    this.props.onElapsed();
  };

  render() {
    if (this.state.seconds === 0) {
      return null;
    }
    return (
      <Container>
        <TimerContainer>
          <Title>Content Updated</Title>
          <Button onClick={this.handleElapsed}>
            Refresh? ({this.state.seconds})
          </Button>
        </TimerContainer>
      </Container>
    );
  }
}
