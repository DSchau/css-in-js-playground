import React from 'react';

import Form from './form';
import Header from './header';

function Login() {
  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.stripe} />
      <Form />
    </div>
  );
}

const styles = {
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

export default Login;
