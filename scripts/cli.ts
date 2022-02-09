#! /usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve, join } = require('path')
const {
  appendFileSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} = require('fs')
const { readdir, unlink } = require('fs').promises
const applyDesignTokens = require('./applyDesignTokens')

const args = process.argv.slice(2)

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirents) => {
      const res = resolve(dir, dirents.name)
      return dirents.isDirectory() ? getFiles(res) : res
    })
  )
  return files.flat()
}

async function applyTokens(options: {
  figmaFileURL: string
  outputPath: string
}) {
  // 1. Create temporary directory.
  const tmpDir = './liquid_tmp'
  if (!existsSync(tmpDir)) {
    mkdirSync(tmpDir, { recursive: true })
    writeFileSync(join(tmpDir, '.gitignore'), '*', 'utf8')
  }

  // 2. Fetch design tokens, update CSS and create token file
  //    inside temp directory.
  await applyDesignTokens(options.figmaFileURL)

  // 3. Concatenate all CSS files to a liquid.globals.css file.
  //    Put the file either into a given output directory or
  //    the current working directory.
  const globalsCSSPath = join(options.outputPath, './liquid.globals.css')
  if (existsSync(globalsCSSPath)) {
    await unlink(globalsCSSPath)
  }
  ;(await getFiles(tmpDir)).forEach((file: string) => {
    if (file.endsWith('.css')) {
      appendFileSync(globalsCSSPath, readFileSync(file).toString())
    }
  })

  // 4. Copy the design-tokens.json file into the current working directory.
  //    The tailwindPreset.js module will look for the file in that directory.
  copyFileSync(
    join(tmpDir, './styles/design-tokens.json'),
    join(process.cwd(), './design-tokens.json')
  )

  // 5. Remove temporary directory.
  if (existsSync(tmpDir)) {
    try {
      rmSync(tmpDir, { recursive: true })
    } catch (err) {
      console.error('err', err)
    }
  }
}

;(async () => {
  if (args.includes('apply-design-tokens')) {
    let outputPath
    const argIndexOutputPath = args.findIndex((arg) =>
      ['-p', '--path'].includes(arg)
    )
    if (argIndexOutputPath !== -1) {
      outputPath = args[argIndexOutputPath + 1]
      if (!outputPath) {
        throw new Error(
          'apply-design-tokens requires an output path value following right after the path parameter (--path or -p)'
        )
      }
      console.log(
        `Using output path from command line parameter: ${outputPath}`
      )

      if (!existsSync(outputPath)) {
        mkdirSync(outputPath, { recursive: true })
      }
    } else {
      outputPath = process.cwd()
      console.log(
        `Using current working directory as output path: ${outputPath}`
      )
    }

    let figmaFileURL = process.env.FIGMA_FILE_URL
    if (figmaFileURL) {
      console.log(
        `Using Figma file URL from env variable FIGMA_FILE_URL: ${figmaFileURL}`
      )
    } else {
      const argIndexFigmaFile = args.findIndex((arg) =>
        ['-ff', '--figma-file'].includes(arg)
      )
      if (argIndexFigmaFile === -1) {
        throw new Error(
          'apply-design-tokens requires a Figma file URL parameter indicated with --figma-file or -ff or the FIGMA_FILE_URL env variable.'
        )
      }

      figmaFileURL = args[argIndexFigmaFile + 1]
      if (!figmaFileURL) {
        throw new Error(
          'apply-design-tokens requires a Figma file URL value following right after the Figma file URL parameter (--figma-file or -ff).'
        )
      }

      console.log(
        `Using Figma file URL from command line parameter: ${figmaFileURL}`
      )
    }

    const figmaAPIKey = process.env.FIGMA_API_KEY
    if (figmaAPIKey) {
      console.log(
        `Using Figma API key from env variable FIGMA_API_KEY: ${figmaAPIKey.substr(
          0,
          3
        )}${new Array(figmaAPIKey.length - 3).fill('•').join('')}`
      )
    } else {
      throw new Error(
        'A Figma API key must be provided via the env variable FIGMA_API_KEY.'
      )
    }

    await applyTokens({
      figmaFileURL,
      outputPath,
    })
  }
})()
