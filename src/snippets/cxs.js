import React, { Component } from 'react';
import cxs from 'cxs/component';
import Logo from './logo';

const Container = cxs('main')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '100%',
  backgroundColor: '#f6f9fc'
});

const Header = cxs('header')({
  display: 'flex',
  flexDirection: 'column',
  height: '40%',
  minHeight: 250,
  width: '100%',
  position: 'relative',
  justifyContent: 'center'
});

const LogoContainer = cxs('div')({
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
  zIndex: '2'
});

const Stripes = cxs('div')({
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
});

const Stripe = cxs('div')({
  height: '10vh',
  overflow: 'hidden',
  transform: 'skewY(-8deg)',
  transformOrigin: 0,
  background:
    'linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%)'
});

const StripeBottom = cxs('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '35%',
  overflow: 'hidden',
  background: 'linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%)'
});

const TitleContainer = cxs('div')({
  padding: '1rem'
});

const Title = cxs('h1')({
  color: 'white',
  margin: 0,
  padding: 0,
  position: 'relative',
  fontSize: '1.5rem',
  fontWeight: '100'
});

const SubTitle = cxs(Title)({
  color: '#025450',
  marginTop: '0.5rem'
});

const Form = cxs('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '2rem',
  boxSizing: 'border-box'
});

const Input = cxs('input')({
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

const SubmitButton = cxs('button')(props => ({
  display: 'block',
  backgroundColor: props.disabled ? '#BBB' : '#6772e5',
  color: 'white',
  border: 'none',
  width: '100%',
  padding: '1.25rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  textTransform: 'uppercase',
  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
  marginTop: '1rem'
}));

SubmitButton.defaultProps = {
  type: 'submit'
};

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
