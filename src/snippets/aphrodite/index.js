import React from 'react';
import { StyleSheet, css } from 'aphrodite';

import Form from './form';
import Header from './header';

function Login() {
  return (
    <div className={css(styles.container)}>
      <Header />
      <div className={css(styles.stripe)} />
      <Form />
    </div>
  );
}

const styles = StyleSheet.create({
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
});

export default Login;
