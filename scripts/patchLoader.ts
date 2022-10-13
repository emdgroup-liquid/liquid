/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const packageJSON = require('../dist/loader/package.json')
const patchedPackageJSON = { ...packageJSON, main: './index.js' }
fs.writeFileSync(
  './dist/loader/package.json',
  JSON.stringify(patchedPackageJSON, null, 2)
)
