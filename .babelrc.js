module.exports = {
  presets: [
    ['env', {
      modules: false
    }],
    'flow',
    'stage-0',
    'react'
  ],
  plugins: [
    'syntax-dynamic-import',
    'transform-object-rest-spread'
  ]
};
