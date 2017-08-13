import * as React from 'react';
import styled from 'styled-components';

import Editor from './components/Editor/';
import Footer from './components/Footer/';
import Header from './components/Header/';
import Preview from './components/Preview/';
import SideBar from './components/SideBar/';

import { TABLET_UP } from './constants/breakpoints';

const Container = styled.main`
  display: flex;
  height: 100vh;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  @media only screen and (${TABLET_UP}) {
    flex-direction: row;
  }
`;

export default class App extends React.Component {
  state = {
    code: ``
  };

  handleEditorChange = code => {
    this.setState({
      code
    });
  };

  render() {
    return (
      <Container>
        <Header />
        <SideBar>
          <Footer />
        </SideBar>
        <Contents>
          <Editor onUpdate={this.handleEditorChange} />
          <Preview code={this.state.code} />
        </Contents>
      </Container>
    );
  }
}
