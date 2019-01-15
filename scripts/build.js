// @flow weak
/* eslint no-console: "off" */

const execSync = require('child_process').execSync

console.log('Building CJS modules...')
execSync(
  'babel src -d build --config-file ./scripts/babel/cjs.js --ignore "src/**/*.spec.js"',
)

console.log('Building ESM modules...')
execSync(
  'babel src -d build/es --config-file ./scripts/babel/esm.js --ignore "src/**/*.spec.js"',
)

// console.log('Building UMD files...')
// execSync('rollup -c')
