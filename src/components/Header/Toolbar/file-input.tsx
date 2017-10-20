import * as React from 'react';
import glamorous from 'glamorous';
import { lighten } from 'polished';

import { FADE_IN, SANS_SERIF, ThemeProps } from '../../../style';

const Input = glamorous
  .input<
    ThemeProps & {
      valid: boolean;
    }
  >(
    {
      animation: `${FADE_IN} 250ms ease-in`,
      boxSizing: 'border-box',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderRadius: 4,
      fontSize: 14,
      marginLeft: 6,
      paddingTop: 6,
      paddingRight: 4,
      paddingBottom: 6,
      paddingLeft: 4,
      outline: 'none',
      width: 100
    },
    SANS_SERIF,
    ({ theme, valid }) => ({
      backgroundColor: !valid
        ? lighten(0.3, 'red')
        : theme[theme.primary === 'dark' ? 'light' : 'dark'].base,
      borderColor: valid ? null : 'red',
      color: theme[theme.primary === 'dark' ? 'light' : 'dark'].text,
      ':focus': {
        borderColor: valid ? theme[theme.primary].accent : lighten(0.2, 'red'),
        boxShadow: `0 0 5px ${valid
          ? theme[theme.primary].accent
          : theme[theme.primary].danger}`
      }
    })
  )
  .withProps({ type: 'text' });

interface Props {
  files: string[];
  onAdd(file: string): any;
  onCancel(): any;
  innerRef?(node): any;
}

interface State {
  fileName: string;
  touched: boolean;
  valid: boolean;
}

export class FileInput extends React.Component<Props, State> {
  static defaultProps = {
    innerRef: () => {}
  };

  static readonly ESCAPE_KEY_CODE = 27;

  form: HTMLFormElement;
  input: HTMLInputElement;

  state = {
    fileName: '',
    touched: false,
    valid: false
  };

  handleInputFileNameChange = ({ target }) => {
    const { fileName: oldFileName } = this.state;
    const { value: fileName } = target;
    this.setState({
      fileName,
      touched: true,
      valid: fileName.length > 0 && !this.fileExists(this.props.files, fileName)
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();

    if (this.state.valid) {
      this.props.onAdd(this.normalize(this.state.fileName));
    }
  };

  handleKeydown = ({ keyCode, which }) => {
    const code = which || keyCode;
    if (code === FileInput.ESCAPE_KEY_CODE) {
      this.props.onCancel();
    }
  };

  fileExists(files, file) {
    const basename = name => name.split('.')[0].toLowerCase();
    return files
      .map(existingFile => basename(existingFile))
      .some(existingFile => existingFile === basename(file));
  }

  normalize(file) {
    return file.split('.')[0];
  }

  render() {
    const { innerRef } = this.props;
    const { touched, valid } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          innerRef={innerRef}
          name="fileName"
          placeholder="File name"
          aria-label="File name"
          aria-required={true}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          onChange={this.handleInputFileNameChange}
          onKeyDown={this.handleKeydown}
          valid={valid || !touched}
        />
      </form>
    );
  }
}
