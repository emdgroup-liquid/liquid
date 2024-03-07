import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdFileUpload } from '../ld-file-upload'

describe('ld-file-upload', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(`<ld-file-upload />`)

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<div class="ld-file-upload"></div>`,
      {
        components: [LdFileUpload],
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(`<ld-file-upload />`)
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-file-upload">
            </div>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
