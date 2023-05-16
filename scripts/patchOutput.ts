/* eslint-disable @typescript-eslint/no-var-requires */
const { readFile, writeFile } = require('fs').promises
const outputTarget = process.argv[2]

;(async () => {
  const data = await readFile(`./out/${outputTarget}.ts`, 'utf8')

  const defineIncluded = data
    .replace(
      "import type { JSX } from '../dist/components'",
      "import type { JSX } from '../dist/types/components'"
    )
    .replace(
      "import { defineCustomElements } from '../dist/components/dist/loader/index.js';",
      "import { defineCustomElements } from '../dist/loader/index.es2017.js';"
    )

  const defineExcluded = data
    .replace(
      "import type { JSX } from '../dist/components'",
      "import type { JSX } from '../dist/types/components'"
    )
    .split('\n')
    .filter((line) => !line.includes('defineCustomElements'))
    .join('\n')

  await Promise.all([
    writeFile(`./out/${outputTarget}.ts`, defineIncluded, 'utf8'),
    writeFile(
      `./out/${outputTarget}-define-excluded.ts`,
      defineExcluded,
      'utf8'
    ),
  ])
})()
