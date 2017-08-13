import * as React from 'react';
import styled from 'styled-components';

import * as snippets from '../../constants/snippets';

const Container = styled.div`
  display: none;
  flex-direction: column;
  width: 320px;
  height: 100%;
  max-height: 100%;
  overflow: auto;
  background-color: black;
  padding: 0.5rem;
  box-sizing: border-box;
  position: relative;
  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

const Children = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Select = styled.select`
  height: 32px;
`;

export default function SideBar(props) {
  const options = Object.keys(snippets);
  return (
    <Container>
      <Select>
        {
          options
            .map(option => <option key={option}>{option}</option>)
        }
      </Select>
      <Children>{props.children}</Children>
    </Container>
  );
}
