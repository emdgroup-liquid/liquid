import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdLink } from '../ld-link'

describe('ld-link', () => {
  describe('web component', () => {
    it('basic', async () => {
      const page = await getPageWithContent('<ld-link>Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('small', async () => {
      const page = await getPageWithContent('<ld-link size="sm">Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('large', async () => {
      const page = await getPageWithContent('<ld-link size="lg">Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    // TODO: Element has insufficient color contrast
    xit('disabled', async () => {
      const page = await getPageWithContent('<ld-link disabled>Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with icon', async () => {
      const page = await getPageWithContent('<ld-link show-icon>Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with href', async () => {
      const page = await getPageWithContent(
        '<ld-link href="introduction/getting-started/">Link</ld-link>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with target', async () => {
      const page = await getPageWithContent(
        '<ld-link target="_blank" href="introduction/getting-started/">Link</ld-link>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  describe('css component', () => {
    it('basic', async () => {
      const page = await getPageWithContent('<a class="ld-link">Link</a>', {
        components: [LdLink],
      })
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('small', async () => {
      const page = await getPageWithContent(
        '<a class="ld-link ld-link--sm">Link</a>',
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('large', async () => {
      const page = await getPageWithContent(
        '<a class="ld-link ld-link--lg">Link</a>',
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    // TODO: Element has insufficient color contrast
    xit('disabled', async () => {
      const page = await getPageWithContent(
        '<a class="ld-link ld-link--disabled">Link</a>',
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with icon', async () => {
      const page = await getPageWithContent(
        `
        <a class="ld-link">
        <svg class="ld-link__icon ld-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m7 13 4-5-4-5" stroke="currentcolor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>Link</a>
        `,
        { components: [LdLink, LdIcon] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with href', async () => {
      const page = await getPageWithContent(
        '<a href="introduction/getting-started/" class="ld-link">Link</a>',
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with target', async () => {
      const page = await getPageWithContent(
        '<a target="_blank" href="introduction/getting-started/" class="ld-link">Link</a>',
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
