export const StyledComponents = `import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1\`
  color: red;
\`;

export default function Header() {
	return <Heading>Hello World</Heading>
}
`;

export const Glamor = `import React from 'react';
import { css } from 'glamor';

const heading = css({
  color: 'red'
});

export default function Header() {
	return <h1 className={heading}>Sup nerd</h1>
}
`;

export const Glamorous = `import React from 'react';
import glamorous from 'glamorous';

const Heading = glamorous.h1({
  fontSize: '2.4em',
  marginTop: 10,
  color: '#CC3A4B',
});

export default function Header() {
  return <Heading>Hello World</Heading>
}
`;

export const Glam = `import React from 'react';
import css from 'glam'

let myColor = '#ab67ee'
let radius = '20px'

let className = css\`
color: red;
  &:hover {
    font-weight: bold;
  }
\`

export default function () {
  return (
    <div className={className}>
      what up homies
    </div>
  );
}
`;

export const Emotion = `import React from 'react';
import styled from 'emotion/react';

const Heading = styled('h1')\`
  font-size: 2.4em;
  margin-top: 10;
  color: #CC3A4B;
\`;  

export default function Header() {
  return <Heading>Hello World</Heading>;
}
`;

export const Aphrodite = `import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

class App extends Component {
    render() {
        return <div>
            <span className={css(styles.red)}>
                This is red.
            </span>
            <span className={css(styles.hover)}>
                This turns red on hover.
            </span>
            <span className={css(styles.small)}>
                This turns red when the browser is less than 600px width.
            </span>
            <span className={css(styles.red, styles.blue)}>
                This is blue.
            </span>
            <span className={css(styles.blue, styles.small)}>
                This is blue and turns red when the browser is less than
                600px width.
            </span>
        </div>;
    }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    },

    blue: {
        backgroundColor: 'blue'
    },

    hover: {
        ':hover': {
            backgroundColor: 'red'
        }
    },

    small: {
        '@media (max-width: 600px)': {
            backgroundColor: 'red',
        }
    }
});

export default App;
`;

export const Cxs = `import React from 'react'
import cxs from 'cxs'

const Box = props => {
  return (
    <div className={className}>Hello</div>
  )
}

const className = cxs({
  padding: 32,
  width: '100%',
  backgroundColor: 'tomato',
  color: 'white'
})

export default Box
`;
