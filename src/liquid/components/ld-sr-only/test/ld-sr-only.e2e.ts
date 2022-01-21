import { getPageWithContent } from '../../../utils/e2e-tests'

describe('ld-sr-only', () => {
  it('renders', async () => {
    const page = await getPageWithContent(
      '<ld-sr-only>Hello screen reader</ld-sr-only>'
    )

    const element = await page.find('ld-sr-only')
    expect(element).toHaveClass('hydrated')

    const isNotVisible = await page.$eval('ld-sr-only', (elem) => {
      return (
        window.getComputedStyle(elem).getPropertyValue('clip') ===
        'rect(0px, 0px, 0px, 0px)'
      )
    })
    expect(isNotVisible).toBe(true)
  })
})
