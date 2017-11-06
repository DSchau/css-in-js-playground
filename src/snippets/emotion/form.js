import React, { Component } from 'react';
import styled from 'react-emotion';

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 2;
`;

const Input = styled('input')`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #6772e5;
    outline: none;
    box-shadow: 0 1px 6px rgba(103, 114, 229, 0.5);
  }
`;

const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Button = styled('button')`
  display: block;
  background-color: #bbb;
  color: white;
  border: none;
  width: 100%;
  padding: 1.25rem 1rem;
  margin: 1rem 0.5rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  text-transform: uppercase;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

const SubmitButton = styled(Button)`
  background-color: ${props => (props.disabled ? '#BBB' : '#6772e5')};
`;

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

  handleInputChange(prop) {
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
