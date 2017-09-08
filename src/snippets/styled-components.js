import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from './logo';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: #f6f9fc;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 40%;
  min-height: 250px;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 60px;
  background-color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
`;

const Stripes = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: skewY(-8deg);
  transform-origin: 0;
  background: linear-gradient(-150deg, #25b57f 0%, #acf0b5 70%);
`;

const Stripe = styled.div`
  height: 10vh;
  overflow: hidden;
  transform: skewY(-8deg);
  transform-origin: 0;
  background: linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%);
`;

const StripeBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  overflow: hidden;
  background: linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%);
`;

const TitleContainer = styled.div`padding: 1rem;`;

const Title = styled.h1`
  color: white;
  margin: 0;
  padding: 0;
  position: relative;
  font-size: 1.5rem;
  font-weight: 100;
`;

const SubTitle = Title.extend`
	color: #025450;
	margin-top: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

const Input = styled.input`
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

const SubmitButton = styled.button.attrs({
  type: 'submit'
})`
  display: block;
  background-color: ${props => (props.disabled ? '#BBB' : '#6772e5')};
  color: white;
  border: none;
  width: 100%;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  text-transform: uppercase;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

export default class Login extends Component {
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
    return (
      <Container>
        <Header>
          <LogoContainer>
            <Logo color="#25b57f" size={32} />
          </LogoContainer>
          <Stripes>
            <StripeBottom />
          </Stripes>
          <TitleContainer>
            <Title>Set up your payments</Title>
            <SubTitle>Rocketship, Inc.</SubTitle>
          </TitleContainer>
        </Header>
        <Stripe />
        <Form onSubmit={ev => ev.preventDefault()}>
          <Input
            type="text"
            placeholder="Email"
            onChange={this.handleInputChange('email')}
          />
          <Input
            type="text"
            placeholder="Phone number"
            onChange={this.handleInputChange('phoneNumber')}
          />
          <SubmitButton disabled={!this.state.valid}>
            Submit
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
