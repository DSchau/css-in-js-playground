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

export default function Footer() {
  return (
    <FooterContainer>
      <Text>
        Made with <HeartIcon /> by Dustin Schau
      </Text>
    </FooterContainer>
  );
}
