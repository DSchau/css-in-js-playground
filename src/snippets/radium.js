import React, { Component } from 'react';
import Radium from 'radium';

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
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.logo} />
          <div style={styles.stripes}>
            <div style={styles.stripeBottom} />
          </div>
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>Set up your payments</h1>
            <h1 style={[styles.title, styles.subTitle]}>Rocketship, Inc.</h1>
          </div>
        </header>
        <div style={styles.stripe} />
        <div style={styles.form} onSubmit={ev => ev.preventDefault()}>
          <input
            type="text"
            style={styles.input}
            key="email"
            placeholder="Email"
            onChange={this.handleInputChange('email')}
          />
          <input
            type="text"
            style={styles.input}
            key="phone"
            placeholder="Phone number"
            onChange={this.handleInputChange('phoneNumber')}
          />
          <button
            type="submit"
            style={[
              styles.submitButton,
              valid ? styles.submitButtonEnabled : styles.submitButtonDisabled
            ]}
            disabled={!valid}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

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
  logo: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
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
    background:
      'linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%)'
  },
  titleContainer: {
    padding: '1rem'
  },
  title: {
    color: 'white',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
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
};

export default Radium(Login);
