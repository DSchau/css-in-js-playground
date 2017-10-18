import React, { Component } from 'react';
import { css, include } from 'linaria';
import Logo from './logo';

const container = css`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  background-color: #f6f9fc;
`;

const header = css`
  display: flex;
  flex-direction: column;
  height: 40%;
  min-height: 250px;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const logoContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 60px;
  background-color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
`;

const stripes = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform: skewY(-8deg);
  transform-origin: 0;
  background: linear-gradient(-150deg, #25b57f 0%, #acf0b5 70%);
`;

const stripe = css`
  height: 10vh;
  overflow: hidden;
  transform: skewY(-8deg);
  transform-origin: 0;
  background: linear-gradient(-150deg, rgba(255, 255, 255, 0) 40%, #ddecf7 70%);
`;

const stripeBottom = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  overflow: hidden;
  background: linear-gradient(150deg, rgba(172, 240, 181, 0) 40%, #acf0b5 70%);
`;

const titleContainer = css`padding: 1rem;`;

const title = css`
  color: white;
  margin: 0;
  padding: 0;
  position: relative;
  font-size: 1.5rem;
  font-weight: 100;
`;

const subTitle = css`
  ${include(title)};
  color: #025450;
  margin-top: 0.5rem;
`;

const form = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 2;
`;

const input = css`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  &:focus {
    border-color: #6772e5;
    outline: none;
    box-shadow: 0 1px 6px rgba(103, 114, 229, 0.5);
  }
`;

const submitButton = css`
  display: block;
  background-color: #6772e5;
  color: white;
  border: none;
  width: 100%;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  border-radius: 0.25rem;
  text-transform: uppercase;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phoneNumber: '',
      fields: ['email', 'phoneNumber'],
      valid: false
    };
  }

  handleInputChange(prop) {
    return ev => {
      const { value } = ev.target;
      const prop = ev.target.getAttribute('name');
      this.setState({
        [prop]: value,
        valid:
          value.length > 0 &&
          this.state.fields.every(field => this.state[field].length > 0)
      });
    };
  }

  render() {
    return (
      <main className={container}>
        <header className={header}>
          <div className={logoContainer}>
            <Logo color="#25b57f" size={32} />
          </div>
          <div className={stripes}>
            <div className={stripeBottom} />
          </div>
          <div className={titleContainer}>
            <h1 className={title}>Set up your payments</h1>
            <h1 className={subTitle}>Rocketship, Inc.</h1>
          </div>
        </header>
        <div className={stripe} />
        <form className={form} onSubmit={ev => ev.preventDefault()}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={this.handleInputChange()}
            className={input}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone number"
            onChange={this.handleInputChange()}
            className={input}
          />
          <button
            type="submit"
            disabled={!this.state.valid}
            className={submitButton}
            style={{ backgroundColor: `${this.state.valid ? '#6772e5' : '#BBB'}` }}>
            Submit
          </button>
        </form>
      </main>
    );
  }
}
