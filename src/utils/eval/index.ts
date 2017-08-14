import * as React from 'react';
import styled from 'styled-components';

import getStylingLibrary from '../libraries/';

export default function evalCode(code = '', scope = {}) {
  const transformed = code
    .replace(/export\s+default/, 'return ')
    .replace(/import[^\n]+/g, '');
  const noop = () => null;
  try {
    const scopeKeys = Object.keys(scope);
    const scopeValues = scopeKeys.map(key => scope[key]);
    const res = new Function('React', 'Component', ...scopeKeys, transformed);
    const Component = res(React, React.Component, ...scopeValues);
    if (typeof Component !== 'function') {
      return noop;
    }
    return Component;
  } catch (e) {
    return noop;
  }
}
