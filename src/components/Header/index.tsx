import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { darken } from 'polished';
import * as kebabCase from 'lodash.kebabcase';
import * as queryString from 'query-string';
import * as InvertedIcon from 'react-icons/lib/md/lightbulb-outline';
import * as DownIconElement from 'react-icons/lib/md/arrow-drop-down';

import * as snippets from '../../constants/snippets';
import { Theme, ThemeProps, SANS_SERIF } from '../../style/';

const HeaderContainer = glamorous.header<ThemeProps>(
  {
    flex: '0 0 auto',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0.5rem',
    zIndex: 2,
    transition: '250ms ease-in-out',
    position: 'relative'
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].base,
    borderBottom: `1px solid ${darken(0.05, theme[theme.primary].base)}`
  })
);

const SelectContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const Select = glamorous.select<ThemeProps>(
  {
    height: '32px',
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    appearance: 'none',
    fontSize: '1.3rem',
    paddingRight: '1.3rem'
  },
  SANS_SERIF,
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

const DownIcon = (withTheme as any)(glamorous(DownIconElement)<{
  size: number;
} & ThemeProps>({
  position: 'absolute',
  right: '0'
  }, ({ theme }) => ({
    color: theme[theme.primary].text
  })));

const LightBulb = (withTheme as any)(glamorous(InvertedIcon)<ThemeProps>(({ theme }) => ({
  color: theme[theme.primary].text
})));

const IconContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const Option = glamorous.option();

interface Props extends ThemeProps {
  defaultSnippet: string;
  primary: string;
  onSelect: Function;
  onColorSwitch?: Function;
}

interface State {
  selected: string;
}

class Header extends React.Component<Props, State> {
  state = {
    selected: ''
  };

  componentDidMount() {
    const { library = this.props.defaultSnippet } = queryString.parse(
      location.search
    );
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
  };

  handleColorSwitch = () => {
    if (this.props.onColorSwitch) {
      const { primary } = this.props;
      const theme = primary === 'dark' ? 'light' : 'dark';
      const path = this.getPath({
        ...queryString.parse(location.search) || {},
        dark: theme === 'dark'
      });
      history.replaceState({ path }, '', path);
      this.props.onColorSwitch(theme);
    }
  };

  pushState(params) {
    const path = this.getPath(params);
    history.pushState({ path }, '', path);
  }

  getPath(params) {
    return `${location.origin}${location.pathname}?${queryString.stringify(
      params
    )}`;
  }

  render() {
    const options = Object.keys(snippets);
    return (
      <HeaderContainer>
        <SelectContainer>
          <Select value={this.state.selected} onChange={this.handleChange}>
            {options.map(option =>
              <Option key={option} value={option}>
                {kebabCase(option)}
              </Option>
            )}
          </Select>
          <DownIcon size={20} />
        </SelectContainer>
        <IconContainer>
          <LightBulb
            size={24}
            onClick={this.handleColorSwitch}
          />
        </IconContainer>
      </HeaderContainer>
    );
  }
}

export default Header;
