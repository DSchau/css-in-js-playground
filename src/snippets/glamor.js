import React from 'react';
import { css } from 'glamor';

const heading = css({
  color: 'red'
});

export default function Header() {
  return <h1 className={heading}>Sup nerd</h1>;
}
