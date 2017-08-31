import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import evalCode from '../../utils/eval';
import transform from '../../utils/transpile';
import getStylingLibrary from '../../utils/libraries';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  @media only screen and (min-width: 768px) {
    height: auto;
  }
`;

const CodeContainer = styled.div`
  display: block;
  height: auto;
  width: 100%;
`;

const LivePreview = ({ code }) => {
  return <pre>{code}</pre>
};

interface Props {
  code: string;
}

interface State {
  Component: Function;
  loaded: boolean;
  scope: any;
}

export default class Preview extends React.Component<Props, State> {
  state = {
    Component: () => null,
    loaded: false,
    scope: {}
  };

  componentWillReceiveProps({ code }) {
    this.setState({ loaded: false, scope: {} });

    getStylingLibrary(code)
      .then(library => {
        this.setState({
          loaded: true,
          scope: library
        }, () => {
          transform(code || '')
            .then(es5 => {
              this.setState({
                Component: evalCode(es5, this.state.scope)
              })
            });
        });
      });
    

  }

  render() {
    const { code } = this.props;
    if (!this.state.loaded) {
      return <Container />;
    }
    const { Component } = this.state;
    return (
      <Container>
        <CodeContainer>
          <Component />
        </CodeContainer>
      </Container>
    );
  }
}
