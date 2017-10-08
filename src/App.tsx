import * as React from 'react';
import glamorous, { ThemeProvider } from 'glamorous';
import { css } from 'glamor';
import queryString from 'query-string';

import { CodeProvider, Footer, Header, Timer } from './components';

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
    const params = queryString.parse(location.search);
    const theme = this.state.theme;
    this.setState({
      theme: {
        ...theme,
        primary: params.dark === 'false' ? 'light' : 'dark'
      }
    });
  }

  handleSelect = ({ library, snippet: code }) => {
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
              />
              <CodeProvider
                library={this.state.library}
                snippet={this.state.code}
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
