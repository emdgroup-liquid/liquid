import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import {
  getSidenavWithoutSubnavigation,
  getSidenavWithSubnavigation,
} from './utils'

describe('ld-sidenav', () => {
  describe('without subnavigation', () => {
    describe('shows shadows', () => {
      it('shows shadow at the bottom and separator line at the top', async () => {
        const page = await getPageWithContent(getSidenavWithoutSubnavigation())
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })

      it('shows shadow at the top and bottom when scrolling down', async () => {
        const page = await getPageWithContent(getSidenavWithoutSubnavigation())
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])

        await page.evaluate(() => {
          const ldSidenavScrollerInternal = document
            .querySelector('ld-sidenav')
            .shadowRoot.querySelector('ld-sidenav-scroller-internal')
          ldSidenavScrollerInternal.scrollTop = 20
        })
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })

      it('shows shadow at the top and separator line at the bottom when scrolled to the bottom', async () => {
        const page = await getPageWithContent(getSidenavWithoutSubnavigation())
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])

        await page.evaluate(() => {
          const ldSidenavScrollerInternal = document
            .querySelector('ld-sidenav')
            .shadowRoot.querySelector('ld-sidenav-scroller-internal')
          ldSidenavScrollerInternal.scrollTop = 2000
        })
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })

    describe('is collapsible', () => {
      it('should have a toggle button', async () => {
        const page = await getPageWithContent(
          getSidenavWithoutSubnavigation({ collapsible: true })
        )
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })

      it('should be fully collapsed', async () => {
        const page = await getPageWithContent(
          getSidenavWithoutSubnavigation({ collapsible: true, collapsed: true })
        )
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })

    describe('is alignable', () => {
      it('should align to the right', async () => {
        const page = await getPageWithContent(
          getSidenavWithoutSubnavigation({ align: 'right' })
        )
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })

      it('collapses to the right', async () => {
        const page = await getPageWithContent(
          getSidenavWithoutSubnavigation({
            align: 'right',
            collapsible: true,
            collapsed: true,
          })
        )
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })
  })

  describe('with subnavigation', () => {
    it('is accessible', async () => {
      const page = await getPageWithContent(getSidenavWithSubnavigation())
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()
      await new Promise((resolve) => setTimeout(resolve, 100))

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues({
        incompleteThreshold: 1, // axe tests color contrast inside aria-hidden container
      })
    })

    describe('shows shadows', () => {
      it('shows shadow at the bottom and separator line at the top', async () => {
        const page = await getPageWithContent(getSidenavWithSubnavigation())
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })

      it('shows shadow at the top and bottom when scrolling down', async () => {
        const page = await getPageWithContent(getSidenavWithSubnavigation())
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])

        await page.evaluate(() => {
          const ldSidenavScrollerInternal = document
            .querySelector('ld-sidenav-slider')
            .shadowRoot.querySelector('ld-sidenav-scroller-internal')
          ldSidenavScrollerInternal.scrollTop = 20
        })
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })

      it('shows shadow at the top and separator line at the bottom when scrolled to the bottom', async () => {
        const page = await getPageWithContent(getSidenavWithSubnavigation())
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])

        await page.evaluate(() => {
          const ldSidenavScrollerInternal = document
            .querySelector('ld-sidenav-slider')
            .shadowRoot.querySelector('ld-sidenav-scroller-internal')
          ldSidenavScrollerInternal.scrollTop = 2000
        })
        await page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })

    describe('in subnavigation with back button', () => {
      it('shows shadow separator line at the top and bottom', async () => {
        const page = await getPageWithContent(
          getSidenavWithSubnavigation({
            currentSubnav: 'artificial-intelligence',
          })
        )
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })

    describe('narrow mode', () => {
      it('collapses to narrow mode', async () => {
        const page = await getPageWithContent(
          getSidenavWithSubnavigation({
            currentSubnav: 'artificial-intelligence',
            collapsible: true,
            collapsed: true,
            narrow: true,
          })
        )
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })

    describe('neutral mode', () => {
      it('uses neutral background color', async () => {
        const page = await getPageWithContent(
          getSidenavWithSubnavigation({
            currentSubnav: 'artificial-intelligence',
            neutral: true,
          })
        )
        await page.emulateMediaFeatures([
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ])
        page.waitForChanges()
        await new Promise((resolve) => setTimeout(resolve, 100))

        const result = await page.compareScreenshot()
        expect(result).toMatchScreenshot()
      })
    })
  })

  describe('with subnavigation aligned to the right', () => {
    it('is expanded on the right', async () => {
      const page = await getPageWithContent(
        getSidenavWithSubnavigation({
          align: 'right',
          collapsible: true,
          narrow: true,
        })
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('collapses to the right', async () => {
      const page = await getPageWithContent(
        getSidenavWithSubnavigation({
          align: 'right',
          collapsible: true,
          collapsed: true,
          currentSubnav: 'artificial-intelligence',
          narrow: true,
        })
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('collapses fully in narrow mode', async () => {
      const page = await getPageWithContent(
        getSidenavWithSubnavigation({
          align: 'right',
          collapsible: true,
          collapsed: true,
          currentSubnav: 'mathematical-foundations',
          narrow: true,
        })
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })
  })

  describe('nav item', () => {
    it('uses a custom icon', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem>
              <svg slot="icon" viewBox="0 0 32 32">
                <g transform="scale(0.75) translate(5, 5)">
                  <path d="M8.40273 3.00317C16.3674 -1.08484 30.9212 8.31547 30.2215 17.1105C29.5219 25.9055 13.8966 33.1344 6.62487 28.4376C-0.650379 23.7238 0.431303 7.10139 8.40273 3.00317Z" fill="#2DBECD"/>
                  <path d="M4.69207 12.6056C6.77561 6.76982 18.5736 4.62074 22.3863 9.39108C26.199 14.1614 21.7368 25.211 15.842 26.2848C9.93739 27.3517 2.60995 18.4498 4.69207 12.6056Z" fill="#FFC832"/>
                  <path d="M11.2893 10.9795C13.2965 8.19935 19.898 8.87655 21.1887 11.9997C22.4793 15.1229 18.4039 20.3071 15.1055 19.9688C11.803 19.6253 9.28149 13.7644 11.2893 10.9795Z" fill="#0F69AF"/>
                </g>
              </svg>
              Liquid Oxygen
            </ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('uses a custom image', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem>
              <img slot="icon" src="https://picsum.photos/id/152/80/80" alt="" />
              Liquid Oxygen
            </ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('uses an icon fallback', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('uses secondary mode', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem mode="secondary">Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('uses tertiary mode', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem mode="tertiary">Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('is active', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" active>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('truncates long titles', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem>This is a extremely long title that actually needs truncation to not grow too large</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary">This is a extremely long title that actually needs truncation to not grow too large</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary">This is a extremely long title that actually needs truncation to not grow too large</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('is active and has hover state', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" active>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      await page.hover('ld-sidenav-navitem')
      await page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('is active and has focus state', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" active>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      await page.keyboard.press('Tab')
      await page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('is active and has active state', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" active>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" active>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      await page.keyboard.press('Tab')
      await page.keyboard.down('Space')
      await page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('is rounded', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem rounded>
              <svg slot="icon" viewBox="0 0 32 32">
                <g transform="scale(0.75) translate(5, 5)">
                  <path d="M8.40273 3.00317C16.3674 -1.08484 30.9212 8.31547 30.2215 17.1105C29.5219 25.9055 13.8966 33.1344 6.62487 28.4376C-0.650379 23.7238 0.431303 7.10139 8.40273 3.00317Z" fill="#2DBECD"/>
                  <path d="M4.69207 12.6056C6.77561 6.76982 18.5736 4.62074 22.3863 9.39108C26.199 14.1614 21.7368 25.211 15.842 26.2848C9.93739 27.3517 2.60995 18.4498 4.69207 12.6056Z" fill="#FFC832"/>
                  <path d="M11.2893 10.9795C13.2965 8.19935 19.898 8.87655 21.1887 11.9997C22.4793 15.1229 18.4039 20.3071 15.1055 19.9688C11.803 19.6253 9.28149 13.7644 11.2893 10.9795Z" fill="#0F69AF"/>
                </g>
              </svg>
              Liquid Oxygen
            </ld-sidenav-navitem>
            <ld-sidenav-navitem rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" rounded>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('has a rounded hover state', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem rounded>
              <svg slot="icon" viewBox="0 0 32 32">
                <g transform="scale(0.75) translate(5, 5)">
                  <path d="M8.40273 3.00317C16.3674 -1.08484 30.9212 8.31547 30.2215 17.1105C29.5219 25.9055 13.8966 33.1344 6.62487 28.4376C-0.650379 23.7238 0.431303 7.10139 8.40273 3.00317Z" fill="#2DBECD"/>
                  <path d="M4.69207 12.6056C6.77561 6.76982 18.5736 4.62074 22.3863 9.39108C26.199 14.1614 21.7368 25.211 15.842 26.2848C9.93739 27.3517 2.60995 18.4498 4.69207 12.6056Z" fill="#FFC832"/>
                  <path d="M11.2893 10.9795C13.2965 8.19935 19.898 8.87655 21.1887 11.9997C22.4793 15.1229 18.4039 20.3071 15.1055 19.9688C11.803 19.6253 9.28149 13.7644 11.2893 10.9795Z" fill="#0F69AF"/>
                </g>
              </svg>
              Liquid Oxygen
            </ld-sidenav-navitem>
            <ld-sidenav-navitem rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" rounded>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      await page.hover('ld-sidenav-navitem')
      await page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('has a rounded focus state', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem rounded>
              <svg slot="icon" viewBox="0 0 32 32">
                <g transform="scale(0.75) translate(5, 5)">
                  <path d="M8.40273 3.00317C16.3674 -1.08484 30.9212 8.31547 30.2215 17.1105C29.5219 25.9055 13.8966 33.1344 6.62487 28.4376C-0.650379 23.7238 0.431303 7.10139 8.40273 3.00317Z" fill="#2DBECD"/>
                  <path d="M4.69207 12.6056C6.77561 6.76982 18.5736 4.62074 22.3863 9.39108C26.199 14.1614 21.7368 25.211 15.842 26.2848C9.93739 27.3517 2.60995 18.4498 4.69207 12.6056Z" fill="#FFC832"/>
                  <path d="M11.2893 10.9795C13.2965 8.19935 19.898 8.87655 21.1887 11.9997C22.4793 15.1229 18.4039 20.3071 15.1055 19.9688C11.803 19.6253 9.28149 13.7644 11.2893 10.9795Z" fill="#0F69AF"/>
                </g>
              </svg>
              Liquid Oxygen
            </ld-sidenav-navitem>
            <ld-sidenav-navitem rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" rounded>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      await page.keyboard.press('Tab')
      await page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('has a rounded active state', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem rounded>
              <svg slot="icon" viewBox="0 0 32 32">
                <g transform="scale(0.75) translate(5, 5)">
                  <path d="M8.40273 3.00317C16.3674 -1.08484 30.9212 8.31547 30.2215 17.1105C29.5219 25.9055 13.8966 33.1344 6.62487 28.4376C-0.650379 23.7238 0.431303 7.10139 8.40273 3.00317Z" fill="#2DBECD"/>
                  <path d="M4.69207 12.6056C6.77561 6.76982 18.5736 4.62074 22.3863 9.39108C26.199 14.1614 21.7368 25.211 15.842 26.2848C9.93739 27.3517 2.60995 18.4498 4.69207 12.6056Z" fill="#FFC832"/>
                  <path d="M11.2893 10.9795C13.2965 8.19935 19.898 8.87655 21.1887 11.9997C22.4793 15.1229 18.4039 20.3071 15.1055 19.9688C11.803 19.6253 9.28149 13.7644 11.2893 10.9795Z" fill="#0F69AF"/>
                </g>
              </svg>
              Liquid Oxygen
            </ld-sidenav-navitem>
            <ld-sidenav-navitem rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary" rounded>Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem mode="tertiary" rounded>Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      await page.keyboard.press('Tab')
      await page.keyboard.down('Space')
      await page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })

    it('has a custom background color', async () => {
      const page = await getPageWithContent(
        `
        <ld-sidenav open>
          <ld-sidenav-slider label="Outline of CS">
            <ld-sidenav-navitem style="--ld-sidenav-navitem-icon-bg-col: var(--ld-col-vm)" >
              <svg slot="icon" viewBox="0 0 32 32">
                <g transform="scale(0.75) translate(5, 5)">
                  <path d="M8.40273 3.00317C16.3674 -1.08484 30.9212 8.31547 30.2215 17.1105C29.5219 25.9055 13.8966 33.1344 6.62487 28.4376C-0.650379 23.7238 0.431303 7.10139 8.40273 3.00317Z" fill="#2DBECD"/>
                  <path d="M4.69207 12.6056C6.77561 6.76982 18.5736 4.62074 22.3863 9.39108C26.199 14.1614 21.7368 25.211 15.842 26.2848C9.93739 27.3517 2.60995 18.4498 4.69207 12.6056Z" fill="#FFC832"/>
                  <path d="M11.2893 10.9795C13.2965 8.19935 19.898 8.87655 21.1887 11.9997C22.4793 15.1229 18.4039 20.3071 15.1055 19.9688C11.803 19.6253 9.28149 13.7644 11.2893 10.9795Z" fill="#0F69AF"/>
                </g>
              </svg>
              Liquid Oxygen
            </ld-sidenav-navitem>
            <ld-sidenav-navitem style="--ld-sidenav-navitem-icon-bg-col: var(--ld-col-rp)" >Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem style="--ld-sidenav-navitem-icon-bg-col: var(--ld-col-rr)" mode="secondary">Liquid Oxygen</ld-sidenav-navitem>
            <ld-sidenav-navitem style="--ld-sidenav-navitem-icon-bg-col: var(--ld-col-rg)" mode="tertiary">Liquid Oxygen</ld-sidenav-navitem>
          </ld-sidenav-slider>
        </ld-sidenav>`
      )
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])
      page.waitForChanges()

      const result = await page.compareScreenshot()
      expect(result).toMatchScreenshot()
    })
  })
})
