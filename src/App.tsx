import * as React from 'react';
import glamorous, { ThemeProvider } from 'glamorous';
import { css } from 'glamor';
import queryString from 'query-string';

import { CodeProvider, Footer, Header, Timer } from './components';
import snippets from './snippets';

import { GLOBAL, THEME } from './style';
import { OfflineContainer } from './utils/offline';
import { capitalize } from './utils/string';

import { Module } from './interfaces';

const Container = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative'
});

interface Props {}

interface State {
  activeModule: string;
  code: Module;
  library: string;
  theme: any;
}

class App extends React.Component<Props, State> {
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
    const { theme: persistedTheme } = queryString.parse(location.search);
    const theme = this.state.theme;
    this.setState({
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

  handleActiveChange = active => {
    this.setState({
      activeModule: active
    });
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
    return (
      <OfflineContainer>
        {updated => (
          <ThemeProvider theme={this.state.theme}>
            <Container>
              <Header
                defaultLibrary="styled-components"
                onSelect={this.handleSelect}
                primary={this.state.theme.primary}
                onActiveChange={this.handleActiveChange}
                onColorSwitch={this.handleColorSwitch}
                onFileAdd={this.handleFileAdd}
                files={Object.keys(this.state.code)}
                snippets={snippets}
              />
              <CodeProvider
                activeModule={this.state.activeModule}
                library={this.state.library}
                code={this.state.code}
              />
              <Footer />
              {updated && (
                <Timer duration={10000} onElapsed={this.handleTimerComplete} />
              )}
            </Container>
          </ThemeProvider>
        )}
      </OfflineContainer>
    );
  }
}

GLOBAL.split(/\n{2}/).forEach(rule => {
  css.insert(rule);
});

export default App;
