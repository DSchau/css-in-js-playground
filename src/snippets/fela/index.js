import React from 'react';
import { Provider, createComponent } from 'react-fela';
import { createRenderer } from 'fela';
import webPreset from 'fela-preset-web';

import Form from './form';
import Header from './header';

const renderer = createRenderer({
  plugins: [...webPreset]
});

const Container = createComponent(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '100%',
  backgroundColor: '#f6f9fc'
}));

const Stripe = createComponent(() => ({
  height: '10vh',
  overflow: 'hidden',
  transform: 'skewY(-8deg)',
  transformOrigin: 0,
  background:
    'linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)'
}));

const Login = () => (
  <Container>
    <Header />
    <Stripe />
    <Form />
  </Container>
);

export default () => (
  <Provider renderer={renderer}>
    <Login />
  </Provider>
);
