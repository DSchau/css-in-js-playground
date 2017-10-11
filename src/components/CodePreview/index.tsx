import * as React from 'react';
import glamorous from 'glamorous';

import { evalCode, transform, getScopedImports } from '../../utils';

import DisplayError from './display-error';

import { Module } from '../../interfaces';

const Container = glamorous.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  position: 'relative',
  '@media only screen and (min-width: 768px)': {
    height: 'auto'
  }
});

const CodeContainer = glamorous.div({
  display: 'flex',
  height: 'auto',
  width: '100%',
  WebkitOverflowScrolling: 'touch'
});

interface Props {
  code: Module;
  error: Error;
  errorInfo: {
    componentStack: string;
  };
}

interface State {
  Component: React.ComponentType;
  loaded: boolean;
  scope: any;
}

export class CodePreview extends React.Component<Props, State> {
  state = {
    Component: () => null,
    loaded: false,
    scope: {}
  };

  componentWillReceiveProps({ code }: Props) {
    this.setState({ loaded: false, scope: {} });

    getScopedImports(code).then(library => {
      this.setState(
        {
          loaded: true,
          scope: library
        },
        () => {
          transform(code).then(es5 => {
            this.setState({
              Component: evalCode(es5, this.state.scope)
            });
          });
        }
      );
    });
  }

  render() {
    const { code, error, errorInfo } = this.props;
    if (!this.state.loaded && !error) {
      return <Container />;
    }
    const { Component } = this.state;
    return (
      <Container>
        <CodeContainer>
          {this.props.error ? (
            <DisplayError error={error} errorInfo={errorInfo} />
          ) : (
            <Component />
          )}
        </CodeContainer>
      </Container>
    );
  }
}
