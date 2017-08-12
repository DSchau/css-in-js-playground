import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: none;
  width: 100%;
  max-width: 20%;
  height: 100%;
  background-color: black;
  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

export default function SideBar() {
  return (
    <Container>

    </Container>
  );
}
