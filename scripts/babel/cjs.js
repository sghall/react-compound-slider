module.exports = {
  exclude: /node_modules/,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['transform-react-remove-prop-types', { mode: 'wrap' }],
  ],
}
