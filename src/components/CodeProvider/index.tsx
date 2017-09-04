import * as React from 'react';
import styled from 'styled-components';

import Editor from '../CodeEditor/';
import ErrorBoundary from '../ErrorBoundary/';
import Preview from '../CodePreview/';

import { LARGE_UP } from '../../constants/breakpoints';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  @media only screen and (${LARGE_UP}) {
    flex-direction: row;
  }
`;

interface Props {
  code: string;
}

interface State {
  code: string;
  error: Error | null;
}

class CodeProvider extends React.Component<Props, State> {
  state = {
    code: ``,
    error: null
  };

  static defaultProps = {
    code: ``
  };

  componentWillReceiveProps({ code }) {
    if (code) {
      this.setState({
        code
      });
    }
  }

  handleSelect = code => {
    this.setState({
      code
    });
  }

  handleEditorUpdate = code => {
    this.setState({
      code,
      error: null
    });
  }

  handleError = error => {
    this.setState({
      error
    });
  }

  render() {
    return (
      <Container>
        <Editor code={this.state.code} error={this.state.error} onUpdate={this.handleEditorUpdate} />
        <ErrorBoundary code={this.state.code} onError={this.handleError}>
          <Preview code={this.state.code} />
        </ErrorBoundary>
      </Container>
    );
  }
}

export default CodeProvider;
