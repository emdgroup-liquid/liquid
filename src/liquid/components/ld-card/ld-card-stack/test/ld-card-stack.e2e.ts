import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../../utils/e2e-tests'
import { LdCard } from '../../ld-card'
import { LdCardStack } from '../ld-card-stack'
import { LdTypo } from '../../../ld-typo/ld-typo'

function getCardsWC(total: number) {
  return new Array(total)
    .fill(0)
    .map(
      (_, index) =>
        `<ld-card>
        <ld-typo>Card ${index}</ld-typo>
      </ld-card>`
    )
    .join('')
}

function getCardsCSS(total: number) {
  return new Array(total)
    .fill(0)
    .map(
      (_, index) =>
        `<li class="ld-card">
          <p class="ld-typo">Card ${index}</p>
        </li>`
    )
    .join('')
}

const components = [LdTypo, LdCard, LdCardStack]

describe('ld-card-stack', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(
      `<ld-card-stack>
        ${getCardsWC(5)}
      </ld-card-stack>`,
      { disableAllTransitions: true }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<ol class="ld-card-stack">
        ${getCardsCSS(5)}
      </ol>`,
      {
        components,
        disableAllTransitions: true,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('has its own stacking context', async () => {
    const page = await getPageWithContent(
      `<div style="background: salmon; padding: 2rem">
        <ld-card-stack>
          ${getCardsWC(5)}
        </ld-card-stack>
      </div>`,
      { disableAllTransitions: true }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack>
          ${getCardsWC(5)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page, {
        options: {
          rules: {
            // Exception because of the following message:
            // "Element's background color could not be determined
            // because it is overlapped by another element".
            'color-contrast': { enabled: false },
          },
        },
      })
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack">
          ${getCardsCSS(5)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page, {
        options: {
          rules: {
            // Exception because of the following message:
            // "Element's background color could not be determined
            // because it is overlapped by another element".
            'color-contrast': { enabled: false },
          },
        },
      })
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  describe('direction', () => {
    it('ltr as Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack direction="ltr">
          ${getCardsWC(5)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('ltr as CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack ld-card-stack--ltr">
          ${getCardsCSS(5)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('rtl as Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack direction="rtl">
          ${getCardsWC(5)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('rtl as CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack ld-card-stack--rtl">
          ${getCardsCSS(5)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('vertical as Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack direction="vertical">
          ${getCardsWC(5)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('vertical as CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack ld-card-stack--vertical">
          ${getCardsCSS(5)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('less than four', () => {
    it('three as Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack>
          ${getCardsWC(3)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('three as CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack">
          ${getCardsCSS(3)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('two as Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack>
          ${getCardsWC(2)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('two as CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack">
          ${getCardsCSS(2)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('one as Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-card-stack>
          ${getCardsWC(1)}
        </ld-card-stack>`,
        { disableAllTransitions: true }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('one as CSS Component', async () => {
      const page = await getPageWithContent(
        `<ol class="ld-card-stack">
          ${getCardsCSS(1)}
        </ol>`,
        {
          components,
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
