import React, { Component } from 'react';
import injectSheet from 'react-jss';

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '2rem',
    boxSizing: 'border-box',
    zIndex: 2
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  button: {
    display: 'block',
    backgroundColor: '#BBB',
    color: 'white',
    border: 'none',
    width: '100%',
    padding: ['1.25rem', '1rem'],
    margin: ['1rem', '0.5rem'],
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    textTransform: 'uppercase',
    boxShadow: { x: 0, y: 1, blur: 6, color: 'rgba(0, 0, 0, 0.1)' }
  },
  buttonEnabled: {
    backgroundColor: props => (props.valid ? '#6772e5' : '#BBB')
  }
};

const FormRenderer = ({
  classes,
  onChange,
  onReset,
  onSubmit,
  valid,
  values
}) => (
  <form className={classes.form} onSubmit={onSubmit}>
    <input
      type="text"
      name="email"
      className={classes.input}
      placeholder="Email"
      onChange={onChange}
      value={values.email}
    />
    <input
      type="text"
      name="phoneNumber"
      className={classes.input}
      placeholder="Phone Number"
      onChange={onChange}
      value={values.phoneNumber}
    />
    <div className={classes.buttonContainer}>
      <button className={classes.button} onClick={onReset}>
        Reset
      </button>
      <button
        type="submit"
        className={[classes.button, classes.buttonEnabled].join(' ')}
        disabled={!valid}
      >
        Submit
      </button>
    </div>
  </form>
);

const Form = injectSheet(formStyles)(FormRenderer);

export default class extends Component {
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
    return (
      <Form
        onChange={this.handleInputChange()}
        onReset={this.handleReset()}
        onSubmit={this.handleSubmit}
        valid={this.state.valid}
        values={{
          email: this.state.email,
          phoneNumber: this.state.phoneNumber
        }}
      />
    );
  }
}
