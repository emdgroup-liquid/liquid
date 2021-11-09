import { getPageWithContent } from '../../../utils/e2e-tests'

jest.useRealTimers()

const svg = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
</svg>
`

describe('ld-icon', () => {
  it('renders with name prop', async () => {
    const page = await getPageWithContent('<ld-icon name="add"></ld-icon>')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('does not render with invalid name prop', async () => {
    const page = await getPageWithContent(
      '<ld-icon name="asdfasdfasdf"></ld-icon>'
    )

    const element = await page.find('ld-icon')
    expect(element).toHaveClass('hydrated')

    const svg = await element.find('svg')
    expect(svg).toBeNull()
  })

  it('renders with slot', async () => {
    const page = await getPageWithContent(`<ld-icon>${svg}</ld-icon>`)
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('sizes', () => {
    it('sm', async () => {
      const page = await getPageWithContent(
        '<ld-icon name="add" size="sm"></ld-icon>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('lg', async () => {
      const page = await getPageWithContent(
        '<ld-icon name="add" size="lg"></ld-icon>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('sm with custom svg', async () => {
      const page = await getPageWithContent(
        `<ld-icon size="sm">${svg}</ld-icon>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('lg with custom svg', async () => {
      const page = await getPageWithContent(
        `<ld-icon size="lg">${svg}</ld-icon>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
