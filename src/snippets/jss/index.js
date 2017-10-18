import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';

import Form from './form';
import Header from './header';

jss.setup(preset());

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

const { classes } = jss.createStyleSheet(styles).attach();

export default function Login() {
  return (
    <main className={classes.container}>
      <Header />
      <div className={classes.stripe} />
      <Form />
    </main>
  );
}
