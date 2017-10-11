import React from 'react';
import injectSheet from 'react-jss';
import Logo from './logo';

import { Header } from './header';
import { Form } from './form';

function Login({ classes }) {
  return (
    <main className={classes.container}>
      <Header />
      <div className={classes.stripe} />
      <Form />
    </main>
  );
}

const loginStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#f6f9fc'
  },
  stripe: {
    height: '10vh',
    overflow: 'hidden',
    transform: 'skewY(-8deg)',
    transformOrigin: 0,
    background:
      'linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)'
  }
};

export default injectSheet(loginStyles)(Login);
