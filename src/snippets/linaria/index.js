import React from 'react';
import { css } from 'linaria';
import Logo from './logo';

import Form from './form';
import Header from './header';

const container = css`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: #f6f9fc;
`;

const stripe = css`
  height: 10vh;
  overflow: hidden;
  transform: skewY(-8deg);
  transform-origin: 0;
  background: linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%);
`;

export default function Login() {
  return (
    <main className={container}>
      <Header />
      <div className={stripe} />
      <Form />
    </main>
  );
}
