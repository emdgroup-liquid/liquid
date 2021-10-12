import { promises as fs } from 'fs'
import glob from 'glob'
import yargs, { Arguments } from 'yargs'

async function deleteScreenshots(components?: string[]) {
  const master = JSON.parse(
    await fs.readFile('screenshot/builds/master.json', {
      encoding: 'utf8',
    })
  )

  // Remove component references from master file.
  if (components?.length) {
    const updatedScreenshots = master.screenshots.filter(
      (screenshot) =>
        !new RegExp(`.*(${components.join('|')})\\.e2e\\.ts$`, 'g').test(
          screenshot.testPath
        )
    )
    const masterNeedsUpdate =
      updatedScreenshots.length !== master.screenshots.length
    if (masterNeedsUpdate) {
      master.screenshots = updatedScreenshots
      await fs.writeFile(
        'screenshot/builds/master.json',
        JSON.stringify(master, undefined, 2),
        { encoding: 'utf8', flag: 'w' }
      )
      console.info('Updated screenshot/builds/master.json')
    }
  }

  // Delete all screenshots without reference.
  const { screenshots } = master
  const referencedFileNames = screenshots.map((screenshot) => screenshot.image)

  const filePaths = glob.sync('screenshot/images/*.png')

  const toDelete = []
  for (const filePath of filePaths) {
    const fileName = filePath.split('/')[2]
    if (
      !referencedFileNames.find(
        (referencedFileName) => referencedFileName === fileName
      )
    ) {
      toDelete.push(fs.unlink(filePath))
      console.info('Deleting', filePath)
    }
  }
  await Promise.all(toDelete)
  console.info(`Deleted ${toDelete.length} screenshots.`)
}

yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command(
    'rm',
    'delete screenshots',
    (yargs) => {
      yargs
        .example(
          '$0 rm --components ld-button ld-select',
          'Deletes all obsolete screenshots as well as all screenshots created with e2e tests for ld-button and ld-select.'
        )
        .alias('c', 'components')
        .array(['components'])
        .help('h')
        .alias('h', 'help')
    },
    async (
      argv: Arguments<{
        components?: string[]
      }>
    ) => {
      await deleteScreenshots(argv.components)
    }
  )
  .demandCommand()
  .help('h')
  .alias('h', 'help').argv
