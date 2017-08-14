import * as React from 'react';
import styled from 'styled-components';
import * as queryString from 'query-string';
import * as kebabCase from 'lodash.kebabcase';

import * as snippets from '../../constants/snippets';

const Container = styled.div`
  display: none;
  flex-direction: column;
  width: 320px;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  background-color: black;
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

const Children = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
`;

const Select = styled.select`
  height: 32px;
  background-color: transparent;
  color: white;
  border: none;
  box-shadow: none;
  appearance: none;
  font-size: 1.3rem;
  text-align: center;
  text-align-last: center;
  .wf-active & {
    font-family: 'Montserrat', sans-serif;
  }
`;

const Option = styled.option`
`;

export default class SideBar extends React.Component<any, any> {
  state = {
    selected: ''
  };

  componentDidMount() {
    const { library = this.props.defaultSnippet } = queryString.parse(location.search);
    const snippet = snippets[library];
    if (snippet) {
      this.setState({
        selected: library
      });
      this.props.onSelect(snippet);
    }
  }

  handleChange = ev => {
    const { value: library } = ev.target;
    const snippet = snippets[library];
    if (snippet) {
      this.setState({
        selected: library
      });
      this.pushState({
        library
      });
      this.props.onSelect(snippet);
    }
  }

  pushState(params) { 
    if (history.pushState) {
      const path = `${location.origin}${location.pathname}?${queryString.stringify(params)}`;
      history.pushState({ path }, '', path);
    }
  }

  render() {
    const options = Object.keys(snippets);
    return (
      <Container>
        <Select value={this.state.selected} onChange={this.handleChange}>
          {
            options
              .map(option => <Option key={option} value={option}>{kebabCase(option)}</Option>)
          }
        </Select>
        <Children>{this.props.children}</Children>
      </Container>
    );
  }
}
