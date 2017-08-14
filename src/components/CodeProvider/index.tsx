import * as React from 'react';
import styled from 'styled-components';

import Editor from '../CodeEditor/';
import ErrorBoundary from '../ErrorBoundary/';
import Preview from '../CodePreview/';

import { TABLET_UP } from '../../constants/breakpoints';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  @media only screen and (${TABLET_UP}) {
    flex-direction: row;
  }
`;

class CodeProvider extends React.Component<CodeProviderProps, CodeProviderState> {
  state = {
    code: ``
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
      code
    });
  }

  render() {
    return (
      <Container>
        <Editor code={this.state.code} onUpdate={this.handleEditorUpdate} />
        <ErrorBoundary>
          <Preview code={this.state.code} />
        </ErrorBoundary>
      </Container>
    );
  }
}

interface CodeProviderProps {
  code: string;
}

interface CodeProviderState {
  code: string;
}

export default CodeProvider;
