import * as React from 'react';
import glamorous from 'glamorous';
import * as queryString from 'query-string';

import Editor from '../CodeEditor/';
import ErrorBoundary from '../ErrorBoundary/';
import Preview from '../CodePreview/';

import { LARGE_UP } from '../../constants/breakpoints';
import { compress, decompress } from '../../utils/uri-utils';

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
  snippet: string;
}

interface State {
  code?: string;
  error: Error | null;
  errorInfo: {
    componentStack: string;
  };
  hydrated?: boolean;
}

class CodeProvider extends React.Component<Props, State> {
  state = {
    code: ``,
    error: null,
    errorInfo: null,
    hydrated: false
  };

  static defaultProps = {
    snippet: ``
  };

  componentWillMount() {
    const search = queryString.parse(location.search);
    if (search.code) {
      const code = decompress(search.code);
      this.setState({
        code,
        hydrated: true
      });
    }
  }

  componentWillReceiveProps({ snippet }: Props) {
    if (snippet) {
      const update = this.state.hydrated
        ? {
            hydrated: false
          }
        : {
            code: snippet
          };
      this.setState(update);
    }
  }

  handleSelect = code => {
    this.setState({
      code
    });
  };

  handleEditorUpdate = code => {
    if (code !== this.props.snippet) {
      this.persistToQueryString(code);
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

  persistToQueryString(code) {
    const search = queryString.parse(location.search);
    const compressed = compress(code);
    const params = {
      ...search,
      code: compressed
    };
    const path = `${location.origin}${location.pathname}?${queryString.stringify(
      params
    )}`;
    history.replaceState({ path }, '', path);
  }

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
