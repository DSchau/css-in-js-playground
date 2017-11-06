import React, { Component } from 'react';
import { Col, Block } from 'jsxstyle';

import Form from './form';
import Header from './header';

function Container({children}) {
  return (
    <Col
      component="main"
      minHeight="100%"
      width="100%"
      backgroundColor="#f6f9fc"
    >
      {children}
    </Col>
  );
}

function Stripe() {
  return (
    <Block
      height= "10vh"
      overflow= "hidden"
      transform= "skewY(-8deg)"
      transformOrigin= {0}
      background="linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)"
    />
  )
};

export default function Login() {
  return (
    <Container>
      <Header />
      <Stripe />
      <Form />
    </Container>
  );
}
