import React from 'react';
import styled from 'react-emotion';
import Logo from './logo';

const Header = styled('header')`
  display: flex;
  flex-direction: column;
  height: 40%;
  min-height: 250px;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const LogoContainer = styled('div')`
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

const Stripes = styled('div')`
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

const StripeBottom = styled('div')`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  overflow: hidden;
  background: linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%);
`;

const TitleContainer = styled('div')`padding: 1rem;`;

const Title = styled('h1')`
  color: white;
  margin: 0;
  padding: 0;
  position: relative;
  font-size: 1.5rem;
  font-weight: 100;
`;

const SubTitle = styled(Title)`
  color: #025450;
  margin-top: 0.5rem;
`;

export default function() {
  return (
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
}
