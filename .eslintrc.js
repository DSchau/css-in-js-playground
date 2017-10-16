module.exports = {
  extends: 'react-app',
  parser: 'typescript-eslint-parser',
  rules: {
    // https://github.com/eslint/typescript-eslint-parser#known-issues
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'space-infix-ops': 'off',

    // https://github.com/eslint/typescript-eslint-parser/issues/213
    'react/no-unescaped-entities': 'off',
    'react/self-closing-comp': 'off',
    'react/void-dom-elements-no-children': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-max-props-per-line': 'off'
  }
};
