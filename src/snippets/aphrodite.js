import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Logo from './logo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phoneNumber: '',
      fields: ['email', 'phoneNumber'],
      valid: false
    };
  }

  handleInputChange() {
    return ev => {
      const { value } = ev.target;
      const prop = ev.target.getAttribute('name');
      this.setState({
        [prop]: value,
        valid:
          value.length > 0 &&
          this.state.fields.every(field => this.state[field].length > 0)
      });
    };
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <header className={css(styles.header)}>
          <div className={css(styles.logoContainer)}>
            <Logo color="#25b57f" size={32} />
          </div>
          <div className={css(styles.stripes)}>
            <div className={css(styles.stripeBottom)} />
          </div>
          <div className={css(styles.titleContainer)}>
            <h1 className={css(styles.title)}>Set up your payments</h1>
            <h1 className={css(styles.title, styles.subTitle)}>
              Rocketship, Inc.
            </h1>
          </div>
        </header>
        <div className={css(styles.stripe)} />
        <div className={css(styles.form)} onSubmit={ev => ev.preventDefault()}>
          <input
            type="text"
            name="email"
            className={css(styles.input)}
            placeholder="Email"
            onChange={this.handleInputChange()}
          />
          <input
            type="text"
            name="phoneNumber"
            className={css(styles.input)}
            placeholder="Phone number"
            onChange={this.handleInputChange()}
          />
          <button
            type="submit"
            className={css(
              ...[
                styles.submitButton,
                this.state.valid
                  ? styles.submitButtonEnabled
                  : styles.submitButtonDisabled
              ]
            )}
            disabled={!this.state.valid}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const styles = StyleSheet.create({
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
    padding: '1.25rem 1rem',
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    border: '1px solid transparent',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
    ':focus': {
      borderColor: '#6772e5',
      outline: 'none',
      boxShadow: '0 1px 6px rgba(103, 114, 229, 0.5)'
    }
  },
  submitButton: {
    display: 'block',
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
  submitButtonEnabled: {
    backgroundColor: '#6772e5'
  },
  submitButtonDisabled: {
    backgroundColor: '#BBB'
  }
});

export default Login;
