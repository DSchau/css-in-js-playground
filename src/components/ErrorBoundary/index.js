import React, { Component } from 'react';
import glamorous from 'glamorous';

const Container = glamorous.div({
  display: 'flex',
  width: '100%'
});

type Props = {
  children: any,
  code: string | undefined,
  onError?: Function
};

type State = {
  code: string | undefined
};

class ErrorBoundary extends Component<Props, State> {
  state = {
    code: ``,
    error: undefined
  };

  componentDidCatch(error, info) {
    if (this.props.onError) {
      this.props.onError({
        error,
        info
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { code } = nextProps;
    if (code !== this.state.code) {
      this.setState({
        code
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
