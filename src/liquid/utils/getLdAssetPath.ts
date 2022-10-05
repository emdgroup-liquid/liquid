import { getAssetPath } from '@stencil/core'

/**
 * Reads asset path config from a global variable, if available,
 * and uses this instead of Stencil's getAssetPath function.
 *
 * This is a workaround until the following issue is resolved:
 * https://github.com/ionic-team/stencil-ds-output-targets/issues/186
 */
export const getLdAssetPath = (path: string) => {
  if (typeof window !== 'undefined' && window.__LD_ASSET_PATH__) {
    let finalPath = path

    if (path.startsWith('./')) {
      finalPath = path.substring(2)
    } else if (path.startsWith('/')) {
      finalPath = path.substring(1)
    }

    if (!window.__LD_ASSET_PATH__.endsWith('/')) {
      finalPath = '/' + finalPath
    }

    return window.__LD_ASSET_PATH__ + finalPath
  }

  return getAssetPath(path)
}
