import React from 'react';
import glamorous from 'glamorous';

const Heading = glamorous.h1({
  fontSize: '2.4em',
  marginTop: 10,
  color: '#CC3A4B'
});

export default function Header() {
  return <Heading>Hello World</Heading>;
}
