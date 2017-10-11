import React, { Component } from 'react';
import glamorous from 'glamorous';

import Form from './form';
import Header from './header';

const Container = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '100%',
  backgroundColor: '#f6f9fc'
});

const Stripe = glamorous.div({
  height: '10vh',
  overflow: 'hidden',
  transform: 'skewY(-8deg)',
  transformOrigin: 0,
  background:
    'linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)'
});

export default function Login() {
  return (
    <Container>
      <Header />
      <Stripe />
      <Form />
    </Container>
  );
}
