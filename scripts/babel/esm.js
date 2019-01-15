module.exports = {
  exclude: /node_modules/,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['transform-react-remove-prop-types', { mode: 'wrap' }],
    ['@babel/transform-runtime', { useESModules: true }],
  ],
}
