import React from 'react';
import cxs from 'cxs';

const Box = props => {
  return <div className={className}>Hello</div>;
};

const className = cxs({
  padding: 32,
  backgroundColor: 'tomato',
  color: 'white'
});

export default Box;
