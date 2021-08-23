import { getAssetPath } from '@stencil/core'

const iconCache = {}
const requestCache = {}

export async function fetchIcon(icon: string): Promise<string> {
  if (iconCache[icon]) {
    return iconCache[icon]
  }
  if (!requestCache[icon]) {
    requestCache[icon] = fetch(getAssetPath(`./assets/${icon}.svg`))
      .then((resp) => resp.text())
      .catch((err) => {
        console.error(`"${icon}" is not a valid name`, err)
        return ''
      })
  }

  const path = await requestCache[icon]
  iconCache[icon] = path

  return path
}
