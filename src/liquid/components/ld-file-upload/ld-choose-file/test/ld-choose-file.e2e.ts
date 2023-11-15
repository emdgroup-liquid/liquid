import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../../utils/e2e-tests'

describe('ld-choose-file', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(`<ld-choose-file />`)

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(`<ld-choose-file />`)
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
