import * as React from 'react';
import glamorous from 'glamorous';
import { lighten } from 'polished';

import { SANS_SERIF, ThemeProps } from '../../../style';

const Input = glamorous
  .input<
    ThemeProps & {
      valid: boolean;
    }
  >(
    {
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
      width: 100
    },
    SANS_SERIF,
    ({ theme, valid }) => ({
      backgroundColor: !valid
        ? lighten(0.3, 'red')
        : theme[theme.primary === 'dark' ? 'light' : 'dark'].base,
      borderColor: !valid ? 'red' : null,
      color: theme[theme.primary === 'dark' ? 'light' : 'dark'].text
    })
  )
  .withProps({ type: 'text' });

interface Props {
  files: string[];
  onAdd(file: string): any;
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

  static readonly ENTER_KEY_CODE = 13;

  form: HTMLFormElement;

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
          onChange={this.handleInputFileNameChange}
          valid={valid || !touched}
        />
      </form>
    );
  }
}
