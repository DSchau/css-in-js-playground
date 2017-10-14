import { darken, lighten } from 'polished';

interface StyleBase {
  base: string;
  text: string;
  textSecondary: string;
  secondary: string;
}

export interface Theme {
  dark: StyleBase;
  light: StyleBase;
  primary: 'dark' | 'light';
}

export interface ThemeProps {
  theme?: Theme;
}

const dark = {
  base: '#1E1E20',
  text: '#ddd',
  secondary: '#51cbee'
};

const light = {
  base: '#ECF0F1',
  text: '#1E1E20',
  secondary: darken(0.15, dark.secondary)
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
