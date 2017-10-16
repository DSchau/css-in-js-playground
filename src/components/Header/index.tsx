import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { darken } from 'polished';
import kebabCase from 'lodash.kebabcase';
import queryString from 'query-string';
import InvertedIcon from 'react-icons/lib/go/light-bulb';
import DownIconElement from 'react-icons/lib/md/arrow-drop-down';

import { Accessible } from '../';

import Toolbar from './Toolbar';

import { Theme, ThemeProps, SANS_SERIF } from '../../style';
import { Module } from '../../interfaces';

const Container = glamorous.div<ThemeProps>({
  flex: '0 0 auto'
});

const HeaderContainer = glamorous.header<ThemeProps>(
  {
    height: 44,
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
    borderBottom: `1px solid ${darken(0.1, theme[theme.primary].base)}`
  })
);

const SelectContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative'
});

const Select = glamorous.select<ThemeProps>(
  {
    height: 32,
    backgroundColor: 'transparent',
    border: '2px solid transparent',
    boxShadow: 'none',
    appearance: 'none',
    fontSize: '1.3rem',
    paddingRight: '1.3rem',
    outline: 'none'
  },
  SANS_SERIF,
  ({ theme }) => ({
    color: theme[theme.primary].text,
    ':focus': {
      boxShadow: `0 0 5px ${theme[theme.primary].secondary}`
    }
  })
);

const DownIcon = (withTheme as any)(
  glamorous(DownIconElement)<
    {
      size: number;
    } & ThemeProps
  >(
    {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: `translateY(-50%)`
    },
    ({ theme }) => ({
      color: theme[theme.primary].text
    })
  )
);

const LightBulb = (withTheme as any)(
  glamorous(InvertedIcon)<ThemeProps>(
    {
      cursor: 'pointer'
    },
    ({ theme }) => ({
      color: theme[theme.primary].text
    })
  )
);

const IconContainer = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const Option = glamorous.option();

interface SelectData {
  library: string;
  code: Module;
  init?: boolean;
}

interface Props extends ThemeProps {
  activeModule: string;
  defaultLibrary: string;
  files: string[];
  primary: string;
  onActiveChange(active: string): any;
  onFileAdd(file: string): any;
  onSelect(data: SelectData): any;
  onColorSwitch?: Function;
  snippets: {
    [key: string]: Module;
  };
}

interface State {
  addingFile: boolean;
  selected: string;
}

export class Header extends React.Component<Props, State> {
  state = {
    addingFile: false,
    selected: ''
  };

  // TODO: cascade this down from provider
  componentDidMount() {
    const { library = this.props.defaultLibrary } = queryString.parse(
      location.search
    );
    const code = this.props.snippets[library];
    if (code) {
      this.setState({
        selected: library
      });
      this.props.onSelect({
        library,
        code,
        init: true
      });
    }
  }

  handleSelect = ev => {
    const { value: library } = ev.target;
    const code = this.props.snippets[library];
    if (code) {
      this.setState({
        addingFile: false,
        selected: library
      });
      this.props.onSelect({
        library,
        code
      });
    }
  };

  handleColorSwitch = () => {
    if (this.props.onColorSwitch) {
      const { primary } = this.props;
      const theme = primary === 'dark' ? 'light' : 'dark';
      this.props.onColorSwitch(theme);
    }
  };

  render() {
    const options = Object.keys(this.props.snippets);
    return (
      <Container>
        <HeaderContainer>
          <SelectContainer>
            <Select
              value={this.state.selected}
              onChange={this.handleSelect}
              aria-label="Select a library"
            >
              {options.map(option => (
                <Option key={option} value={option}>
                  {kebabCase(option)}
                </Option>
              ))}
            </Select>
            <DownIcon size={20} />
          </SelectContainer>
          <IconContainer>
            <Accessible
              aria-label="Toggle light/dark mode"
              onClick={this.handleColorSwitch}
            >
              {() => <LightBulb size={24} />}
            </Accessible>
          </IconContainer>
        </HeaderContainer>
        <Toolbar
          activeModule={this.props.activeModule}
          addingFile={this.state.addingFile}
          files={this.props.files}
          onActiveChange={this.props.onActiveChange}
          onFileAdd={this.props.onFileAdd}
        />
      </Container>
    );
  }
}
