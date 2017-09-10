import * as React from 'react';
import glamorous from 'glamorous';
import { darken } from 'polished';

import * as CodeIcon from 'react-icons/lib/md/code';

import { SERIF, Theme, ThemeProps } from '../../style';

const FooterContainer = glamorous.footer<ThemeProps>(
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto',
    padding: '0.75rem 0.5rem',
    transition: '250ms ease-in-out'
  },
  ({ theme }) => ({
    backgroundColor: theme[theme.primary].base,
    borderTop: `1px solid ${darken(0.05, theme[theme.primary].base)}`
  })
);

const Text = glamorous.h1<ThemeProps>(
  {
    display: 'inline-block',
    fontSize: '0.8rem',
    color: '${props => props.theme[props.theme.primary].text}',
    margin: 0,
    padding: 0
  },
  SERIF,
  ({ theme }) => ({
    color: theme[theme.primary].text
  })
);

const Link = glamorous.a({
  color: 'inherit',
  textDecorationSkip: 'ink'
});

interface Props extends ThemeProps {}

function Footer(props: Props) {
  return (
    <FooterContainer>
      <Text>
        Made with <CodeIcon color="#E74C3C" size={22} /> by{' '}
        <Link href="https://dustinschau.com" target="_blank" rel="noopener">
          Dustin Schau
        </Link>
      </Text>
    </FooterContainer>
  );
}

export default Footer;
