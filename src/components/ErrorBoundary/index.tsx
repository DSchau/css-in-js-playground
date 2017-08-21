import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

interface Props {
  children: any;
  code: string | undefined;
  onError?: Function;
}

interface State {
  code: string | undefined;
  error: any;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    code: ``,
    error: undefined
  };

  componentDidCatch(error, info) {
    if (this.props.onError) {
      this.props.onError({
        message: info.componentStack
      });
    }
    this.setState({
      error
    });
  }

  componentWillReceiveProps(nextProps) {
    const { code } = nextProps;
    if (code !== this.state.code) {
      this.setState({
        code,
        error: undefined
      })
    }
  }

  render() {
    if (this.state.error) {
      return (
        <Container />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
