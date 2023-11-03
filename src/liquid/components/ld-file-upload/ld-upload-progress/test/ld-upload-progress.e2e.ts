import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../../utils/e2e-tests'
import { LdUploadProgress } from '../ld-upload-progress'

describe('ld-upload-progress', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(`<ld-upload-progress />`)

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<div class="ld-upload-progress"></div>`,
      {
        components: [LdUploadProgress],
      }
    )

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

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-upload-progress">
                </div>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
