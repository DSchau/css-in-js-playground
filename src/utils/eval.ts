import * as React from 'react';
import * as Logo from 'react-icons/lib/go/rocket';

import { capitalize } from './string';

import { TransformedModule } from '../interfaces';

export const noop = () => null;

export const inject = (Component: string, scope) => {
  const keys = Object.keys(scope);
  const values = keys.map(key => scope[key]);

  return () => {
    return new Function('React', 'Component', 'Logo', ...keys, Component)(
      React,
      React.Component,
      Logo,
      ...values
    );
  };
};

const makeCapitalAvailable = components =>
  Object.keys(components).reduce((allComponents, name) => {
    const component = components[name];
    allComponents[name] = allComponents[capitalize(name)] = component;
    return allComponents;
  }, {});

export default function evalCode(
  code: TransformedModule,
  scope,
  defaultModule = 'index'
) {
  const { [defaultModule]: Component } = Object.keys(code)
    .sort((a, b) => {
      if (a === defaultModule) {
        return 1;
      }
      return a.localeCompare(b);
    })
    .map(name => {
      const { code: component } = code[name];
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
        ...name === defaultModule ? makeCapitalAvailable(components) : {}
      })();
      components[name] = Component;
      return components;
    }, {}) as TransformedModule;

  if (typeof Component !== 'function') {
    return noop;
  }
  return Component;
}
