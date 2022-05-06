import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
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

    it('with icon start', async () => {
      const page = await getPageWithContent(
        '<ld-link icon-start>Link</ld-link>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with icon end', async () => {
      const page = await getPageWithContent('<ld-link icon-end>Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with href', async () => {
      const page = await getPageWithContent('<ld-link href="#">Link</ld-link>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with target', async () => {
      const page = await getPageWithContent(
        '<ld-link target="_blank" href="#">Link</ld-link>'
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

    it('with icon start', async () => {
      const page = await getPageWithContent(
        `
        <a class="ld-link">
        <svg class="ld-link__icon ld-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m7 13 4-5-4-5" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>Link</a>
        `,
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with icon end', async () => {
      const page = await getPageWithContent(
        `
        <a class="ld-link">Link<svg class="ld-link__icon ld-icon" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m7 13 4-5-4-5" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg></a>
        `,
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('with link', async () => {
      const page = await getPageWithContent(
        '<a target="_blank" href="#" class="ld-link">Link</a>',
        { components: [LdLink] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
