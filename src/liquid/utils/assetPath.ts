import { Build } from '@stencil/core'
import { version } from '../../../package.json'

let missingAssetPathWarningDisplayed = false

/**
 * Reads components asset path config from meta tag or global variable.
 * This is a workaround until the following issues are resolved:
 * https://github.com/ionic-team/stencil/issues/3470
 * https://github.com/ionic-team/stencil-ds-output-targets/issues/186
 */
export const getAssetPath = (path: string) => {
  // Get asset path from meta tag if available
  const metaLdAssetPath = document.head.querySelector<HTMLMetaElement>(
    'meta[data-ld-asset-path]'
  )?.dataset.ldAssetPath
  // Get asset path from window if available
  const windowLdAssetPath = window.__LD_ASSET_PATH__
  // Uses CDN as fallback if no asset path is set
  const cdnAssetPath = `https://cdn.jsdelivr.net/npm/@emdgroup-liquid/liquid${
    version ? '@' + version : ''
  }/dist/liquid/`

  const assetBasePath = Build.isTesting
    ? '/dist/liquid'
    : metaLdAssetPath || windowLdAssetPath || cdnAssetPath || '/'

  // Display warning if assets are fetched from CDN. This is only displayed once.
  if (
    assetBasePath.startsWith('https://cdn.jsdelivr.net/npm/') &&
    !missingAssetPathWarningDisplayed
  ) {
    missingAssetPathWarningDisplayed = true
    console.warn(
      `Fetching Liquid Oxygen assets from jsDelivr CDN.\n\nWe recommend bundling Liquid Oxygen assets with your application and setting the asset path accordingly.\n\nFor more information see the documentation:\nhttps://liquid.merck.design/liquid/guides/component-assets/`
    )
  }

  let assetPath = path

  if (path.startsWith('./')) {
    assetPath = path.substring(2)
  }

  if (!assetBasePath.endsWith('/')) {
    assetPath = '/' + assetPath
  }

  return assetBasePath + assetPath
}
