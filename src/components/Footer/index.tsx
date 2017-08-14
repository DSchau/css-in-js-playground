import * as React from 'react';
import styled from 'styled-components';

import * as HeartIcon from 'react-icons/lib/fa/heart';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h1`
  display: inline-block;
  font-size: 0.8rem;
  color: white;
  margin: 0;
  padding: 0;
`;

const Link = styled.a`
  color: inherit;
  text-decoration-skip: ink;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Text>
        Made with <HeartIcon color="red" /> by <Link href="https://dustinschau.com" target="_blank" rel="noopener">Dustin Schau</Link>
      </Text>
    </FooterContainer>
  );
}
