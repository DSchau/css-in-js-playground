import * as React from 'react';
import glamorous, { A, withTheme } from 'glamorous';
import { darken } from 'polished';

import Code from 'react-icons/lib/md/code';
import Github from 'react-icons/lib/go/mark-github';

import { files as FILE_LIST } from '../../snippets';
import { Toolbar } from './Toolbar';

import { SERIF, Theme, ThemeProps } from '../../style';
import { Module } from '../../interfaces';

const Container = glamorous.div<ThemeProps>({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 auto',
  width: '100%'
});

const FooterContainer = glamorous.footer<ThemeProps>(
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 0.5rem',
    transition: '250ms ease-in-out',
    width: '100%'
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].base,
    borderTop: `1px solid ${theme[theme.primary].baseSecondary}`
  })
);

const Text = glamorous.h1<ThemeProps>(
  {
    display: 'inline-block',
    fontSize: '0.8rem',
    margin: 0,
    padding: 0,
    width: '100%',
    textAlign: 'center'
  },
  SERIF,
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

const Link = glamorous.a<{
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}>(
  {
    color: 'inherit',
    textDecorationSkip: 'ink'
  },
  ({
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0
  }) => ({
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft
  })
);

const StyledGithub = glamorous(Github)<
  ThemeProps & {
    size?: number;
  }
>(({ theme }) => ({
  color: theme[theme.primary].text
}));

const Icon = withTheme(({ children, theme }) => {
  return children({
    theme
  });
});

const CodeIcon = () => (
  <Icon>
    {({ theme }) => <Code color={theme[theme.primary].accent} size={22} />}
  </Icon>
);

interface Props extends ThemeProps {
  code: Module;
  onReset(): any;
}

interface State {
  hasLocalChanges: boolean;
}

export class Footer extends React.Component<Props, State> {
  state = {
    hasLocalChanges: false
  };

  componentWillReceiveProps({ code }) {
    const changes = Object.keys(code).reduce((nonStandardFiles, name) => {
      if (FILE_LIST.indexOf(name.toLowerCase()) === -1) {
        nonStandardFiles.push(name);
      }
      return nonStandardFiles;
    }, []);
    const hasLocalChanges = changes.length > 0;
    if (this.state.hasLocalChanges !== hasLocalChanges) {
      this.setState({
        hasLocalChanges
      });
    }
  }

  render() {
    const { hasLocalChanges } = this.state;
    return (
      <Container>
        {hasLocalChanges && <Toolbar onReset={this.props.onReset} />}
        <FooterContainer>
          <Text>
            Made with <CodeIcon /> by{' '}
            <Link href="https://dustinschau.com" target="_blank" rel="noopener">
              Dustin Schau
            </Link>
          </Text>
          <Link
            href="https://github.com/dschau/css-in-js-playground"
            target="_blank"
            rel="noopener"
            paddingLeft={8}
            paddingRight={8}
          >
            <StyledGithub size={20} />
          </Link>
        </FooterContainer>
      </Container>
    );
  }
}
