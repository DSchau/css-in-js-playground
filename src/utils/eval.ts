import * as React from 'react';
import styled from 'styled-components';

export default function evalCode(code = '', scope = {}) {
  const transformed = code
    .replace(/export\s+default/, 'return ')
    .replace(/import[^\n]+/g, '');
  const noop = () => null;
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map(key => scope[key]);
  const makeComponent = new Function(
    'React',
    'Component',
    ...scopeKeys,
    transformed
  );
  const Component = makeComponent(React, React.Component, ...scopeValues);
  if (typeof Component !== 'function') {
    return noop;
  }
  return Component;
}
