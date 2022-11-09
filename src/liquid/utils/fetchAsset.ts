import { getAssetPath } from './assetPath'

const assetCache = {}
const requestCache = {}

export async function fetchPattern(patternName: string): Promise<string> {
  return await fetchAsset(`${patternName}-cell.svg`)
}

export async function fetchIcon(iconName: string): Promise<string> {
  return await fetchAsset(`${iconName}.svg`)
}

export async function fetchAsset(path: string): Promise<string> {
  if (assetCache[path]) {
    return assetCache[path]
  }

  if (!requestCache[path]) {
    requestCache[path] = fetch(`${getAssetPath('./assets')}/${path}`)
      .then((resp) => resp.text())
      .catch((err) => {
        console.error(`"${path}" could not be fetched`, err)
        return ''
      })
  }

  const content = await requestCache[path]
  assetCache[path] = content

  return content
}
