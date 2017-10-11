import * as React from 'react';
import queryString from 'query-string';

import snippets from '../../snippets';

import { THEME } from '../../style';
import { capitalize, compress, decompress, replaceHistory } from '../../utils';

import { Module } from '../../interfaces';

interface Props {
  children(
    state: State & {
      actions: {
        handleActiveChange(...args): any;
        handleCodeUpdate(code: string, activeModule: string): any;
        handleColorSwitch(...args): any;
        handleFileAdd(...args): any;
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
  constructor(props: Props) {
    super(props);

    this.state = {
      activeModule: 'index',
      code: {} as Module,
      library: '',
      theme: THEME
    };
  }

  componentWillMount() {
    const { activeModule, theme: persistedTheme } = queryString.parse(
      location.search
    );
    const theme = this.state.theme;
    this.setState({
      ...activeModule ? { activeModule } : {},
      theme: {
        ...theme,
        primary: persistedTheme || 'dark'
      }
    });
  }

  // TODO: Revisit this algorithm and improve it
  // TODO: Remove items from query params that match local snippets
  handleSelect = ({ library, code, init }) => {
    const {
      activeModule,
      theme,
      library: definedLibrary,
      ...rest
    } = queryString.parse(location.search);
    const persistedCode = init
      ? Object.keys(rest).reduce((merged, name) => {
          const decompressed = decompress(rest[name]);
          if (code[name] !== decompressed && decompressed.length > 0) {
            merged[name] = decompressed;
          }
          return merged;
        }, {})
      : {};
    const activeModuleFound = code[activeModule] || persistedCode[activeModule];
    this.setState(
      {
        ...((activeModuleFound && {}) || {
          activeModule: 'index'
        }),
        code: {
          ...code,
          ...persistedCode
        },
        library
      },
      () => {
        replaceHistory(
          {
            activeModule: this.state.activeModule,
            library,
            theme,
            ...init ? rest : {}
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
      '',
      `// the import (in index.js) will be import ${capitalize(
        file
      )} from './${file}';`,
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
    location.reload();
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
        handleSelect: this.handleSelect,
        handleTimerComplete: this.handleTimerComplete
      }
    });
  }
}
