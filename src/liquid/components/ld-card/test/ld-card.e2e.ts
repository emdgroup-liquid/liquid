import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdCard } from '../ld-card'
import { LdTypo } from '../../ld-typo/ld-typo'
import { LdButton } from '../../ld-button/ld-button'

describe('ld-card', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(
      `<ld-card>
        <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
      </ld-card>`
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<div class="ld-card">
          <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
        </div>`,
      {
        components: [LdCard, LdTypo],
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card>
          Lorem ipsum dolor sit amet.
        </ld-card>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card">
          Lorem ipsum dolor sit amet.
        </div>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  describe('size', () => {
    it('small card Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card size="sm">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-card>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('small card CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--sm">
          <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
        </div>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('zero-padding card Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card size="zero-padding">
          <img
            style="border-radius: inherit"
            src="https://picsum.photos/id/152/180/80"
            alt=""
          />
        </ld-card>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('zero-padding card CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--zero">
          <img
            style="border-radius: inherit"
            src="https://picsum.photos/id/152/180/80"
            alt=""
          />
        </div>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('shadow', () => {
    it('active shadow card Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card shadow="active">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-card>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('active shadow card CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--active">
          <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
        </div>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('hover shadow card Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card shadow="hover">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-card>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('hover shadow card CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--hover">
          <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
        </div>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('sticky shadow card Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card shadow="sticky">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-card>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('sticky shadow card CSS Component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--sticky">
          <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
        </div>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('interactive', () => {
    it('interactive card Web Component hover', async () => {
      const page = await getPageWithContent(
        `<ld-card interactive shadow-interactive="sticky">
          <ld-typo style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</ld-typo>
          <ld-button mode="highlight">Click me</ld-button>
        </ld-card>`
      )

      await page.hover('ld-card')
      await page.waitForChanges()

      const resultsHoverCard = await page.compareScreenshot('hover card')
      expect(resultsHoverCard).toMatchScreenshot()

      await page.hover('ld-button')
      await page.waitForChanges()

      const resultsHoverButton = await page.compareScreenshot('hover button')
      expect(resultsHoverButton).toMatchScreenshot()
    })

    it('interactive card CSS Component hover', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--interactive-sticky">
          <p class="ld-typo ld-typo--body-m" style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</p>
          <button class="ld-button ld-button--highlight">Click me</button>
        </div>`,
        {
          components: [LdCard, LdTypo, LdButton],
        }
      )

      await page.hover('.ld-card')
      await page.waitForChanges()

      const resultsHoverCard = await page.compareScreenshot('hover card')
      expect(resultsHoverCard).toMatchScreenshot()

      await page.hover('.ld-button')
      await page.waitForChanges()

      const resultsHoverButton = await page.compareScreenshot('hover button')
      expect(resultsHoverButton).toMatchScreenshot()
    })

    it('interactive card Web Component focus', async () => {
      const page = await getPageWithContent(
        `<ld-card interactive shadow-interactive="sticky">
          <ld-typo style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</ld-typo>
          <ld-button mode="highlight">Click me</ld-button>
        </ld-card>`
      )

      await page.keyboard.press('Tab')
      await page.waitForChanges()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('interactive card CSS Component focus', async () => {
      const page = await getPageWithContent(
        `<div class="ld-card ld-card--interactive-sticky">
          <p class="ld-typo ld-typo--body-m" style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</p>
          <button class="ld-button ld-button--highlight">Click me</button>
        </div>`,
        {
          components: [LdCard, LdTypo, LdButton],
        }
      )

      await page.keyboard.press('Tab')
      await page.waitForChanges()

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('appearance reset', () => {
    it('list item card CSS Component', async () => {
      const page = await getPageWithContent(
        `<li class="ld-card">
          <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
        </li>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('button card CSS Component', async () => {
      const page = await getPageWithContent(
        `<button class="ld-card">
          <span class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</span>
        </button>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('anchor card CSS Component', async () => {
      const page = await getPageWithContent(
        `<a href="#" class="ld-card">
          <span class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</span>
        </a>`,
        {
          components: [LdCard, LdTypo],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
