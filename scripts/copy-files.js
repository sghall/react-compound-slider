// @flow weak
/* eslint-disable no-console */

import path from 'path'
import fse from 'fs-extra'

function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file))
  return new Promise(resolve => {
    fse.copy(file, buildPath, err => {
      if (err) {
        throw err
      }
      resolve()
    })
  }).then(() => console.log(`Copied ${file} to ${buildPath}`))
}

function copyTypes(src, dst) {
  const buildPath = path.resolve(__dirname, '../build/', dst)
  return new Promise(resolve => {
    fse.copy(src, buildPath, err => {
      if (err) {
        throw err
      }
      resolve()
    })
  }).then(() => console.log(`Copied ${src} to ${buildPath}`))
}

function createPackageFile() {
  return new Promise(resolve => {
    fse.readFile(
      path.resolve(__dirname, '../package.json'),
      'utf8',
      (err, data) => {
        if (err) {
          throw err
        }

        resolve(data)
      },
    )
  })
    .then(data => JSON.parse(data))
    .then(packageData => {
      const {
        author,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      } = packageData

      const minimalPackage = {
        name: 'react-compound-slider',
        author,
        version,
        description,
        main: 'index.js',
        module: 'es/index.js',
        'jsnext:main': 'es/index.js',
        types: 'index.d.ts',
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
      }

      return new Promise(resolve => {
        const buildPath = path.resolve(__dirname, '../build/package.json')
        const data = JSON.stringify(minimalPackage, null, 2)
        fse.writeFile(buildPath, data, err => {
          if (err) {
            throw err
          }
          console.log(`\nCreated package.json in ${buildPath}\n`)
          resolve()
        })
      })
    })
}

const files = ['README.md', 'LICENSE']

const types = [
  ['src/index.d.ts', 'index.d.ts'],
  ['src/Slider/index.d.ts', 'Slider/index.d.ts'],
  ['src/Slider/Slider.d.ts', 'Slider/Slider.d.ts'],
  ['src/Rail/index.d.ts', 'Rail/index.d.ts'],
  ['src/Rail/Rail.d.ts', 'Rail/Rail.d.ts'],
  ['src/Handles/index.d.ts', 'Handles/index.d.ts'],
  ['src/Handles/Handles.d.ts', 'Handles/Handles.d.ts'],
  ['src/Tracks/index.d.ts', 'Tracks/index.d.ts'],
  ['src/Tracks/Tracks.d.ts', 'Tracks/Tracks.d.ts'],
  ['src/Ticks/index.d.ts', 'Ticks/index.d.ts'],
  ['src/Ticks/Ticks.d.ts', 'Ticks/Ticks.d.ts'],
]

Promise.all(files.map(file => copyFile(file)))
  .then(() => Promise.all(types.map(file => copyTypes(...file))))
  .then(() => createPackageFile())
