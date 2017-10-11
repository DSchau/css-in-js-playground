import * as React from 'react';
import glamorous from 'glamorous';
import queryString from 'query-string';

import { CodeEditor, ErrorBoundary, CodePreview } from '../';

import { Module } from '../../interfaces';
import { LARGE_UP } from '../../constants/breakpoints';

const Container = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  position: 'relative',
  [`@media only screen and (${LARGE_UP})`]: {
    flexDirection: 'row'
  }
});

interface Props {
  activeModule: string;
  code: Module;
  library: string;
  onUpdate(code: string, activeModule: string): any;
}

interface State {
  code: Module;
  error: Error | null;
  errorInfo: {
    componentStack: string;
  };
  hydrated?: boolean;
}

export class CodeProvider extends React.PureComponent<Props, State> {
  state = {
    code: {} as Module,
    error: null,
    errorInfo: null,
    hydrated: false
  };

  static defaultProps = {
    library: 'styled-components'
  };

  // TODO: Improve this
  componentWillReceiveProps({ library, code }: Props) {
    const containsNewFile = Object.keys(code).length !== Object.keys(this.state.code).length;
    if (this.props.library !== library && !containsNewFile) {
      const update = this.state.hydrated
        ? {
            hydrated: false
          } as State
        : {
            code
          };
      this.setState(update);
    } else if (containsNewFile) {
      this.setState({
        code
      });
    }
  }

  handleEditorUpdate = (update, active) => {
    const code = {
      ...this.state.code,
      [active]: update
    };
    if (code[active] !== this.props.code[active]) {
      this.props.onUpdate(update, active);
    }
    this.setState({
      code,
      error: null
    });
  };

  handleError = ({ error, info }) => {
    this.setState({
      error,
      errorInfo: info
    });
  };

  render() {
    const { code, error, errorInfo } = this.state;
    return (
      <Container>
        <CodeEditor
          activeModule={this.props.activeModule}
          code={code}
          error={error}
          errorInfo={errorInfo}
          onUpdate={this.handleEditorUpdate}
        />
        <ErrorBoundary code={code} onError={this.handleError}>
          <CodePreview code={code} error={error} errorInfo={errorInfo} />
        </ErrorBoundary>
      </Container>
    );
  }
}
