import {
  getPageWithContent,
  analyzeAccessibility,
} from '../../../utils/e2e-tests'
import { LdInput } from '../ld-input'

const tones = [undefined, 'dark']

const cssIconComponent = `
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
`

describe('ld-input', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    const toneAttr = tone ? ` tone="${tone}"` : ''
    // Web Component
    it(`default${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it(`with value${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} value="Value"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it(`hover${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      await page.hover('ld-input')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it(`focus${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    // Disabled Web Component
    it(`disabled${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} disabled placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it(`disabled with value${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} disabled value="Value"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it(`disabled hover${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} disabled placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      await page.hover('ld-input')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`disabled focus${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} disabled placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Aria-disabled Web Component
    it(`aria-disabled${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} aria-disabled="true" placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it(`aria-disabled with value${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} aria-disabled="true" value="Value"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`aria-disabled hover${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} aria-disabled="true" placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      await page.hover('ld-input')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`aria-disabled focus${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-input${toneAttr} aria-disabled="true" placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component
    const toneModifier = tone ? ` ld-input--${tone}` : ''
    it(`css component default${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}"><input placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with value${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}"><input value="Value"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component hover${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}"><input placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      await page.hover('.ld-input')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component focus${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}"><input placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Disabled CSS component
    it(`css component disabled${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" disabled><input disabled placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component disabled with value${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" disabled><input disabled value="Value"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component disabled hover${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" disabled><input disabled placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      await page.hover('.ld-input')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component disabled focus${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" disabled><input disabled placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Aria-disabled CSS component
    it(`css component aria-disabled${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component aria-disabled with value${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" value="Value"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component aria-disabled hover${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      await page.hover('.ld-input')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component aria-disabled focus${toneStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" placeholder="Placeholder"></input>${cssIconComponent}</div>`,
        { components: LdInput }
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  }

  describe('multiline', () => {
    it('web component', async () => {
      const page = await getPageWithContent(
        `<ld-input placeholder="Placeholder" multiline rows="5" cols="33"></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('web component resize', async () => {
      const page = await getPageWithContent(
        `<ld-input resize="none" class="resize-none" placeholder="Placeholder" multiline rows="5" cols="33"></ld-input>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('css component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-input">
          <textarea placeholder="Placeholder" rows="5" cols="33"></textarea>
        </div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('css component resize', async () => {
      const page = await getPageWithContent(
        `<div class="ld-input ld-input--resize-none">
          <textarea placeholder="Placeholder" rows="5" cols="33"></textarea>
        </div>`,
        { components: LdInput }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('aria-disabled', () => {
    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-input aria-disabled="true"></ld-input>`
      )
      const input = await page.find('ld-input >>> input')

      await input.press('8')
      await input.press('8')
      await input.press(' ')

      await page.keyboard.down('Shift')
      await input.press('KeyM')
      await input.press('KeyP')
      await input.press('KeyH')
      await page.keyboard.up('Shift')

      await page.waitForChanges()

      const value = await input.getProperty('value')
      expect(value).toBe('')
    })
  })
})
