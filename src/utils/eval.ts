import * as React from 'react';
import * as Logo from 'react-icons/lib/go/rocket';
import camelCase from 'lodash.camelcase';

import { capitalize } from './string';

import { TransformedModule } from '../interfaces';

export const noop = () => null;

export const inject = (Component: string, scope: any) => {
  const keys = Object.keys(scope);
  const values = keys.map(key => scope[key]);

  return () => {
    /* eslint no-new-func: "off" */
    return new Function('React', 'Component', 'Logo', ...keys, Component)(
      React,
      React.Component,
      Logo,
      ...values
    );
  };
};

/*
 * TODO: Inject "active" component last, before index
 */
const makeNameVariants = components =>
  Object.keys(components).reduce((allComponents, name) => {
    const component = components[name];
    allComponents[name] = allComponents[capitalize(name)] = component;
    return allComponents;
  }, {});

// TODO: Figure out how to inject each component with each component
export function evalCode({
  code,
  scope,
  activeModule,
  defaultModule = 'index'
}) {
  const normalizedCode = Object.keys(code).reduce((normalized, name) => {
    normalized[camelCase(name)] = code[name];
    return normalized;
  }, {});
  const { [defaultModule]: Component } = Object.keys(normalizedCode)
    .sort((a, b) => {
      if (a === defaultModule || a === activeModule) {
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
      components[name] = inject(component, {
        ...scope,
        ...makeNameVariants(components)
      })();
      return components;
    }, {}) as TransformedModule;

  if (typeof Component !== 'function') {
    return noop;
  }
  return Component;
}
