// @flow
import React, { Component } from 'react';
import glamorous, { ThemeProvider } from 'glamorous';
import { css } from 'glamor';
import queryString from 'query-string';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';
import Timer from './components/Timer/';

import { THEME } from './style';
import { withOffline } from './utils/offline';

const Container = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative'
});

type Props = {
  updated: boolean
};

type State = {
  code: string,
  theme: any,
  updated: boolean
};

class App extends Component<Props, State> {
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
    this.setState(
      {
        updated: false
      },
      () => {
        location.reload();
      }
    );
  };

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
          <CodeProvider snippet={this.state.code} />
          <Footer />
          {this.props.updated &&
            <Timer duration={10000} onElapsed={this.handleTimerComplete} />}
        </Container>
      </ThemeProvider>
    );
  }
}

`
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
`
  .split(/\n{2}/)
  .forEach(rule => {
    css.insert(rule);
  });

export default withOffline(App);
