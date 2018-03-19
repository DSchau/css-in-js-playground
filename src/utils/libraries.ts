import * as glamorous from 'glamorous';
import { Module } from '../interfaces';

const expr = library => new RegExp(`["']${library}["']`);

const matchesExpression = (text, library): boolean => text.match(expr(library));

export const getLibraryImportStatement = (
  code: Module,
  defaultModule = 'index'
): string => {
  const matches = matchesExpression.bind(undefined, code[defaultModule]);
  const importStatement = (statement, library) =>
    `import ${statement} from '${library}';`;

  if (matches('styled-components')) {
    return importStatement('styled', 'styled-components');
  } else if (matches('glamorous')) {
    return importStatement('glamorous', 'glamorous');
  } else if (matches('aphrodite')) {
    return importStatement('aphrodite', 'aphrodite');
  } else if (matches('react-emotion')) {
    return importStatement('styled', 'react-emotion');
  } else if (matches('cxs/component')) {
    return importStatement('cxs', 'cxs/component');
  } else if (matches('radium')) {
    return importStatement('Radium', 'radium');
  } else if (matches('jsxstyle')) {
    return importStatement('jsxstyle', 'jsxstyle');
  } else if (matches('fela')) {
    return [
      importStatement('fela', 'fela'),
      importStatement('webPreset', 'fela-preset-web'),
      importStatement('reactFela', 'react-fela')
    ].join('\n');
  } else if (matches('jss')) {
    return [
      importStatement('jss', 'jss'),
      importStatement('preset', 'jss-preset-default'),
      '',
      'jss.setup(preset);'
    ].join('\n');
  } else if (matches('nano-css')) {
    return importStatement('nano', 'nano-css');
  } else if (matches('react-jss')) {
    return importStatement('injectSheet', 'react-jss');
  } else if (matches('styletron-react')) {
    return importStatement('{ styled } ', 'styletron-react');
  } else if (matches('yocss')) {
    return importStatement('css', 'yocss');
  }
  return '';
};

export const getScopedImports = (
  code: Module,
  defaultModule = 'index'
): Promise<any> => {
  const matches = matchesExpression.bind(undefined, code[defaultModule]);

  if (matches('styled-components')) {
    return import('styled-components').then(({ default: styled, ...rest }) => ({
      styled,
      ...rest
    }));
  } else if (matches('glamorous')) {
    const { default: glamorousFn, ...rest } = glamorous;
    return Promise.resolve({
      glamorous: glamorousFn,
      ...rest
    });
  } else if (matches('aphrodite')) {
    return import('aphrodite').then(aphrodite => ({ ...aphrodite }));
  } else if (matches('react-emotion')) {
    return import('react-emotion').then(({ default: styled, ...rest }) => ({
      styled,
      ...rest
    }));
  } else if (matches('cxs/component')) {
    return import('cxs/component').then(cxs => ({ cxs }));
  } else if (matches('./nano')) {
    console.log('sup  nigga');
    return Promise.all([
      import('nano-css'),
      import('nano-css/addon/cache'),
      import('nano-css/addon/stable'),
      import('nano-css/addon/nesting'),
      import('nano-css/addon/atoms'),
      import('nano-css/addon/keyframes'),
      import('nano-css/addon/sheet'),
      import('nano-css/addon/jsx'),
      import('nano-css/addon/rule')
    ]).then(
      (
        [
          nano,
          addonCache,
          addonStable,
          addonNesting,
          addonAtoms,
          addonKeyframes,
          addonSheet,
          addonJsx,
          addonRule
        ]
      ) => {
        return {
          ...nano,
          addonCache: addonCache.addon,
          addonStable: addonStable.addon,
          addonNesting: addonNesting.addon,
          addonAtoms: addonAtoms.addon,
          addonKeyframes: addonKeyframes.addon,
          addonSheet: addonSheet.addon,
          addonJsx: addonJsx.addon,
          addonRule: addonRule.addon
        };
      }
    );
  } else if (matches('radium')) {
    return import('radium').then(radium => ({ Radium: radium }));
  } else if (matches('jsxstyle')) {
    return import('jsxstyle');
  } else if (matches('jss')) {
    return Promise.all([
      import('jss'),
      import('jss-preset-default')
    ]).then(([jss, preset]) => ({
      jss: (jss as any).default,
      preset: preset.default
    }));
  } else if (matches('react-jss')) {
    return import('react-jss').then(reactJSS => ({
      injectSheet: (reactJSS as any).default
    }));
  } else if (matches('fela')) {
    return Promise.all([
      import('fela'),
      import('fela-preset-web'),
      import('react-fela')
    ]).then(([fela, webPreset, reactFela]) => ({
      ...fela,
      webPreset: (webPreset as any).default,
      ...reactFela
    }));
  } else if (matches('linaria')) {
    return import('linaria');
  } else if (matches('styletron-react')) {
    return Promise.all([
      import('styletron'),
      import('styletron-react')
    ]).then(([styletron, styletronReact]) => {
      return {
        Styletron: styletron.default,
        ...styletronReact
      };
    });
  } else if (matches('yocss')) {
    return import('yocss/es/index').then(({ default: yocss }) => ({
      css: yocss
    }));
  }
  return Promise.resolve({});
};
