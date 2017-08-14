import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';

import CodeProvider from './components/CodeProvider/';
import Footer from './components/Footer/';
import Header from './components/Header/';
import SideBar from './components/SideBar/';

const Container = styled.main`
  display: flex;
  height: 100vh;
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
        <Header />
        <SideBar defaultSnippet="StyledComponents" onSelect={this.handleSelect}>
          <Footer />
        </SideBar>
        <CodeProvider code={this.state.code} />
      </Container>
    );
  }
}

injectGlobal`
  html, body {
    font-family: sans-serif;
  }

  .wf-active {
    font-family: 'Bitter', sans-serif;
  }
`;

export default App;
