// @flow weak

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const config = {
  input: 'src/index.js',
  name: 'react-compound-slider',
  globals: {
    react: 'React',
  },
  external: ['react'],
  plugins: [
    babel({
      exclude: ['node_modules/warning/**', 'node_modules/prop-types/**'],
    }),
    resolve(),
    commonjs({
      include: /node_modules\/(?!(d3-scale)\/).*/,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config
