import React from 'react';
import Logo from 'react-icons/lib/go/rocket';

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <Logo color="#25b57f" size={32} />
      </div>
      <div style={styles.stripes}>
        <div style={styles.stripeBottom} />
      </div>
      <div style={styles.titleContainer}>
        <h1 style={styles.title}>CSS in JS Playground</h1>
        <h1 style={Object.assign({}, styles.title, styles.subTitle)}>
          Form Design by Stripe
        </h1>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    height: '40%',
    minHeight: 250,
    width: '100%',
    position: 'relative',
    justifyContent: 'center'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 2
  },
  stripes: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    transform: 'skewY(-8deg)',
    transformOrigin: 0,
    background: 'linear-gradient(-150deg, #25b57f 0%, #acf0b5 70%)'
  },
  stripeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    overflow: 'hidden',
    background:
      'linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%)'
  },
  titleContainer: {
    padding: '1rem'
  },
  title: {
    color: 'white',
    margin: 0,
    padding: 0,
    position: 'relative',
    fontSize: '1.5rem',
    fontWeight: '100'
  },
  subTitle: {
    color: '#025450',
    marginTop: '0.5rem'
  }
};

export default Header;
