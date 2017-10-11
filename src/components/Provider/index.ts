import * as React from 'react';
import queryString from 'query-string';

import snippets from '../../snippets';

import { THEME } from '../../style';
import { replaceHistory } from '../../utils/history';
import { capitalize } from '../../utils/string';

import { Module } from '../../interfaces';

interface Props {
  children(
    state: State & {
      actions: {
        handleActiveChange(...args): any;
        handleColorSwitch(...args): any;
        handleFileAdd(...args): any;
        handleSelect(...args): any;
        handleTimerComplete(...args): any;
      };
      snippets: Module;
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

  handleSelect = ({ library, code }) => {
    this.setState({
      code,
      library
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
    const fileContent = `import React from 'react';\n\nexport default () => null;\n`;
    this.setState({
      code: {
        ...this.state.code,
        [capitalize(file)]: fileContent
      }
    });
  };

  handleColorSwitch = primary => {
    const { theme } = this.state;
    this.setState({
      theme: {
        ...theme,
        primary
      }
    });
  };

  handleTimerComplete = () => {
    location.reload();
  };

  render() {
    return this.props.children({
      ...this.state,
      snippets: snippets as Module,
      actions: {
        handleActiveChange: this.handleActiveChange,
        handleColorSwitch: this.handleColorSwitch,
        handleFileAdd: this.handleFileAdd,
        handleSelect: this.handleSelect,
        handleTimerComplete: this.handleTimerComplete
      }
    });
  }
}
