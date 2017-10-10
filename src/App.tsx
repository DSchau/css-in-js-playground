import * as React from 'react';
import glamorous, { ThemeProvider } from 'glamorous';
import { css } from 'glamor';
import queryString from 'query-string';

import { CodeProvider, Footer, Header, Timer } from './components';
import * as snippets from './snippets';

import { GLOBAL, THEME } from './style';
import { OfflineContainer } from './utils/offline';

const Container = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative'
});

interface Props {}

interface State {
  code: string;
  library: string;
  theme: any;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: '',
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
                defaultSnippet="StyledComponents"
                onSelect={this.handleSelect}
                primary={this.state.theme.primary}
                onColorSwitch={this.handleColorSwitch}
                files={Object.keys(this.state.code)}
                modules={snippets}
              />
              <CodeProvider
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
