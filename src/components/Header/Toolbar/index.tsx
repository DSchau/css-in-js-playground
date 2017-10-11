import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { darken, lighten } from 'polished';
import AddIcon from 'react-icons/lib/fa/plus-square';
import CancelIcon from 'react-icons/lib/fa/ban';
import kebab from 'lodash.kebabcase';

import { Theme, ThemeProps, SANS_SERIF } from '../../../style/';

import { FileInput } from './file-input';

const ToolbarContainer = glamorous.div<ThemeProps>(
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflowX: 'auto',
    maxWidth: '100%',
    width: '100%',
    paddingRight: 8,
    paddingLeft: 8,
    boxSizing: 'border-box',
    transition: '175ms ease-in-out'
  },
  ({ theme }) => ({
    backgroundColor: darken(0.05, theme[theme.primary].base)
  })
);

const Files = glamorous.ul<ThemeProps>({
  boxSizing: 'border-box',
  display: 'flex',
  overflowX: 'auto',
  margin: 0,
  padding: 0,
  width: '100%'
});

const File = glamorous.li<ThemeProps>({
  margin: 0,
  listStyleType: 'none'
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
    cursor: 'pointer',
    fontSize: 14,
    padding: 8,
    position: 'relative',
    outline: 'none',
    whiteSpace: 'nowrap'
  },
  SANS_SERIF,
  ({ active, theme }) => {
    const base = theme[theme.primary];
    return {
      color: active ? base.text : base.textSecondary
    };
  }
);

const Button = withTheme(({ children, theme }) =>
  children({
    color: theme[theme.primary].text,
    size: 20,
    theme
  })
);

const ActiveIndicator = glamorous.span<
  ThemeProps & {
    color?: string;
  }
>(
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    width: '100%',
    margin: '0 auto'
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].text
  })
);

interface Props {
  activeModule: string;
  files: string[];
  onActiveChange(active: string): any;
  onFileAdd(file: string): any;
}

interface State {
  addingFile: boolean;
}

class Toolbar extends React.Component<Props, State> {
  fileInput: HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      addingFile: false
    };
  }

  handleActiveClick = ({ target }) => {
    const active = target.getAttribute('name');
    this.props.onActiveChange(active);
  };

  handleAddFileClick = () => {
    this.setState(
      {
        addingFile: true
      },
      () => {
        this.fileInput.focus();
      }
    );
  };

  handleCancelAddFileClick = () => {
    this.setState({
      addingFile: false
    });
  };

  handleOnAdd = file => {
    this.props.onFileAdd(file);
    this.setState({
      addingFile: false
    });
  };

  render() {
    const { activeModule, files, onActiveChange } = this.props;
    const { addingFile } = this.state;
    return (
      <ToolbarContainer>
        {addingFile && (
          <Button>
            {({ color, size }) => (
              <CancelIcon
                color={color}
                onClick={this.handleCancelAddFileClick}
                size={size}
              />
            )}
          </Button>
        )}
        <Files>
          {files
            .reduce((acc, file) => {
              if (file === 'index') {
                return [file, ...acc];
              }
              return [...acc, file];
            }, [])
            .map((file, index) => {
              const isActive = file === activeModule;
              return (
                <File key={file}>
                  <FileButton
                    active={isActive}
                    name={file}
                    onClick={this.handleActiveClick}
                  >
                    {`${kebab(file)}.js`}
                    {isActive && <ActiveIndicator />}
                  </FileButton>
                </File>
              );
            })}
          {addingFile && (
            <File>
              <FileInput
                files={files}
                onAdd={this.handleOnAdd}
                innerRef={node => (this.fileInput = node)}
              />
            </File>
          )}
        </Files>
        <Button>
          {({ color, size }) => (
            <AddIcon
              color={color}
              onClick={this.handleAddFileClick}
              size={20}
            />
          )}
        </Button>
      </ToolbarContainer>
    );
  }
}

export default Toolbar;
