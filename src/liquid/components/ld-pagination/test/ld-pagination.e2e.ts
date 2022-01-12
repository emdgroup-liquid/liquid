import { getPageWithContent } from '../../../utils/e2e-tests'

jest.useRealTimers()

const svg = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
</svg>
`

describe('ld-pagination', () => {
  it('renders with name prop', async () => {
    const page = await getPageWithContent(
      '<ld-pagination name="add"></ld-pagination>'
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('does not render with invalid name prop', async () => {
    const page = await getPageWithContent(
      '<ld-pagination name="asdfasdfasdf"></ld-pagination>'
    )

    const element = await page.find('ld-pagination')
    expect(element).toHaveClass('hydrated')

    const svg = await element.find('svg')
    expect(svg).toBeNull()
  })

  it('renders with slot', async () => {
    const page = await getPageWithContent(
      `<ld-pagination>${svg}</ld-pagination>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('replaces existing pagination on pagination name change', async () => {
    const page = await getPageWithContent(
      `<ld-pagination name="add"></ld-pagination>`
    )
    const ldPagination = await page.find('ld-pagination')
    expect(ldPagination).toHaveClasses(['hydrated'])

    ldPagination.setProperty('name', 'matryoshka')
    await page.waitForChanges()

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('sizes', () => {
    it('sm', async () => {
      const page = await getPageWithContent(
        '<ld-pagination name="add" size="sm"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('lg', async () => {
      const page = await getPageWithContent(
        '<ld-pagination name="add" size="lg"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('sm with custom svg', async () => {
      const page = await getPageWithContent(
        `<ld-pagination size="sm">${svg}</ld-pagination>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('lg with custom svg', async () => {
      const page = await getPageWithContent(
        `<ld-pagination size="lg">${svg}</ld-pagination>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('color', () => {
    it('web component', async () => {
      const page = await getPageWithContent(
        '<ld-pagination name="placeholder" style="color: var(--ld-col-vc)"></ld-pagination>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('css component', async () => {
      const page = await getPageWithContent(
        `<span style="color: var(--ld-col-vg)">
          <ld-pagination name="placeholder"></ld-pagination>
        </span>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
