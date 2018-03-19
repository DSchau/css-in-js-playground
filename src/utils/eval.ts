import * as React from 'react';
import * as Logo from 'react-icons/lib/go/rocket';
import camelCase from 'lodash.camelcase';

import { capitalize } from './string';

import { TransformedModule } from '../interfaces';

export const noop = () => null;

export const inject = (code: string, scope) => {
  const keys = obj => Object.keys(obj);
  const values = (keys, obj) => keys.map(key => obj[key]);

  return () => {
    const reactKeys = keys(React);
    const scopeKeys = keys(scope);
    /* eslint no-new-func: "off" */
    return new Function('React', 'Logo', ...reactKeys.concat(scopeKeys), code)(
      React,
      Logo,
      ...values(reactKeys, React).concat(values(scopeKeys, scope))
    );
  };
};

const makeNameVariants = components =>
  Object.keys(components).reduce((allComponents, name) => {
    const component = components[name];
    allComponents[name] = allComponents[capitalize(name)] = component;
    return allComponents;
  }, {});

// TODO: Figure out how to inject each component with each component
export function evalCode(
  code: TransformedModule,
  scope,
  defaultModule = 'index'
) {
  const normalizedCode = Object.keys(code).reduce((normalized, name) => {
    normalized[camelCase(name)] = code[name];
    return normalized;
  }, {});
  const { [defaultModule]: Component } = Object.keys(normalizedCode)
    .sort((a, b) => {
      if (a === defaultModule) {
        return 1;
      }
      return a.localeCompare(b);
    })
    .map(name => {
      const { code: component } = normalizedCode[name];
      return {
        name,
        component: component
          .replace(/export\s+default/, 'return ')
          .replace(/import[^\n]+/g, '')
      };
    })
    .reduce((components, { component, name }) => {
      const Component = inject(component, {
        ...scope,
        ...makeNameVariants(components)
        //...name === defaultModule ? makeNameVariants(components) : {}
      })();
      components[name] = Component;
      return components;
    }, {}) as TransformedModule;

  if (typeof Component !== 'function') {
    return noop;
  }
  return Component;
}
