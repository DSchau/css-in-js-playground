import React, { Component } from 'react';
import { connect } from 'react-fela';

class Form extends Component {
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

  handleReset() {
    return () => {
      const resetFields = this.state.fields.reduce(
        (reset, field) => {
          reset[field] = '';
          return reset;
        },
        { valid: false }
      );
      this.setState(resetFields);
    };
  }

  handleSubmit(ev) {
    ev.preventDefault();
  }

  render() {
    const { valid } = this.state;
    const { styles } = this.props;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        {this.state.fields.map(fieldName => (
          <input
            type="text"
            name={fieldName}
            className={styles.input}
            key={fieldName}
            placeholder={fieldName === 'email' ? 'Email' : 'Phone Number'}
            onChange={this.handleInputChange()}
            value={this.state[fieldName]}
          />
        ))}
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={this.handleReset()}>
            Reset
          </button>
          <button
            type="submit"
            className={[styles.button].concat(
              valid ? [styles.buttonEnabled] : []
            )}
            disabled={!valid}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const rules = {
  form: () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box',
    zIndex: 2
  }),
  input: () => ({
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    padding: '1.25rem 1rem',
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
    ':focus': {
      borderColor: '#6772e5',
      outline: 'none',
      boxShadow: '0 1px 6px rgba(103, 114, 229, 0.5)'
    }
  }),
  buttonContainer: () => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  }),
  button: () => ({
    display: 'block',
    backgroundColor: '#BBB',
    color: 'white',
    border: 'none',
    width: '100%',
    padding: '1.25rem 1rem',
    margin: '1rem 0.5rem',
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    textTransform: 'uppercase',
    boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)'
  }),
  buttonEnabled: () => ({
    backgroundColor: '#6772e5'
  })
};

export default connect(rules)(Form);
