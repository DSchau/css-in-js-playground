import * as React from 'react';
import queryString from 'query-string';

import snippets from '../../snippets';

import { THEME } from '../../style';
import {
  capitalize,
  compress,
  decompress,
  getLibraryImportStatement,
  replaceHistory
} from '../../utils';

import { Module } from '../../interfaces';

interface Props {
  children(
    state: State & {
      actions: {
        handleActiveChange(...args): any;
        handleCodeUpdate(code: string, activeModule: string): any;
        handleColorSwitch(...args): any;
        handleFileAdd(...args): any;
        handleReset(): any;
        handleSelect(...args): any;
        handleTimerComplete(...args): any;
      };
      snippets: {
        [key: string]: Module;
      };
    }
  );
}

interface State {
  activeModule: string;
  code: Module;
  library: string;
  theme: any;
}

export class Provider extends React.Component<Props, State> {
  readonly DEFAULT_LIBRARY = 'styled-components';

  constructor(props: Props) {
    super(props);

    this.state = {
      activeModule: 'index',
      code: {} as Module,
      library: '',
      theme: THEME
    };
  }

  componentDidMount() {
    const {
      activeModule,
      theme: persistedTheme,
      library: persistedLibrary = this.DEFAULT_LIBRARY,
      ...rest
    } = queryString.parse(window.location.search);
    const library = persistedLibrary.toLowerCase();
    const code = snippets[library] || snippets[this.DEFAULT_LIBRARY];
    const persistedCode = Object.keys(rest).reduce((merged, name) => {
      const decompressed = decompress(rest[name]);
      if (code[name] !== decompressed && decompressed.length > 0) {
        merged[name] = decompressed;
      }
      return merged;
    }, {});

    const { theme } = this.state;
    this.setState({
      ...activeModule ? { activeModule } : {},
      code: {
        ...code,
        ...persistedCode
      },
      library,
      theme: {
        ...theme,
        primary: persistedTheme || 'dark'
      }
    });
  }

  // TODO: Revisit this algorithm and improve it
  // TODO: Remove items from query params that match local snippets
  handleSelect = ({ library, code }) => {
    const { theme } = queryString.parse(window.location.search);
    this.setState(
      {
        library,
        code
      },
      () => {
        replaceHistory(
          {
            activeModule: this.state.activeModule,
            library,
            theme
          },
          false
        );
      }
    );
  };

  handleCodeUpdate = (update, activeModule) => {
    replaceHistory({
      [activeModule]: compress(update)
    });
  };

  handleActiveChange = activeModule => {
    this.setState(
      {
        activeModule
      },
      () => {
        replaceHistory({
          activeModule
        });
      }
    );
  };

  handleFileAdd = file => {
    const fileContent = [
      `import React from 'react';`,
      getLibraryImportStatement(this.state.code),
      '',
      `// index.js -> import ${capitalize(file)} from './${file}';`,
      `export default () => <h1>Hello from ${file}.js</h1>`,
      ''
    ].join('\n');
    this.setState(
      {
        activeModule: file,
        code: {
          ...this.state.code,
          [file]: fileContent
        }
      },
      () => {
        replaceHistory({
          activeModule: file,
          [file]: compress(fileContent)
        });
      }
    );
  };

  handleColorSwitch = primary => {
    const { theme } = this.state;
    this.setState(
      {
        theme: {
          ...theme,
          primary
        }
      },
      () => {
        replaceHistory({
          theme: primary
        });
      }
    );
  };

  handleTimerComplete = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState(
      {
        activeModule: 'index',
        code: snippets[this.state.library]
      },
      () => {
        replaceHistory(
          {
            activeModule: this.state.activeModule,
            library: this.state.library,
            theme: this.state.theme.primary
          },
          false
        );
      }
    );
  };

  render() {
    return this.props.children({
      ...this.state,
      snippets,
      actions: {
        handleActiveChange: this.handleActiveChange,
        handleCodeUpdate: this.handleCodeUpdate,
        handleColorSwitch: this.handleColorSwitch,
        handleFileAdd: this.handleFileAdd,
        handleReset: this.handleReset,
        handleSelect: this.handleSelect,
        handleTimerComplete: this.handleTimerComplete
      }
    });
  }
}
