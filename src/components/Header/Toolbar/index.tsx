import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { darken, lighten } from 'polished';
import AddIcon from 'react-icons/lib/fa/plus-square';
import CancelIcon from 'react-icons/lib/fa/ban';
// import DeleteIcon from 'react-icons/lib/fa/times-circle';
import kebab from 'lodash.kebabcase';

import { Theme, ThemeProps, SANS_SERIF } from '../../../style/';

import { FileInput } from './file-input';
import { Accessible } from '../../';

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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
    border: '2px solid transparent',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: 14,
    padding: 8,
    outline: 'none',
    whiteSpace: 'nowrap'
  },
  SANS_SERIF,
  ({ active, theme }) => {
    const base = theme[theme.primary];
    const inverted = theme[theme.primary === 'dark' ? 'light' : 'dark'];
    return {
      color: base.textSecondary,
      ':focus': {
        color: base.secondary
      },
      ...(active && {
        borderBottomColor: base.text
      })
    };
  }
);

const Icon = withTheme(({ children, theme }) =>
  children({
    color: theme[theme.primary].text,
    size: 20,
    theme
  })
);

interface Props {
  activeModule: string;
  addingFile: boolean;
  files: string[];
  onActiveChange(active: string): any;
  onFileAdd(file: string): any;
}

interface State {
  addingFile: boolean;
  previousActiveModule: string;
}

class Toolbar extends React.Component<Props, State> {
  fileInput: HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      addingFile: false,
      previousActiveModule: ''
    };
  }

  componentWillReceiveProps({ addingFile }: Props) {
    if (addingFile !== this.state.addingFile) {
      this.setState({
        addingFile
      });
    }
  }

  handleActiveClick = ({ target }) => {
    const active = target.getAttribute('name');
    this.props.onActiveChange(active);
  };

  handleAddFileClick = () => {
    this.props.onActiveChange('');
    this.setState(
      {
        addingFile: true,
        previousActiveModule: this.props.activeModule
      },
      () => {
        this.fileInput.focus();
      }
    );
  };

  handleCancel = () => {
    this.props.onActiveChange(this.state.previousActiveModule);
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
          <Accessible onClick={this.handleCancel}>
            {() => (
              <Icon>
                {({ color, size }) => <CancelIcon color={color} size={size} />}
              </Icon>
            )}
          </Accessible>
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
                  </FileButton>
                </File>
              );
            })}
          {addingFile && (
            <File>
              <FileInput
                files={files}
                onAdd={this.handleOnAdd}
                onCancel={this.handleCancel}
                innerRef={node => (this.fileInput = node)}
              />
            </File>
          )}
        </Files>
        <Accessible onClick={this.handleAddFileClick}>
          {() => (
            <Icon>
              {({ color, size }) => <AddIcon color={color} size={20} />}
            </Icon>
          )}
        </Accessible>
      </ToolbarContainer>
    );
  }
}

export default Toolbar;
