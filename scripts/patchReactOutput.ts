/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const filename = './out/react.ts'

fs.readFile(filename, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  const result = data
    .replace(
      "import type { JSX } from '../dist/components'",
      "import type { JSX } from '../dist/types/components'"
    )
    .replace(
      "import { defineCustomElements } from '../dist/components/dist/loader/index.js';",
      "import { defineCustomElements } from '../dist/loader/index.es2017.js';"
    )

  fs.writeFile(filename, result, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})
