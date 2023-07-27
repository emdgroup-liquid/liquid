/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFile } = require('fs').promises

type FigmaNode = {
  characters?: string
  id: string
  name: string
  type: string
  children?: FigmaNode[]
}

type FigmaFileResponseBody = {
  nodes: {
    document: FigmaNode
  }[]
}

type FigmaImageResponseBody = {
  err: unknown
  images?: Record<string, string>
}

type Icon = { id: string; name: string }

const iconFileNames: string[] = []

const iconsFilter =
  process.env.FIGMA_ICONS_FILTER && process.env.FIGMA_ICONS_FILTER !== ''
    ? process.env.FIGMA_ICONS_FILTER.split(',')
    : []

async function getIconCollectionFromFigma(
  figmaFileId = '8GYcAOePm8Tt9qqJ7Gnv99',
  figmaNodeIds = '660:23252,640:37311'
) {
  const response = await fetch(
    `https://api.figma.com/v1/files/${figmaFileId}/nodes?ids=${figmaNodeIds}`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': process.env.FIGMA_API_KEY,
      },
    }
  )

  const { nodes }: FigmaFileResponseBody = await response.json()

  const icons: Icon[] = []

  Object.values(nodes).forEach(({ document }) => {
    document.children?.forEach(({ type, children }) => {
      if (type === 'GROUP') {
        const { id } =
          children?.find((groupChild) => groupChild.type === 'INSTANCE') ?? {}
        const { characters } =
          children?.find((groupChild) => groupChild.type === 'TEXT') ?? {}

        if (id && characters) {
          icons.push({
            id,
            name: characters.replace(/\n/g, ' ').replace(/\s\s/g, ' '),
          })
        }
      }
    })
  })

  if (iconsFilter.length) {
    console.log('Icons filter applied!')
    return icons.filter(({ name }) => iconsFilter.includes(name))
  }

  return icons
}

const getSingleIcon = async (name: string, url: string) => {
  if (!url) {
    console.warn(`No download URL for  "${name}" found. Skipping.`)
    return
  }

  const unifiedName = name
    .trim()
    .toLocaleLowerCase()
    .replace(/[^0-9a-zA-Z]/g, '-')
    .replace(/--/g, '-')

  if (iconFileNames.includes(unifiedName)) {
    console.warn(`Duplicate icon name "${unifiedName}" detected! Skipping.`)
    return
  }

  const iconResponse = await fetch(url)

  if (!iconResponse.ok) {
    throw new Error('Error downloading icon.')
  }

  const icon = await iconResponse.text()

  if (!icon) {
    console.warn(`Icon ${name} has no content. Skipping.`)
    return
  }

  await writeFile(
    `./src/liquid/components/ld-icon/assets/${unifiedName}.svg`,
    icon
      .replace(/\sfill="#[^"]*"/g, ' fill="currentcolor"')
      .replace(/\sstroke="#[^"]*"/g, ' stroke="currentcolor"')
  )
  iconFileNames.push(unifiedName)
  console.log(`${unifiedName}.svg successfully written.`)
}

const downloadIcons = async (icons: Icon[], images: Record<string, string>) => {
  await Promise.all(
    icons.map(async ({ name, id }) => {
      try {
        await exponentialBackoff(() => getSingleIcon(name, images[id]))
      } catch (error) {
        console.log(`Error downloading ${name} icon with node ID ${id}.`, error)
      }
    })
  )
}

const loadAndWriteIcons = async (icons: Icon[]) => {
  const response = await fetch(
    `https://api.figma.com/v1/images/${
      process.env.FIGMA_ICONS_FILE_ID
    }?ids=${icons.map(({ id }) => id).join(',')}&format=svg`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': process.env.FIGMA_API_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Error requesting icons from Figma: ${await response.text()}`
    )
  }

  const { err, images }: FigmaImageResponseBody = await response.json()

  if (err) {
    throw new Error(`Invalid image response data from Figma: ${err}`)
  }

  return downloadIcons(icons, images)
}

// Increase retries or base, if you run into rate limit exceptions
const exponentialBackoff = async (fn, depth = 1, retries = 7, base = 2) => {
  try {
    return await fn()
  } catch (error) {
    if (depth > retries) {
      throw error
    }
    await new Promise((res) => setTimeout(res, base ** depth * 10))

    return exponentialBackoff(fn, depth + 1)
  }
}

;(async () => {
  try {
    const iconsCollection = await getIconCollectionFromFigma()
    console.log(`Found ${iconsCollection.length} icons. Downloading...`)
    await loadAndWriteIcons(iconsCollection)

    // ANSI escape codes for text colors
    const textColor = {
      reset: '\x1b[0m',
      yellow: '\x1b[33m',
    }

    console.warn(
      [
        textColor.yellow,
        '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️',
        'Please update hard coded version in src/liquid/utils/assetPath.ts for CND url.',
        '⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️' +
          textColor.reset,
      ].join('\n')
    )
  } catch (error) {
    console.error('error', error)
  }
})()
