import * as React from 'react';
import glamorous from 'glamorous';

import { ThemeProps } from '../../style';

const Button = glamorous.button<ThemeProps>(
  {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none'
  },
  ({ theme }) => ({
    ':focus': {
      boxShadow: `0 0 5px ${theme[theme.primary].accent}`
    }
  })
);

interface Props {
  children?(args: any): any;
  onClick(ev: any);
  render?(): React.ReactElement<any>;
}

function Accessible({ children, onClick, render, ...rest }: Props) {
  return (
    <Button onClick={onClick} {...rest}>
      {render ? render() : children({})}
    </Button>
  );
}

export { Accessible };
