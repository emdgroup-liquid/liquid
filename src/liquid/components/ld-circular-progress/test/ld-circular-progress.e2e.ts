import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdCircularProgress } from '../ld-circular-progress'
import { LdTypo } from '../../ld-typo/ld-typo'

const svg = `
<svg class="ld-circular-progress__stroke" viewBox="0 0 10 10">
  <circle cx="5" cy="5" r="5" />
  <circle cx="5" cy="5" r="5" />
</svg>`

describe('ld-circular-progress', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(
      `
      <ld-circular-progress aria-valuenow="25">
        <ld-typo variant="b6">25%</ld-typo>
        <ld-typo variant="label-s">complete</ld-typo>
      </ld-circular-progress>`
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS component', async () => {
    const page = await getPageWithContent(
      `
        <div class="ld-circular-progress"
             aria-valuenow="25"
             role="progressbar"
             style="--ld-circular-progress-valuenow: 25">
          <span class="ld-typo ld-typo--b6">25%</span>
          <span class="ld-typo ld-typo--label-s">complete</span>
          ${svg}
        </div>`,
      {
        components: [LdCircularProgress, LdTypo],
        disableAllTransitions: true,
      }
    )

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('accessibility', () => {
    it('is accessible as a Web Component', async () => {
      const page = await getPageWithContent(
        `
          <span id="loadinglabel">Loading:</span>
          <ld-circular-progress aria-labelledby="loadinglabel" aria-valuenow="25">
            <ld-typo variant="b6">25%</ld-typo>
            <ld-typo variant="label-s">complete</ld-typo>
          </ld-circular-progress>`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page, {
        rules: {
          // Disabling color-contrast rule here due to:
          // "Element's background color could not be determined due to a pseudo-element"
          'color-contrast': { enabled: false },
        },
      })
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS component', async () => {
      const page = await getPageWithContent(
        `
        <span id="loadinglabel">Loading:</span>
        <div class="ld-circular-progress"
             aria-labelledby="loadinglabel"
             aria-valuenow="25"
             role="progressbar"
             style="--ld-circular-progress-valuenow: 25">
          <span class="ld-typo ld-typo--b6">25%</span>
          <span class="ld-typo ld-typo--label-s">complete</span>
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress, LdTypo],
          disableAllTransitions: true,
        }
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page, {
        rules: {
          // Disabling color-contrast rule here due to:
          // "Element's background color could not be determined due to a pseudo-element"
          'color-contrast': { enabled: false },
        },
      })
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  describe('max min now', () => {
    it('300 100 150 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-circular-progress
          aria-valuemax="300"
          aria-valuemin="100"
          aria-valuenow="150" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('300 100 150 CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress"
          aria-valuemax="300"
          aria-valuemin="100"
          aria-valuenow="150"
          role="progressbar"
          style="--ld-circular-progress-valuemax: 300; --ld-circular-progress-valuemin: 100; --ld-circular-progress-valuenow: 150">
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('100 -100 -50 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-circular-progress
          aria-valuemax="100"
          aria-valuemin="-100"
          aria-valuenow="-50" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('100 -100 -50 CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress"
          aria-valuemax="100"
          aria-valuemin="-100"
          aria-valuenow="-50"
          role="progressbar"
          style="--ld-circular-progress-valuemax: 100; --ld-circular-progress-valuemin: -100; --ld-circular-progress-valuenow: -50">
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('175 -25 25 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-circular-progress
          aria-valuemax="175"
          aria-valuemin="-25"
          aria-valuenow="25" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('175 -25 25 CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress"
          aria-valuemax="175"
          aria-valuemin="-25"
          aria-valuenow="25"
          role="progressbar"
          style="--ld-circular-progress-valuemax: 175; --ld-circular-progress-valuemin: -25; --ld-circular-progress-valuenow: 25">
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('-200 -400 -350 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-circular-progress
          aria-valuemax="-200"
          aria-valuemin="-400"
          aria-valuenow="-350" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('-200 -400 -350 CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress"
          aria-valuemax="-200"
          aria-valuemin="-400"
          aria-valuenow="-350"
          role="progressbar"
          style="--ld-circular-progress-valuemax: -200; --ld-circular-progress-valuemin: -400; --ld-circular-progress-valuenow: -350">
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('overflow', () => {
    it('less than double max Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-circular-progress aria-valuenow="125" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('less than double max CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress ld-circular-progress--overflow"
          aria-valuenow="125"
          role="progressbar"
          style="--ld-circular-progress-valuenow: 125">
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('more than double max Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-circular-progress aria-valuenow="225" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('more than double max CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress ld-circular-progress--overflow"
          aria-valuenow="125"
          role="progressbar"
          style="--ld-circular-progress-valuenow: 225">
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('on brand color', () => {
    it('valuenow Web Component', async () => {
      const page = await getPageWithContent(
        `
        <ld-circular-progress brand-color aria-valuemax="360" aria-valuenow="90">
          <ld-typo variant="b6" style="color: var(--ld-col-wht)">90&#xb0;</ld-typo>
        </ld-circular-progress>`,
        {
          bgColor: 'var(--ld-thm-primary)',
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('valuenow CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress ld-circular-progress--brand-color"
             aria-valuemax="360"
             aria-valuenow="90"
             role="progressbar"
             style="--ld-circular-progress-valuemax: 360; --ld-circular-progress-valuenow: 90">
          <span class="ld-typo ld-typo--b6" style="color: var(--ld-col-wht)">90&#xb0;</span>
          ${svg}
        </div>`,
        {
          bgColor: 'var(--ld-thm-primary)',
          components: [LdCircularProgress, LdTypo],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow Web Component', async () => {
      const page = await getPageWithContent(
        `
        <ld-circular-progress brand-color
                              aria-valuemax="360"
                              aria-valuenow="450">
          <ld-typo variant="b6" style="color: var(--ld-thm-warning)">450&#xb0;</ld-typo>
        </ld-circular-progress>
        `,
        {
          bgColor: 'var(--ld-thm-primary)',
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress ld-circular-progress--brand-color ld-circular-progress--overflow"
             aria-valuemax="360"
             aria-valuenow="450"
             role="progressbar"
             style="--ld-circular-progress-valuemax: 360; --ld-circular-progress-valuenow: 450">
          <span class="ld-typo ld-typo--b6" style="color: var(--ld-thm-warning)">450&#xb0;</span>
          ${svg}
        </div>`,
        {
          bgColor: 'var(--ld-thm-primary)',
          components: [LdCircularProgress, LdTypo],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('custom color', () => {
    it('Web Component', async () => {
      const page = await getPageWithContent(
        `
      <ld-circular-progress aria-valuenow="25" style="--ld-circular-progress-bar-col: var(--ld-thm-secondary)">
        <ld-typo variant="b6">25%</ld-typo>
        <ld-typo variant="label-s">complete</ld-typo>
      </ld-circular-progress>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress"
             aria-valuenow="25"
             role="progressbar"
             style="--ld-circular-progress-bar-col: var(--ld-thm-secondary); --ld-circular-progress-valuenow: 25">
          <span class="ld-typo ld-typo--b6">25%</span>
          <span class="ld-typo ld-typo--label-s">complete</span>
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress, LdTypo],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('custom size', () => {
    it('Web Component', async () => {
      const page = await getPageWithContent(
        `
        <ld-circular-progress aria-valuenow="75" style="--ld-circular-progress-size: 4rem">
          <ld-typo class="report-value" variant="b6" style="transform: scale(0.8)">75</ld-typo>
        </ld-circular-progress>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('CSS component', async () => {
      const page = await getPageWithContent(
        `
        <div class="ld-circular-progress"
             aria-valuenow="75"
             role="progressbar"
             style="--ld-circular-progress-size: 4rem; --ld-circular-progress-valuenow: 75">
          <span class="ld-typo ld-typo--b6" style="transform: scale(0.8)">75</span>
          ${svg}
        </div>`,
        {
          components: [LdCircularProgress, LdTypo],
          disableAllTransitions: true,
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
