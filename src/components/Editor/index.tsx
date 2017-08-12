import * as React from 'react';
import * as T from 'prop-types';
import styled, { injectGlobal } from 'styled-components';

import * as CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: auto;
`;

const TextArea = styled.textarea`
`;

export default class Editor extends React.Component<any, any> {
  private editor: any;

  static propTypes = {
    onUpdate: T.func.isRequired
  };

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
      mode: 'javascript',
      lineNumbers: true,
      tabSize: 2,
      theme: 'dracula'
    });

    this.editor.on('change', this.onChange);
  }

  onChange = (codeMirrorEv) => {
    this.props.onUpdate(codeMirrorEv.getValue());
  }

  render() {
    return (
      <Container>
        <TextArea id="editor" onChange={ev => console.log(ev)}/>
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
