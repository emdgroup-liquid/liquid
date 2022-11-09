/**
 * Reads components asset path config from meta tag or global variable.
 * This is a workaround until the following issues are resolved:
 * https://github.com/ionic-team/stencil/issues/3470
 * https://github.com/ionic-team/stencil-ds-output-targets/issues/186
 */
export const getAssetPath = (path: string) => {
  const assetBasePath =
    document.head.querySelector<HTMLMetaElement>('meta[data-ld-asset-path]')
      ?.dataset.ldAssetPath ||
    window.__LD_ASSET_PATH__ ||
    '/'
  let assetPath = path

  if (path.startsWith('./')) {
    assetPath = path.substring(2)
  }

  if (!assetBasePath.endsWith('/')) {
    assetPath = '/' + assetPath
  }

  return assetBasePath + assetPath
}
