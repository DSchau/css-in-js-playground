import * as React from 'react';
import glamorous from 'glamorous';

import { Module } from '../../interfaces';

const Container = glamorous.div({
  display: 'flex',
  width: '100%'
});

interface Props {
  children: any;
  code: Module;
  onError?: Function;
}

interface State {
  code: Module | undefined;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = {
    code: undefined,
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
