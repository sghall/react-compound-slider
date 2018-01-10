// @flow weak
/* eslint eqeqeq: "off" */

const NE = process.env.NODE_ENV
const BE = process.env.BABEL_ENV

const building = BE != undefined && BE !== 'cjs' && BE !== 'coverage'

const plugins = []

if (BE === 'umd') {
  plugins.push('external-helpers')

  if (NE === 'production') {
    plugins.push('transform-react-remove-prop-types')
  }
}

module.exports = {
  presets: [
    [
      'es2015',
      {
        loose: true,
        modules: building ? false : 'commonjs',
      },
    ],
    'stage-1',
    'react',
  ],
  plugins,
}
