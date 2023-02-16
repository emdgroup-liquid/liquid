import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdBadge } from '../ld-badge'

describe('ld-badge', () => {
  describe('web component', () => {
    it('renders', async () => {
      const page = await getPageWithContent(
        '<ld-badge icon="checkmark"></ld-badge>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with custom icon', async () => {
      const page = await getPageWithContent(
        `<ld-badge>
            <svg slot="icon" viewBox="0 0 14 14">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </ld-badge>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with with size lg', async () => {
      const page = await getPageWithContent(
        '<ld-badge icon="checkmark" size="lg"></ld-badge>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with text', async () => {
      const page = await getPageWithContent('<ld-badge>Badge</ld-badge>')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with large text', async () => {
      const page = await getPageWithContent(
        `<ld-badge size="lg">Badge</ld-badge>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with icon and text', async () => {
      const page = await getPageWithContent(
        '<ld-badge icon="checkmark" >Badge</ld-badge>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with large icon and text', async () => {
      const page = await getPageWithContent(
        '<ld-badge icon="checkmark"  size="lg">Badge</ld-badge>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with line break', async () => {
      const page = await getPageWithContent(
        `<ld-badge icon="checkmark">
          Badge with a<br>line break
        </ld-badge>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders on brand color', async () => {
      const page = await getPageWithContent(
        '<ld-badge icon="checkmark" brand-color>Badge</ld-badge>',
        {
          bgColor: 'var(--ld-thm-primary)',
        }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with custom color', async () => {
      const page = await getPageWithContent(
        `<ld-badge
          style="--ld-badge-bg-col: var(--ld-thm-success)"
          icon="checkmark">
          Badge
        </ld-badge>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('css component', () => {
    it('renders', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>`,
        { components: [LdBadge, LdIcon] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with with size lg', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge ld-badge--lg">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>`,
        { components: [LdBadge, LdIcon] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with text', async () => {
      const page = await getPageWithContent(
        '<span class="ld-badge">Badge</span>',
        { components: [LdBadge] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with large text', async () => {
      const page = await getPageWithContent(
        '<span class="ld-badge ld-badge--lg">Badge</span>',
        { components: [LdBadge] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with icon and text', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge ld-badge--with-text">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Badge
        </span>`,
        { components: [LdBadge, LdIcon] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with large icon and text', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge ld-badge--lg ld-badge--with-text">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Badge
        </span>`,
        { components: [LdBadge, LdIcon] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with line break', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge ld-badge--with-text">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Badge with a<br>line break
        </span>`,
        { components: [LdBadge, LdIcon] }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders on brand color', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge ld-badge--with-text ld-badge--brand-color">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Badge
        </span>`,
        {
          bgColor: 'var(--ld-thm-primary)',
          components: [LdBadge, LdIcon],
        }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('renders with custom color', async () => {
      const page = await getPageWithContent(
        `<span
          class="ld-badge ld-badge--with-text"
          style="--ld-badge-bg-col: var(--ld-thm-success)">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Badge
        </span>`,
        {
          components: [LdBadge, LdIcon],
        }
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-badge icon="checkmark"></ld-badge>`
      )
      page.waitForChanges()
      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<span class="ld-badge">
          <svg class="ld-icon" viewBox="0 0 14 14" fill="none">
            <path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>`
      )
      page.waitForChanges()
      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })
})
