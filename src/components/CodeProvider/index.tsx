import * as React from 'react';
import glamorous from 'glamorous';

import Editor from '../CodeEditor/';
import ErrorBoundary from '../ErrorBoundary/';
import Preview from '../CodePreview/';

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
  code: string;
}

interface State {
  code: string;
  error: Error | null;
  errorInfo: {
    componentStack: string;
  };
}

class CodeProvider extends React.Component<Props, State> {
  state = {
    code: ``,
    error: null,
    errorInfo: null
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
  };

  handleEditorUpdate = code => {
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
        <Editor
          code={code}
          error={error}
          errorInfo={errorInfo}
          onUpdate={this.handleEditorUpdate}
        />
        <ErrorBoundary code={code} onError={this.handleError}>
          <Preview code={code} error={error} errorInfo={errorInfo} />
        </ErrorBoundary>
      </Container>
    );
  }
}

export default CodeProvider;
