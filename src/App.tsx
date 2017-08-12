import * as React from 'react';
import styled from 'styled-components';

import Editor from './components/Editor/';
import Preview from './components/Preview/';
import SideBar from './components/SideBar/';

import { TABLET_UP } from './constants/breakpoints';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media only screen and (${TABLET_UP}) {
    flex-direction: row;
  }
`;

export default class App extends React.Component {
  state = {
    value: ``
  };

  handleEditorChange = value => {
    this.setState({
      value
    });
  };

  render() {
    return (
      <Container>
        <SideBar />
        <Editor onUpdate={this.handleEditorChange} />
        <Preview />
      </Container>
    );
  }
}
