import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import ErrorBoundary from '../ErrorBoundary/';

import evalCode from '../../utils/eval/index';
import transform from '../../utils/transpile/';
import getStylingLibrary from '../../utils/libraries/';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LivePreview = ({ code }) => {
  return <pre>{code}</pre>
};

export default class Preview extends React.Component<any, any> {
  state = {
    loaded: false,
    scope: {}
  };

  componentWillReceiveProps({ code }) {
    this.setState({ loaded: false, scope: {} });

    getStylingLibrary(code)
      .then(library => {
        console.log(library);
        this.setState({
          loaded: true,
          scope: library
        });
      });
  }

  render() {
    const { code } = this.props;
    
    const Component = evalCode(transform(code || ''), this.state.scope);
    return (
      <Container>
        <ErrorBoundary>
          {this.state.loaded && <Component />}
        </ErrorBoundary>
      </Container>
    );
  }
}
