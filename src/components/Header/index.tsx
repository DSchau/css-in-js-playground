import * as React from 'react';
import styled, { withTheme, StyledComponentClass } from 'styled-components';
import { darken } from 'polished';
import * as kebabCase from 'lodash.kebabcase';
import * as queryString from 'query-string';
import * as InvertedIcon from 'react-icons/lib/md/lightbulb-outline';
import * as DownIconElement from 'react-icons/lib/md/arrow-drop-down';

import * as snippets from '../../constants/snippets';
import { Theme, SANS_SERIF } from '../../style/';

const HeaderContainer = styled.header`
  flex: 0 0 auto;
  height: 44px;
  background-color: ${props => props.theme[props.theme.primary].base};
  border-bottom: 1px solid ${props => darken(0.05, props.theme[props.theme.primary].base)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  z-index: 2;
  transition: 250ms ease-in-out;
  position: relative;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Select = styled.select`
  height: 32px;
  background-color: transparent;
  color: ${props => props.theme[props.theme.primary].text};
  border: none;
  box-shadow: none;
  appearance: none;
  font-size: 1.3rem;
  padding-right: 1.3rem;
  ${SANS_SERIF};
`;

const DownIcon: StyledComponentClass<any, any> = styled(DownIconElement)`
  position: absolute;
  right: 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Option = styled.option``;

interface Props {
  defaultSnippet: string;
  primary: string;
  onSelect: Function;
  onColorSwitch?: Function;
  theme: Theme;
}

interface State {
  selected: string;
}

class Header extends React.Component<Props, State> {
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

  handleColorSwitch = () => {
    if (this.props.onColorSwitch) {
      const { primary } = this.props;
      const theme = primary === 'dark' ? 'light' : 'dark';
      const path = this.getPath({
        ...(queryString.parse(location.search) || {}),
        dark: theme === 'dark'
      });
      history.replaceState({ path }, '', path);
      this.props.onColorSwitch(theme);
    }
  };

  pushState(params) {
    if (history.pushState) {
      const path = this.getPath(params);
      history.pushState({ path }, '', path);
    }
  }

  getPath(params) {
    return `${location.origin}${location.pathname}?${queryString.stringify(params)}`;
  }

  render() {
    const options = Object.keys(snippets);
    const textColor = this.props.theme[this.props.theme.primary].text;
    return (
      <HeaderContainer>
        <SelectContainer>
          <Select value={this.state.selected} onChange={this.handleChange}>
            {
              options
                .map(option => <Option key={option} value={option}>{kebabCase(option)}</Option>)
            }
          </Select>
          <DownIcon color={textColor} size={20} />
        </SelectContainer>
        <IconContainer>
          <InvertedIcon color={textColor} size={24} onClick={this.handleColorSwitch} />
        </IconContainer>
      </HeaderContainer>
    );
  }
}

export default withTheme(Header);
