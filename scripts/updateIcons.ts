import fetch from 'node-fetch'
import { promises } from 'fs'

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

const { writeFile } = promises
const iconFileNames: string[] = []

const iconsFilter =
  process.env.FIGMA_ICONS_FILTER && process.env.FIGMA_ICONS_FILTER !== ''
    ? process.env.FIGMA_ICONS_FILTER.split(',')
    : []

async function getIconCollectionFromFigma() {
  const response = await fetch(
    `https://api.figma.com/v1/files/${process.env.FIGMA_ICONS_FILE_ID}/nodes?ids=${process.env.FIGMA_ICONS_NODE_IDS}`,
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

const getIconFromFigma = async (nodeId) => {
  const response = await fetch(
    `https://api.figma.com/v1/images/${process.env.FIGMA_ICONS_FILE_ID}?ids=${nodeId}&format=svg`,
    {
      method: 'GET',
      headers: {
        'X-Figma-Token': process.env.FIGMA_API_KEY,
      },
    }
  )

  if (!response.ok) {
    throw new Error(
      `Error requesting icon from Figma: ${await response.text()}`
    )
  }

  const { err, images }: FigmaImageResponseBody = await response.json()
  const imageUrl = images && images[nodeId]

  if (err === null && imageUrl) {
    const iconResponse = await fetch(imageUrl)

    if (iconResponse.ok) {
      return iconResponse.text()
    } else {
      throw new Error('Error downloading icon.')
    }
  } else {
    throw new Error(`Invalid image response data from Figma: ${err}`)
  }
}

// Increase retries or base, if you run into rate limit exceptions
const exponentialBackoff = async (fn, depth = 1, retries = 9, base = 2) => {
  try {
    return await fn()
  } catch (e) {
    if (depth > retries) {
      throw e
    }
    await new Promise((res) => setTimeout(res, base ** depth * 10))

    return exponentialBackoff(fn, depth + 1)
  }
}

const loadAndWriteIcon = async ({ id, name }) => {
  const unifiedName = name
    .trim()
    .toLocaleLowerCase()
    .replace(/[^0-9a-zA-Z]/g, '-')
    .replace(/--/g, '-')

  if (iconFileNames.includes(unifiedName)) {
    console.warn(`Duplicate icon name "${unifiedName}" detected! Skipping.`)
    return
  }

  try {
    const icon = await exponentialBackoff(() => getIconFromFigma(id))

    if (icon) {
      await writeFile(
        `./src/liquid/components/ld-icon/assets/${unifiedName}.svg`,
        icon
          .replace(/\sfill="#[^"]*"/g, ' fill="currentcolor"')
          .replace(/\sstroke="#[^"]*"/g, ' stroke="currentcolor"')
      )
      iconFileNames.push(unifiedName)
      console.log(`${unifiedName}.svg successfully written.`)
    }
  } catch (error) {
    console.log(`Error downloading ${name} icon with node ID ${id}.`, error)
  }
}

const generateIconFiles = async (icons: Icon[], chunk = 10) => {
  let i: number
  let j: number
  for (i = 0, j = icons.length; i < j; i += chunk) {
    const iconsChunk = icons.slice(i, i + chunk)

    await Promise.all(iconsChunk.map(loadAndWriteIcon))
  }
}

;(async () => {
  try {
    const iconsCollection = await getIconCollectionFromFigma()
    console.log(`Found ${iconsCollection.length} icons. Downloading...`)
    await generateIconFiles(iconsCollection)
  } catch (err) {
    console.error('error', err)
  }
})()
