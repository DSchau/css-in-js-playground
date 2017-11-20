import * as React from 'react';
import glamorous, { withTheme } from 'glamorous';
import { css } from 'glamor';
import { darken, lighten } from 'polished';

import * as CodeMirror from 'codemirror';
import { EditorConfiguration } from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/sublime';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import debounce from 'lodash.debounce';

import { Module } from '../../interfaces';
import { Theme, ThemeProps, Z_INDEX_PREVIEW_CONTENT } from '../../style';
import { LARGE_UP } from '../../constants';

const Container = glamorous.div<ThemeProps>(
  {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    WebkitOverflowScrolling: 'touch',
    zIndex: Z_INDEX_PREVIEW_CONTENT,
    boxSizing: 'border-box',
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: 1,
    [`@media only screen and (${LARGE_UP})`]: {
      borderBottomWidth: 0,
      borderRightWidth: 1,
      height: 'auto'
    }
  },
  ({ theme }) => ({
    borderColor: darken(0.15, theme[theme.primary].base)
  })
);

const TextArea = glamorous.textarea({
  width: '100%',
  border: 'none'
});

interface Props extends ThemeProps {
  activeModule: string;
  code: Module;
  children?: any;
  className?: string;
  onUpdate(code: string, active: string): void;
}

interface State {
  loaded: boolean;
}

export class CodeEditorBase extends React.Component<Props, State> {
  private editor: any;
  private textArea: HTMLTextAreaElement;
  private handleChange: Function;

  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.handleChange = debounce(this.onChange, 250);
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea(this.textArea, {
      autofocus: true,
      autoCloseBrackets: true,
      mode: 'text/jsx',
      keyMap: 'sublime',
      lineNumbers: true,
      matchBrackets: true,
      tabSize: 2,
      theme: this.props.theme.primary === 'dark' ? 'dracula' : 'default'
    } as EditorConfiguration);

    this.editor.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.editor.off('change', this.handleChange);
    this.editor.toTextArea();
  }

  componentWillReceiveProps(nextProps) {
    const { activeModule, code: codeModule, theme } = nextProps;
    if (theme.primary !== this.props.theme.primary) {
      this.editor.setOption(
        'theme',
        theme.primary === 'dark' ? 'dracula' : 'default'
      );
    }
    const code = codeModule[activeModule];
    if (code && code !== this.editor.getValue()) {
      this.editor.setValue(code);
    }
  }

  onChange = codeMirrorEv => {
    this.props.onUpdate(codeMirrorEv.getValue(), this.props.activeModule);
  };

  render() {
    return (
      <Container>
        <TextArea innerRef={node => (this.textArea = node)} />
      </Container>
    );
  }
}

css.insert(`
div.CodeMirror {
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
  
  /* iOS 11.2+ */
  padding-left: constant(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  
  /* iOS 11.2+ */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
`);

export const CodeEditor = withTheme(CodeEditorBase) as React.ComponentClass<
  any
>;
