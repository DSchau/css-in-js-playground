import * as React from 'react';
import styled, { injectGlobal, withTheme } from 'styled-components';
import { darken, lighten } from 'polished';

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
  border-color: ${props => darken(0.15, props.theme[props.theme.primary].base)};
  border-style: solid;
  border-width: 0;
  border-bottom-width: 1px;
  @media only screen and (min-width: 768px) {
    border-bottom-width: 0;
    border-right-width: 1px;
    height: auto;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
`;

interface Props {
  code: string;
  children?: any;
  className?: string;
  onUpdate(value: string): void;
  theme?: Theme;
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
    if (theme.primary !== this.props.theme.primary) {
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
    return (
      <Container>
        <TextArea innerRef={node => this.textArea = node} />
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
    font-family: "Operator Mono SSm A", "Operator Mono SSm B", monospace;
    font-size: 12px;
  }
`;

export default withTheme(Editor) as React.ComponentClass<any>;
