import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import * as CodeIcon from 'react-icons/lib/md/code';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  background-color: ${props => props.theme[props.theme.primary].base};
  border-top: 1px solid ${props => darken(0.05, props.theme[props.theme.primary].base)};
  padding: 0.75rem 0.5rem;
  transition: 250ms ease-in-out;
`;

const Text = styled.h1`
  display: inline-block;
  font-size: 0.8rem;
  color: ${props => props.theme[props.theme.primary].text};
  margin: 0;
  padding: 0;
  font-family: serif;
  .wf-active & {
    font-family: 'Bitter', serif;
  }
`;

const Link = styled.a`
  color: inherit;
  text-decoration-skip: ink;
`;

interface Props {

}

function Footer(props: Props) {
  return (
    <FooterContainer>
      <Text>
        Made with <CodeIcon color="#E74C3C" size={22} /> by <Link href="https://dustinschau.com" target="_blank" rel="noopener">Dustin Schau</Link>
      </Text>
    </FooterContainer>
  );
}

export default Footer;
