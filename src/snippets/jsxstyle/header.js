import React from 'react';
import { Col, Row, Block } from 'jsxstyle';
import Logo from 'react-icons/lib/go/rocket';

function LogoContainer({children}) {
  return (
    <Row
      justifyContent="center"
      alignItems="center"
      height={60}
      width={60}
      borderRadius={60}
      backgroundColor="white"
      boxShadow="0 1px 6px rgba(0, 0, 0, 0.1)"
      position="absolute"
      top="1rem"
      left="1rem"
      zIndex={2}
    >
      {children}
    </Row>
  );
}

function Stripes({children}) {
  return (
    <Block
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      width="100%"
      height="100%"
      overflow="hidden"
      transform="skewY(-8deg)"
      transformOrigin={0}
      background="linear-gradient(-150deg, #25b57f 0%, #acf0b5 70%)"
    >
      <Block
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="35%"
        overflow="hidden"
        background="linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%)"
      />
    </Block>
  );
}

function Title({color="white", marginTop=0, children}) {
  return (
    <Block
      component="h1"
      color={color}
      margin={0}
      marginTop={marginTop}
      padding={0}
      position="relative"
      fontSize="1.5rem"
      fontWeight={100}
    >
      {children}
    </Block>
  );
}

function SubTitle({children}) {
  return (
    <Title color="#025450" marginTop="0.5rem">
      {children}
    </Title>
  );
};

export default function Header() {
  return (
    <Col
      component="header"
      height="40%"
      minHeight={250}
      width="100%"
      position="relative"
      justifyContent="center"
    >
      <LogoContainer>
        <Logo color="#25b57f" size={32} />
      </LogoContainer>
      <Stripes />
      <Block padding="1rem">
        <Title>Set up your payments</Title>
        <SubTitle>Rocketship, Inc.</SubTitle>
      </Block>
    </Col>
  );
}
