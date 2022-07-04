import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdProgress } from '../ld-progress'

describe('ld-progress', () => {
  it('renders as Web Component', async () => {
    const page = await getPageWithContent(`<ld-progress aria-valuenow="25" />`)

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('renders as CSS Component', async () => {
    const page = await getPageWithContent(
      `<div class="ld-progress"
          aria-valuenow="25"
          role="progressbar"
          style="--ld-progress-valuenow: 25"></div>`,
      {
        components: [LdProgress],
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
          <ld-progress aria-labelledby="loadinglabel" aria-valuenow="25" />`
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })

    it('is accessible as a CSS Component', async () => {
      const page = await getPageWithContent(
        `
        <span id="loadinglabel">Loading:</span>
        <div class="ld-progress"
          aria-labelledby="loadinglabel"
          aria-valuenow="25"
          role="progressbar"
          style="--ld-progress-valuenow: 25"></div>`,
        {
          components: [LdProgress],
        }
      )
      page.waitForChanges()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  describe('max min now', () => {
    it('300 100 150 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress
          aria-valuemax="300"
          aria-valuemin="100"
          aria-valuenow="150" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('300 100 150 CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress"
          aria-valuemax="300"
          aria-valuemin="100"
          aria-valuenow="150"
          role="progressbar"
          style="--ld-progress-valuemax: 300; --ld-progress-valuemin: 100; --ld-progress-valuenow: 150"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('100 -100 -50 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress
          aria-valuemax="100"
          aria-valuemin="-100"
          aria-valuenow="-50" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('100 -100 -50 CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress"
          aria-valuemax="100"
          aria-valuemin="-100"
          aria-valuenow="-50"
          role="progressbar"
          style="--ld-progress-valuemax: 100; --ld-progress-valuemin: -100; --ld-progress-valuenow: -50"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('175 -25 25 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress
          aria-valuemax="175"
          aria-valuemin="-25"
          aria-valuenow="25" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('175 -25 25 CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress"
          aria-valuemax="175"
          aria-valuemin="-25"
          aria-valuenow="25"
          role="progressbar"
          style="--ld-progress-valuemax: 175; --ld-progress-valuemin: -25; --ld-progress-valuenow: 25"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('-200 -400 -350 Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress
          aria-valuemax="-200"
          aria-valuemin="-400"
          aria-valuenow="-350" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('-200 -400 -350 CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress"
          aria-valuemax="-200"
          aria-valuemin="-400"
          aria-valuenow="-350"
          role="progressbar"
          style="--ld-progress-valuemax: -200; --ld-progress-valuemin: -400; --ld-progress-valuenow: -350"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('steps max now', () => {
    for (const now of [0, 1, 2, 3]) {
      it(`3 ${now} Web Component`, async () => {
        const page = await getPageWithContent(
          `<ld-progress steps
            aria-valuemax="4"
            aria-valuenow="${now}" />`
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it(`3 ${now} CSS component`, async () => {
        const page = await getPageWithContent(
          `<div class="ld-progress ld-progress--steps"
            aria-valuemax="4"
            aria-valuenow="${now}"
            role="progressbar"
            style="--ld-progress-valuemax: 4; --ld-progress-valuenow: ${now}"></div>`,
          {
            components: [LdProgress],
          }
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    }

    for (const now of [0, 1, 2, 3, 4]) {
      it(`4 ${now} Web Component`, async () => {
        const page = await getPageWithContent(
          `<ld-progress steps
            aria-valuemax="4"
            aria-valuenow="${now}" />`
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it(`4 ${now} CSS component`, async () => {
        const page = await getPageWithContent(
          `<div class="ld-progress ld-progress--steps"
            aria-valuemax="4"
            aria-valuenow="${now}"
            role="progressbar"
            style="--ld-progress-valuemax: 4; --ld-progress-valuenow: ${now}"></div>`,
          {
            components: [LdProgress],
          }
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    }
  })

  describe('steps min max now', () => {
    it(`1 -4 -3 Web Component`, async () => {
      const page = await getPageWithContent(
        `
        <ld-progress steps
          aria-valuemax="1"
          aria-valuemin="-4"
          aria-valuenow="-3" steps/>`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('overflow', () => {
    it('less than double max Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress aria-valuenow="125" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('less than double max CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress"
          aria-valuenow="125"
          role="progressbar"
          style="--ld-progress-valuenow: 125"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('more than double max Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress aria-valuenow="225" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('more than double max CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress"
          aria-valuenow="125"
          role="progressbar"
          style="--ld-progress-valuenow: 225"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('steps Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress aria-valuemax="5" aria-valuenow="7" steps />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('steps CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--steps"
          aria-valuemax="5"
          aria-valuenow="7"
          role="progressbar"
          style="--ld-progress-valuemax: 5; --ld-progress-valuenow: 7"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('pending', () => {
    it('indeterminate Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress pending aria-valuetext="indeterminate" />`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('indeterminate CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--pending"
          aria-valuetext="indeterminate"
          role="progressbar"
          style="--ld-progress-valuenow: 100"></div>`,
        {
          components: [LdProgress],
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('valuenow Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress pending aria-valuenow="25" />`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('valuenow CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--pending"
          aria-valuenow="25"
          role="progressbar"
          style="--ld-progress-valuenow: 25"></div>`,
        {
          components: [LdProgress],
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress pending aria-valuenow="125" />`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--pending"
          aria-valuenow="125"
          role="progressbar"
          style="--ld-progress-valuenow: 125"></div>`,
        {
          components: [LdProgress],
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow steps Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress pending aria-valuemax="5" aria-valuenow="7" steps />`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow steps CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--pending ld-progress--steps"
          aria-valuemax="5"
          aria-valuenow="7"
          role="progressbar"
          style="--ld-progress-valuemax: 5; --ld-progress-valuenow: 7"></div>`,
        {
          components: [LdProgress],
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('on brcolor', () => {
    it('valuenow Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress brand-color aria-valuenow="25" />`,
        {
          bgColor: 'var(--ld-thm-primary)',
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('valuenow CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--brand-color"
          aria-valuenow="25"
          role="progressbar"
          style="--ld-progress-valuenow: 25"></div>`,
        {
          bgColor: 'var(--ld-thm-primary)',
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress brand-color aria-valuenow="125" />`
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--brand-color"
          aria-valuenow="125"
          role="progressbar"
          style="--ld-progress-valuenow: 125"></div>`,
        {
          components: [LdProgress],
        }
      )

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('pending steps Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress brand-color pending aria-valuemax="5" aria-valuenow="2" steps />`,
        {
          bgColor: 'var(--ld-thm-primary)',
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('pending steps CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--brand-color ld-progress--pending ld-progress--steps"
          aria-valuemax="5"
          aria-valuenow="2"
          role="progressbar"
          style="--ld-progress-valuemax: 5; --ld-progress-valuenow: 2"></div>`,
        {
          bgColor: 'var(--ld-thm-primary)',
          components: [LdProgress],
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow pending steps Web Component', async () => {
      const page = await getPageWithContent(
        `<ld-progress brand-color pending aria-valuemax="5" aria-valuenow="7" steps />`,
        {
          bgColor: 'var(--ld-thm-primary)',
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('overflow pending steps CSS component', async () => {
      const page = await getPageWithContent(
        `<div class="ld-progress ld-progress--brand-color ld-progress--pending ld-progress--steps"
          aria-valuemax="5"
          aria-valuenow="7"
          role="progressbar"
          style="--ld-progress-valuemax: 5; --ld-progress-valuenow: 7"></div>`,
        {
          bgColor: 'var(--ld-thm-primary)',
          components: [LdProgress],
        }
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
