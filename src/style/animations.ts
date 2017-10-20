import { keyframes } from 'glamor';

export const FADE_IN = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});

export const SCALE_IN = keyframes({
  from: {
    transform: `scale(0)`
  },
  to: {
    transform: `scale(1)`
  }
});

export const SCALE_OUT = keyframes({
  from: {
    transform: `scale(1)`
  },
  to: {
    transform: `scale(0)`
  }
});

export const SLIDE_UP = keyframes({
  from: {
    bottom: '-7.5%'
  },
  to: {
    bottom: '7.5%'
  }
});
