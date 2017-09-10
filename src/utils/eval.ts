import * as React from 'react';
import Logo from 'react-icons/lib/go/rocket';

export const noop = () => null;

export default function evalCode(code = '', scope = {}) {
  const transformed = code
    .replace(/export\s+default/, 'return ')
    .replace(/import[^\n]+/g, '');
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);
  const makeComponent = new Function(
    'React',
    'Component',
    'Logo',
    ...scopeKeys,
    transformed
  );
  const Component = makeComponent(React, React.Component, Logo, ...scopeValues);
  if (typeof Component !== 'function') {
    return noop;
  }
  return Component;
}
