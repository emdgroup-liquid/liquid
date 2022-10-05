import { getClassNames } from '../getClassNames'

describe('getClassNames', () => {
  it('returns a string from an array of classes', async () => {
    const returnValue = getClassNames(['a b', 'c'])
    expect(returnValue).toBe('a b c')
  })

  it('ignores falsy values', async () => {
    const returnValue = getClassNames([
      'a b',
      undefined,
      false,
      null,
      0,
      '',
      'c',
    ])
    expect(returnValue).toBe('a b c')
  })

  it('returns empty string, if array is empty', async () => {
    const returnValue = getClassNames([])
    expect(returnValue).toBe('')
  })
})
