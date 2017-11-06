import React, { Component } from 'react';
import { Col, Row, Block } from 'jsxstyle';

function TextInput({name, placeholder, onChange, value}) {
  return (
    <Block
      component="input"
      type="text"
      width="100%"
      marginBottom="1rem"
      padding="1.25rem 1rem"
      boxSizing="border-box"
      borderRadius="0.25rem"
      border="1px solid transparent"
      boxShadow="0 1px 6px rgba(0, 0, 0, 0.1)"
      focusBorderColor="#6772e5"
      focusOutline="none"
      focusBoxShadow="0 1px 6px rgba(103, 114, 229, 0.5)"
      props={{name, placeholder, onChange, value}}
    />
  );
}

function Button({children, type, onClick, disabled, backgroundColor="#BBB"}) {
  return (
    <Block
      component="button"
      color="white"
      border="none"
      width="100%"
      padding="1.25rem 1rem"
      boxSizing="border-box"
      borderRadius="0.25rem"
      textTransform="uppercase"
      boxShadow="0 1px 6px rgba(0, 0, 0, 0.1)"
      margin="1rem 0.5rem"
      backgroundColor={backgroundColor}
      props={{disabled, onClick}}
    >
      {children}
    </Block>
  );
}

function SubmitButton({children, disabled, onClick}) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      backgroundColor={disabled ? void 0 : "#6772e5"}
    >
      {children}
    </Button>
  );
}

export default class Form extends Component {
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
      <Col
        component="form"
        alignItems="center"
        justifyContent="center"
        width="100%"
        padding="2rem"
        boxSizing="border-box"
        zIndex={2}
        props={{onSubmit: this.handleSubmit}}
      >
        {this.state.fields.map(fieldName => (
          <TextInput
            name={fieldName}
            placeholder={fieldName === 'email' ? 'Email' : 'Phone Number'}
            onChange={this.handleInputChange()}
            value={this.state[fieldName]}
            key={fieldName}
          />
        ))}
        <Row width="100%">
          <Button onClick={this.handleReset()}>Reset</Button>
          <SubmitButton disabled={!this.state.valid}>Submit</SubmitButton>
        </Row>
      </Col>
    );
  }
}
