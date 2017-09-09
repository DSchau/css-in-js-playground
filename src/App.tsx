import * as React from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import queryString from 'query-string';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';
import Timer from './components/Timer/';

import { THEME } from './style';

import { withOffline } from './utils/offline';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

interface Props {
  updated: boolean;
}

interface State {
  code: string;
  theme: any;
  updated: boolean;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      code: ``,
      theme: THEME,
      updated: props.updated
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

  handleSelect = code => {
    this.setState({
      code
    });
  }

  handleColorSwitch = primary => {
    const { theme } = this.state;
    this.setState({
      theme: {
        ...theme,
        primary
      }
    });
  }

  handleTimerComplete = () => {
    this.setState({
      updated: false
    }, () => {
      location.reload();
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Container>
          <Header
            defaultSnippet="StyledComponents"
            onSelect={this.handleSelect}
            primary={this.state.theme.primary}
            onColorSwitch={this.handleColorSwitch}
          />
          <CodeProvider code={this.state.code} />
          <Footer />
          {this.props.updated && <Timer duration={5000} onElapsed={this.handleTimerComplete} />}
        </Container>
      </ThemeProvider>
    );
  }
}

injectGlobal`
  html, body {
    font-family: sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    overflow: hidden;
  }

  .wf-active {
    font-family: 'Bitter', sans-serif;
  }
`;

export default withOffline(App);
