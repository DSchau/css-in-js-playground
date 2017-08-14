import * as React from 'react';
import styled from 'styled-components';
import * as kebabCase from 'lodash.kebabcase';
import * as queryString from 'query-string';

import * as snippets from '../../constants/snippets';

const HeaderContainer = styled.header`
  flex: 0 0 auto;
  height: 44px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.5rem;
`;

const Select = styled.select`
  height: 32px;
  background-color: transparent;
  color: white;
  border: none;
  box-shadow: none;
  appearance: none;
  font-size: 1.3rem;
  .wf-active & {
    font-family: 'Montserrat', sans-serif;
  }
`;

const Option = styled.option`
`;

class Header extends React.Component<HeaderProps, HeaderState> {
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
      <HeaderContainer>
        <Select value={this.state.selected} onChange={this.handleChange}>
          {
            options
              .map(option => <Option key={option} value={option}>{kebabCase(option)}</Option>)
          }
        </Select>
      </HeaderContainer>
    );
  }
}

interface HeaderProps {
  defaultSnippet: string;
  onSelect: Function;
}

interface HeaderState {
  selected: string;
}

export default Header;
