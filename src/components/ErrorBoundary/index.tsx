import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
`;

export default class ErrorBoundary extends React.Component<any, any> {
  state = {
    error: false
  };

  componentDidCatch(error) {
    this.setState({
      error
    });
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
