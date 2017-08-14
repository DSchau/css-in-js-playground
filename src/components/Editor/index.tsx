import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import * as debounce from 'lodash.debounce';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
`;

export default class Editor extends React.Component<any, any> {
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

  componentWillReceiveProps({ code }) {
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
        <TextArea innerRef={node => this.textArea = node}/>
      </Container>
    );
  }
}

injectGlobal`
  .CodeMirror {
    width: 100%;
    max-width: 100%;
    height: 100%;
  }
`;
