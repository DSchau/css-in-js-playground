import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { darken, lighten } from 'polished';
import AddIcon from 'react-icons/lib/md/add';
import kebab from 'lodash.kebabcase';

import { Theme, ThemeProps, SANS_SERIF } from '../../../style/';

const ToolbarContainer = glamorous.div<ThemeProps>(
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflowX: 'auto',
    maxWidth: '100%',
    width: '100%',
    paddingRight: 4,
    paddingLeft: 4,
    boxSizing: 'border-box'
  },
  ({ theme }) => ({
    backgroundColor: darken(0.05, theme[theme.primary].base),
    borderBottom: `1px solid ${darken(0.1, theme[theme.primary].base)}`
  })
);

const Files = glamorous.ul<ThemeProps>({
  display: 'flex',
  overflowX: 'auto',
  margin: 0,
  padding: 0,
  width: '100%'
});

const File = glamorous.li<ThemeProps>({
  margin: 0,
  listStyleType: 'none',
  position: 'relative'
});

const FileButton = glamorous.button<
  ThemeProps & {
    active: boolean;
    name: string;
  }
>(
  {
    backgroundColor: 'transparent',
    border: 'none',
    boxSizing: 'border-box',
    fontSize: 14,
    padding: 8,
    outline: 'none'
  },
  SANS_SERIF,
  ({ active, theme }) => {
    const fn = theme.primary === 'dark' ? darken : lighten;
    return {
      color: fn(active ? 0 : 0.3, theme[theme.primary].text)
    };
  }
);

const AddFileButton = glamorous.button<ThemeProps>(
  {
    border: 'none',
    boxSizing: 'border-box',
    margin: 0,
    marginLeft: 12,
    paddingRight: 12,
    paddingLeft: 12
  },
  ({ theme }) => ({
    backgroundColor: lighten(0.1, theme[theme.primary].base),
    color: theme[theme.primary].text
  })
);

const ActiveIndicator = glamorous.span<ThemeProps>({
  position: 'absolute',
  bottom: 2,
  left: 0,
  width: '100%',
  color: 'white',
  fontSize: 16,
  lineHeight: 0,
  textAlign: 'center'
});

interface Props {
  activeModule: string;
  files: string[];
  onActiveChange(active: string): void;
}

interface State {
  active: string;
}

class Toolbar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      active: props.activeModule
    };
  }

  handleActiveClick = ({ target }) => {
    const active = target.getAttribute('name');
    this.setState({
      active: active
    });
    this.props.onActiveChange(active);
  };

  render() {
    const { files, onActiveChange } = this.props;
    const { active } = this.state;
    return (
      <ToolbarContainer>
        <Files>
          {files
            .sort((a, b) => {
              if (a === 'index' || b === 'index') {
                return 1;
              }
              return 0;
            })
            .map((file, index) => {
              const isActive = file === active;
              return (
                <File key={file}>
                  <FileButton
                    active={isActive}
                    name={file}
                    onClick={this.handleActiveClick}
                  >{`${kebab(file)}.js`}</FileButton>
                  {isActive && <ActiveIndicator>&middot;</ActiveIndicator>}
                </File>
              );
            })}
        </Files>
        <AddFileButton>
          <AddIcon />
        </AddFileButton>
      </ToolbarContainer>
    );
  }
}

export default Toolbar;
