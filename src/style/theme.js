// @flow
type StyleBase = {
  base: string,
  text: string
};

export type Theme = {
  dark: StyleBase,
  light: StyleBase,
  primary: 'dark' | 'light'
};

export type ThemeProps = {
  theme?: Theme
};

export const THEME = {
  dark: {
    base: '#1E1E20',
    text: '#ddd'
  },
  light: {
    base: '#ECF0F1',
    text: '#1E1E20'
  },
  primary: 'dark'
};
