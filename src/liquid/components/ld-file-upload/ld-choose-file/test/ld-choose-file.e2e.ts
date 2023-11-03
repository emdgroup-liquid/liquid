import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../../utils/e2e-tests'
import { LdChooseFile } from '../ld-choose-file'

describe('ld-choose-file', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(`<ld-choose-file />`)

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<div class="ld-choose-file"></div>`,
      {
        components: [LdChooseFile],
      }
    )

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

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-choose-file">
              </div>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
