import { newE2EPage } from '@stencil/core/testing'

jest.useRealTimers()

describe('ld-sr-live', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<ld-sr-live />')

    const element = await page.find('ld-sr-live')
    expect(element).toHaveClass('hydrated')

    const isNotVisible = await page.$eval('ld-sr-live', (elem) => {
      const { height, width } = elem.getBoundingClientRect()
      return height + width === 0
    })
    expect(isNotVisible).toBe(true)
  })
})
