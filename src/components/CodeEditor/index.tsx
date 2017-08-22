import * as React from 'react';
import styled, { injectGlobal, withTheme } from 'styled-components';
import { darken } from 'polished';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import * as debounce from 'lodash.debounce';

import { Theme } from '../../style/theme';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  z-index: 2;
  box-sizing: border-box;
  border-color: ${props => darken(0.1, props.theme[props.theme.primary].base)};
  border-style: solid;
  border-width: 0;
  border-bottom-width: 2px;
  @media only screen and (min-width: 768px) {
    border-bottom-width: 0;
    border-right-width: 2px;
    height: auto;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
`;

const ErrorContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  z-index: 3;
`;

const Error = styled.pre`
  white-space: pre-wrap;
  color: red;
`;

interface Props {
  code: string;
  error: Error;
  onUpdate(value: string): void;
  theme: Theme;
}

interface State {

}

class Editor extends React.Component<Props, State> {
  private editor: any;
  private textArea: HTMLTextAreaElement;
  private handleChange: Function;

  constructor(props) {
    super(props);

    this.handleChange = debounce(this.onChange, 250);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textArea, {
      autofocus: true,
      mode: 'text/jsx',
      keyMap: 'sublime',
      lineNumbers: true,
      tabSize: 2,
      theme: 'dracula'
    });

    this.editor.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.editor.off('change', this.handleChange);
    this.editor.toTextArea();
  }

  componentWillReceiveProps(nextProps) {
    const { code, theme } = nextProps;
    if (theme.primary !== this.props.primary) {
      this.editor.setOption('theme', theme.primary === 'dark' ? 'dracula' : 'default');
    }
    if (code !== this.editor.getValue()) {
      this.editor.setValue(code);
    }
  }

  onChange = (codeMirrorEv) => {
    this.props.onUpdate(codeMirrorEv.getValue());
  }

  render() {
    const DisplayError = ({ error }) => {
      return <ErrorContainer><Error>{error.message}</Error></ErrorContainer>;
    };

    return (
      <Container>
        <TextArea innerRef={node => this.textArea = node} />
        {this.props.error && <DisplayError error={this.props.error} />}
      </Container>
    );
  }
}

injectGlobal`
  .CodeMirror {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-family: "Operator Mono SSm A","Operator Mono SSm B", monospace;
    font-size: 12px;
  }
`;

export default withTheme(Editor);
