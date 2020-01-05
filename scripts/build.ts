import * as fs from 'fs-extra';
import bb from 'bluebird';
import chalk from 'chalk';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());

const resolved = function(relativePath: string) {
  return path.resolve(appDirectory, relativePath);
};

export const dist = resolved('dist');
export const cache = resolved('node_modules/.cache/.rcs');

const progress = require('progress-estimator');
const exec: (cmd: string) => void = require('child_process').exec;

const asyncExec = bb.promisify(exec);

function getEntry() {
  const prefix = `module.exports = require('./rcs`;

  return `'use strict'

if (process.env.NODE_ENV === 'production') {
  ${prefix}.cjs.production.min.js')
} else {
  ${prefix}.cjs.development.js')
}
`;
}

function writeEntryFile() {
  const contents = getEntry();
  return fs.writeFile(path.join(dist, 'index.js'), contents);
}

const logger = progress({
  storagePath: cache,
});

async function run() {
  await fs.ensureDir(cache);

  const ensureDist = fs.ensureDir(dist);
  await logger(ensureDist, 'create dist...', { estimate: 5 });

  const writeEntry = writeEntryFile();
  await logger(writeEntry, 'create index...', { estimate: 5 });

  const buildFiles = asyncExec('rollup -c');
  await logger(buildFiles, 'build files...', { estimate: 8000 });

  const genTypes = asyncExec('tsc --outDir dist/types --emitDeclarationOnly');
  await logger(genTypes, 'generate types...', { estimate: 10000 });

  console.log(chalk.green('\nSuccess.\n'));
}

run();
