import * as React from 'react';
import styled, { injectGlobal, ThemeProvider } from 'styled-components';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';

import theme from './style/theme';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface Props {}

interface State {
  code: string;
  theme: any;
}

class App extends React.Component<Props, State> {
  state = {
    code: ``,
    theme: theme
  };

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

export default App;
