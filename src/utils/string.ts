import camelCase from 'lodash.camelcase';

export const capitalize = str =>
  camelCase(str).replace(/^(\w)/, (match, char) => char.toUpperCase());
