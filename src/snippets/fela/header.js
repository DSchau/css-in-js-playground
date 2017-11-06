import React from 'react';
import { createComponent } from 'react-fela';
import Logo from 'react-icons/lib/go/rocket';

const Header = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    height: '40%',
    minHeight: 250,
    width: '100%',
    position: 'relative',
    justifyContent: 'center'
  }),
  'header'
);

const LogoContainer = createComponent(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 60,
  width: 60,
  borderRadius: 60,
  backgroundColor: 'white',
  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  zIndex: 2
}));

const Stripes = createComponent(() => ({
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
}));

const StripeBottom = createComponent(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '35%',
  overflow: 'hidden',
  background: 'linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%)'
}));

const TitleContainer = createComponent(() => ({
  padding: '1rem'
}));

const Title = createComponent(
  () => ({
    color: 'white',
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    padding: 0,
    position: 'relative',
    fontSize: '1.5rem',
    fontWeight: '100'
  }),
  'h1'
);

const SubTitle = createComponent(
  () => ({
    color: '#025450',
    marginTop: '0.5rem'
  }),
  Title
);

export default () => (
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
);
