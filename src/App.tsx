import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';
import Router, { History } from './Router';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

interface Props {

}

interface State {
  code: string;
}

class App extends React.Component<Props, State> {
  state = {
    code: ``
  };

  handleSelect = code => {
    this.setState({
      code
    });
  }

  render() {
    return (
      <Container>
        <Header defaultSnippet="StyledComponents" onSelect={this.handleSelect} />
        <CodeProvider code={this.state.code} />
        <Footer />
      </Container>
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
