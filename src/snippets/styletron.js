import { styled } from 'styletron-react';

const Panel = styletron.styled('div', props => ({
  backgroundColor: props.alert ? 'orange' : 'lightblue',
  fontSize: '12px'
}));

export default function Form() {
  return <Panel alert>Danger!</Panel>;
}
