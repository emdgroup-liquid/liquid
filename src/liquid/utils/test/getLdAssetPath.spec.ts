/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getLdAssetPath } from '../getLdAssetPath'

describe('getLdAssetPath', () => {
  afterEach(() => {
    delete window.__LD_ASSET_PATH__
  })

  it('returns asset path from liquid function', async () => {
    const returnValue = getLdAssetPath('test')
    expect(returnValue).toBe('/test')
  })

  it('returns asset path from window constant, if set', async () => {
    // @ts-ignore
    window.__LD_ASSET_PATH__ = 'ld/asset/path/'
    const returnValue = getLdAssetPath('test')
    expect(returnValue).toBe('ld/asset/path/test')
  })

  it('evaluates relative paths', async () => {
    // @ts-ignore
    window.__LD_ASSET_PATH__ = 'ld/asset/path/'
    const returnValue = getLdAssetPath('./test')
    expect(returnValue).toBe('ld/asset/path/test')
  })

  it('ignores trailing slashes', async () => {
    // @ts-ignore
    window.__LD_ASSET_PATH__ = 'ld/asset/path/'
    const returnValue = getLdAssetPath('/test')
    expect(returnValue).toBe('ld/asset/path/test')
  })

  it('adds a trailing slash after the base path', async () => {
    // @ts-ignore
    window.__LD_ASSET_PATH__ = 'ld/asset/path'
    const returnValue = getLdAssetPath('test')
    expect(returnValue).toBe('ld/asset/path/test')
  })
})
