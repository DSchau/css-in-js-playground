import * as React from 'react';
import glamorous from 'glamorous';
import queryString from 'query-string';

import { CodeEditor, ErrorBoundary, CodePreview } from '../';

import { Module } from '../../interfaces';
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
  activeModule: string;
  code: Module;
  library: string;
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

  componentWillMount() {
    const { activeModule, library, theme, ...rest } = queryString.parse(
      location.search
    );
    const code = Object.keys(rest || {}).reduce((decompressed, key) => {
      decompressed[key] = decompress(rest[key]);
      return decompressed;
    }, {}) as Module;

    if (Object.keys(code).length > 0) {
      this.setState({
        code,
        hydrated: true
      });
    }
  }

  // TODO: Improve this
  componentWillReceiveProps({ library, code }: Props) {
    if (this.props.library !== library) {
      const update = this.state.hydrated
        ? {
            hydrated: false
          } as State
        : {
            code
          };
      this.setState(update);
    }
  }

  handleEditorUpdate = (update, active) => {
    const code = {
      ...this.state.code,
      [active]: update
    };
    if (code[active] !== this.props.code[active]) {
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
    const params = Object.keys(code).reduce((compressed, key) => {
      const value = code[key];
      compressed[key] = compress(value);
      return compressed;
    }, {});

    const path = [
      location.origin,
      location.pathname,
      '?',
      queryString.stringify({
        ...search,
        ...params
      })
    ].join('');
    history.replaceState({ path }, '', path);
  }

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
