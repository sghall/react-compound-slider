// @flow weak

const fs = require('fs')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  })

console.log('Building CommonJS modules...')

exec('babel src -d build --ignore *.spec.js', {
  BABEL_ENV: 'cjs',
})

console.log('\nBuilding ES module index...')

exec('babel src -d build/es --ignore *.spec.js', {
  BABEL_ENV: 'es',
})

console.log('\nBuilding react-compound-slider.js...')

exec('rollup -c -f umd -o build/dist/react-compound-slider.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development',
})

console.log('\nBuilding react-compound-slider.min.js...')

exec('rollup -c -f umd -o build/dist/react-compound-slider.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
})

const size = gzipSize.sync(
  fs.readFileSync('build/dist/react-compound-slider.min.js'),
)

console.log('\ngzipped, the UMD build is %s', prettyBytes(size))
