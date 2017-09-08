import React, { Component } from 'react';
import jss from 'jss';
import preset from 'jss-preset-default';
import Logo from './logo';

jss.setup(preset());

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#f6f9fc'
  },
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
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    boxShadow: { x: 0, y: 1, blur: 6, color: 'rgba(0, 0, 0, 0.1)' },
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: '2'
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
  stripe: {
    height: '10vh',
    overflow: 'hidden',
    transform: 'skewY(-8deg)',
    transformOrigin: 0,
    background:
    'linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)'
  },
  stripeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    overflow: 'hidden',
    background: 'linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%)'
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
    extend: 'title',
    color: '#025450',
    marginTop: '0.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box'
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    padding: ['1.25rem', '1rem'],
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    border: [1, 'solid', 'transparent'],
    boxShadow: { x: 0, y: 1, blur: 6, color: 'rgba(0, 0, 0, 0.1)' },
    '&:focus': {
      borderColor: '#6772e5',
      outline: 'none',
      boxShadow: { x: 0, y: 1, blur: 6, color: 'rgba(103, 114, 229, 0.5)' }
    }
  },
  submitButton: {
    display: 'block',
    backgroundColor: '#6772e5',
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '1.25rem 1rem',
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    textTransform: 'uppercase',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '1rem'
  },
  submitButtonDisabled: {
    backgroundColor: '#BBB'
  }
};

const { classes } = jss.createStyleSheet(styles).attach();

export default class Login extends Component {
  state = {
    email: '',
    phoneNumber: '',
    fields: ['email', 'phoneNumber'],
    valid: false
  };

  handleInputChange(prop) {
    return ev => {
      const { value } = ev.target;
      this.setState({
        [prop]: value,
        valid:
        value.length > 0 &&
        this.state.fields.every(field => this.state[field].length > 0)
      });
    };
  }

  render() {
    const { valid } = this.state;

    return (
      <main className={classes.container}>
        <header className={classes.header}>
          <div className={classes.logoContainer}>
            <Logo color="#25b57f" size={32} />
          </div>
          <div className={classes.stripes}>
            <div className={classes.stripeBottom} />
          </div>
          <div className={classes.titleContainer}>
            <h1 className={classes.title}>Set up your payments</h1>
            <h1 className={classes.subTitle}>Rocketship, Inc.</h1>
          </div>
        </header>
        <div className={classes.stripe}/>
        <form className={classes.form} onSubmit={ev => ev.preventDefault()}>
          <input
            className={classes.input}
            type="text"
            placeholder="Email"
            onChange={this.handleInputChange('email')}
          />
          <input
            className={classes.input}
            type="text"
            placeholder="Phone number"
            onChange={this.handleInputChange('phoneNumber')}
          />
          <button type="submit" className={[classes.submitButton, !valid && classes.submitButtonDisabled].join(' ')} disabled={!valid}>
            Submit
          </button>
        </form>
      </main>
    );
  }
};
