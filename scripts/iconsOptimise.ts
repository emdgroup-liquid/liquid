/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require('glob')
const path = require('path')
const { optimize } = require('svgo')
const { readFile, writeFile } = require('fs').promises

const svgoConfig = [
  { name: 'removeViewBox', active: false },
  { name: 'removeDimensions', active: true },
  { name: 'removeXMLNS', active: false },
  {
    name: 'convertPathData',
    params: {
      floatPrecision: 4,
    },
  },
  {
    name: 'cleanupIDs',
    params: {
      prefix: {
        // https://github.com/svg/svgo/issues/674#issuecomment-328774019
        toString() {
          this.counter = this.counter || 0
          return `ld-icon-${this.counter++}`
        },
      },
    },
  },
]

const optimiseFile = async (fileName) => {
  const filePath = path.resolve(__dirname, '..', fileName)
  const contents = await readFile(filePath, 'utf8')
  const optimised = await optimize(contents, {
    path: filePath,
    plugins: svgoConfig,
  })
  await writeFile(filePath, optimised.data, 'utf8').then(() => {
    console.log(`optimised ${fileName}`)
  })
}

glob('src/liquid/components/ld-icon/assets/*.svg', {}, (err, files) => {
  if (err) {
    throw err
  }
  Promise.all(files.map((fileName) => optimiseFile(fileName))).catch((err) => {
    throw err
  })
})
