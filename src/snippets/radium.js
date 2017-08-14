import React, { Component } from 'react';
import Radium from 'radium';

class Button extends Component {
  static get defaultProps() {
    return {
      kind: 'primary'
    };
  }

  render() {
    return (
      <button
        style={[
          styles.base,
          styles[this.props.kind]
        ]}>
        Hello World
      </button>
    );
  }
}

const styles = {
  base: {
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    ':hover': {
      background: 'black'
    }
  },

  primary: {
    background: '#0074D9'
  },

  warning: {
    background: '#FF4136'
  }
};

export default Radium(Button);
