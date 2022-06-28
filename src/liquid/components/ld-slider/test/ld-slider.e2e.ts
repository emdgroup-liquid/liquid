import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'

const attributeMap = {
  default: '',
  disabled: ' disabled',
  negative: ' negative',
  'aria-disabled indicators step': ' aria-disabled="true" indicators step="10"',
  'aria-disabled indicators stops':
    ' aria-disabled="true" indicators stops="20,50,75"',
  'aria-disabled negative': ' aria-disabled="true" negative',
  'aria-disabled': ' aria-disabled="true"',
  'custom width': ' width="450px"',
  'custom width indicators step': ' step="10" width="450px"',
  'custom width indicators stops': ' stops="20,50,75" width="450px"',
  'disabled indicators step': ' disabled indicators step="10"',
  'disabled indicators stops': ' disabled indicators stops="20,50,75"',
  'disabled negative': ' disabled negative',
  'indicators step': ' indicators step="10"',
  'indicators stops': ' indicators stops="20,50,75"',
}

// It's important to set the initial value(s) in a way that they always
// match the attributes, because otherwise value correction applies and
// states (hover, etc.) may not work properly.
describe('ld-slider', () => {
  Object.entries(attributeMap).forEach(([description, attributes]) => {
    describe(description, () => {
      it('single value', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('min value', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="0"></ld-slider>`
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('max value', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="100"></ld-slider>`
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('multiple values', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="20,50"></ld-slider>`
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('hover', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
          { reducedMotion: true }
        )

        const input = await page.find('ld-slider >>> input')
        await input.hover()

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('focus', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
          { reducedMotion: true }
        )

        await page.keyboard.press('Tab')

        const results = await page.compareScreenshot()
        const accessibilityReport = await analyzeAccessibility(page)

        expect(results).toMatchScreenshot()
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('active', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
          { reducedMotion: true }
        )

        const input = await page.find('ld-slider >>> input')
        await input.hover()
        await page.mouse.down()

        const results = await page.compareScreenshot()
        const accessibilityReport = await analyzeAccessibility(page)

        expect(results).toMatchScreenshot()
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('values always visible', async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} always-show-values value="20,50"></ld-slider>`
        )

        const results = await page.compareScreenshot()
        const accessibilityReport = await analyzeAccessibility(page)

        expect(results).toMatchScreenshot()
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })
    })
  })
})
