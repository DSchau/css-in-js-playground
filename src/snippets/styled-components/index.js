import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Form from './form';
import Header from './header';
import theme from './theme';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: ${props => props.theme.base};
`;

const Stripe = styled.div`
  height: 10vh;
  overflow: hidden;
  transform: skewY(-8deg);
  transform-origin: 0;
  background: ${props => `linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, ${props.theme.header} 70%)`};
`;

export default function Login() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <Stripe />
        <Form fields={['email', 'phoneNumber']} />
      </Container>
    </ThemeProvider>
  );
}
