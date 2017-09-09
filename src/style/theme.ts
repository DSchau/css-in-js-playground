interface StyleBase {
  base: string;
  text: string;
}

export interface Theme {
  dark: StyleBase;
  light: StyleBase;
  primary: 'dark' | 'light';
}

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
