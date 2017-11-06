import { complement, darken, lighten } from 'polished';

/* eslint no-use-before-define: "off" */
interface StyleBase {
  base: string;
  baseSecondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  danger: string;
}

export enum Themes {
  dark = 'dark',
  light = 'light'
}

export interface Theme {
  dark: StyleBase;
  light: StyleBase;
  primary: Themes;
}

export interface ThemeProps {
  theme?: Theme;
}

const dark = {
  base: '#31353D',
  baseSecondary: '#1C1D21',
  text: '#ddd',
  accent: '#92CDCF',
  danger: lighten(0.2, '#CD2C24')
};

const light = {
  base: '#EEEFF7',
  baseSecondary: darken(0.05, '#EEEFF7'),
  text: '#1E1E20',
  accent: complement(dark.accent),
  danger: lighten(0.1, '#CD2C24')
};

export const THEME = {
  dark: {
    ...dark,
    textSecondary: darken(0.2, '#ddd')
  },
  light: {
    ...light,
    textSecondary: lighten(0.2, '#1E1E20')
  },
  primary: 'dark'
};
