import { getAssetPath } from '@stencil/core'

const iconCache = {}
const requestCache = {}

export async function fetchIcon(
  icon: string,
  filled: boolean
): Promise<string> {
  const cacheKey = `${filled ? 'filled' : 'stroke'}_${icon}`
  if (iconCache[cacheKey]) {
    return iconCache[cacheKey]
  }
  if (!requestCache[cacheKey]) {
    requestCache[cacheKey] = fetch(
      getAssetPath(`./assets/${filled ? 'filled' : 'stroke'}/${icon}.svg`)
    )
      .then((resp) => resp.text())
      .catch((err) => {
        console.error('err', err)
        console.error(`"${icon}" is not a valid name`)
        return ''
      })
  }

  const path = await requestCache[cacheKey]
  iconCache[cacheKey] = path

  return path
}
