import React from 'react';
import css from 'glam';

let myColor = '#ab67ee';
let radius = '20px';

let className = css`
  color: red;
  &:hover {
    font-weight: bold;
  }
`;

export default function() {
  return <div className={className}>what up homies</div>;
}
