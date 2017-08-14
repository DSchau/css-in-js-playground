import * as React from 'react';

export default class ErrorBoundary extends React.Component<any, any> {
  state = {
    error: false
  };

  componentDidCatch(err) {
    console.warn(err);
    this.setState({
      error: err
    });
  }

  render() {
    if (this.state.error) {
      return <pre>{JSON.stringify(this.state.error, null, 2)}</pre>;
    }
    return this.props.children;
  }
}
