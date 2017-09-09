import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { SANS_SERIF, SLIDE_UP } from '../../style';

const Container = styled.div`
  position: absolute;
  bottom: 7.5%;
  right: 2.5%;
  width: auto;
  padding: 0.5rem 1rem;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: ${props => props.theme[props.theme.primary].base};
  border: 1px solid transparent;
  border-color: ${props => props.theme.primary === 'light' ? darken(0.05, props.theme.light.base) : 'transparent'};
  animation: ${SLIDE_UP} 325ms cubic-bezier(0.390, 0.575, 0.565, 1.000);
`;

const TimerContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: ${props => props.theme[props.theme.primary].text};
  font-size: 12px;
  display: inline-block;
  text-transform: uppercase;
  ${SANS_SERIF};
`;

const Button = styled.button`
  background-color: ${props => props.theme[props.theme.primary].text};
  color: ${props => props.theme[props.theme.primary].base};
  outline: none;
  border-width: 0;
  border-radius: 0.125rem;
  margin-left: 1rem;
  padding: 0.25rem 0.5rem;
  box-sizing: border-box;
  ${SANS_SERIF};
`;

interface Props {
  duration: number;
  onElapsed: Function;
}

interface State {
  seconds: number;
}

export default class Timer extends React.Component<Props, State> {
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
      let stateUpdatedCallback = () => { };
      if (seconds === 0) {
        clearInterval(this.interval);
        stateUpdatedCallback = this.handleElapsed;
      }
      this.setState({
        seconds
      }, stateUpdatedCallback);
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
            Refresh? 
            ({this.state.seconds})
          </Button>
        </TimerContainer>
      </Container>
    );
  }
}
