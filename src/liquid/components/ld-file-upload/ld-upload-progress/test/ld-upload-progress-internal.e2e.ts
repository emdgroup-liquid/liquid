import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../../utils/e2e-tests'

describe('ld-upload-progress', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(`<ld-upload-progress />`)

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(`<ld-upload-progress />`)
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
