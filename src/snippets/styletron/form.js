import React, { Component } from 'react';
import { styled } from 'styletron-react';

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '2rem',
  boxSizing: 'border-box',
  zIndex: 2
});

const Input = styled('input', {
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
});

const ButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: '100%'
});

const Button = styled('button', {
  display: 'block',
  backgroundColor: '#BBB',
  color: 'white',
  border: 'none',
  width: '100%',
  padding: '1.25rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  textTransform: 'uppercase',
  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
  margin: '1rem 0.5rem'
});

const SubmitButton = styled(Button, props => ({
  backgroundColor: props.disabled ? '#BBB' : '#6772e5'
}));

SubmitButton.defaultProps = {
  type: 'submit'
};

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
      <Form onSubmit={this.handleSubmit}>
        {this.state.fields.map(fieldName => (
          <Input
            type="text"
            name={fieldName}
            placeholder={fieldName === 'email' ? 'Email' : 'Phone Number'}
            onChange={this.handleInputChange()}
            value={this.state[fieldName]}
            key={fieldName}
          />
        ))}
        <ButtonContainer>
          <Button onClick={this.handleReset()}>Reset</Button>
          <SubmitButton disabled={!this.state.valid}>Submit</SubmitButton>
        </ButtonContainer>
      </Form>
    );
  }
}
