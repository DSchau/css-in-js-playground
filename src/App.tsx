import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

class App extends React.Component {
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
