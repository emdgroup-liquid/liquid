import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'

const categories = [
  {
    title: 'Necessary',
    details: {
      description:
        'These cookies are necessary for the website to operate. Our website cannot function without these cookies, and they can only be disabled by changing your browser preferences.',
    },
    toggle: {
      value: 'necessary',
      checked: true,
      disabled: true,
    },
  },
  {
    title: 'Functional',
    details: {
      description:
        'These cookies enable the provision of advanced functionalities and are used for personalization. The cookies are set in particular in response to your actions and depend on your specific service requests (e.g., pop-up notification choices).',
    },
    toggle: {
      value: 'functional',
      checked: true,
    },
  },
  {
    title: 'Targeting',
    details: {
      description:
        'These cookies may be set to learn more about your interests and show you relevant ads on other websites. These cookies work by uniquely identifying your browser and device. By integrating these cookies, we aim to learn more about your interests and your surfing behavior and to be able to place our advertising in a targeted manner.',
      cookieTable: {
        headers: ['Name', 'Provider', 'Description', 'Lifespan'],
        rows: [
          [
            '_ga',
            'Google LLC',
            'Used to distinguish unique users...',
            '2 years',
          ],
          [
            '_gat',
            'Google LLC',
            'Used to throttle the request rate...',
            '1 minute',
          ],
        ],
      },
    },
    toggle: {
      value: 'targeting',
      checked: false,
    },
  },
]

const customStyle = `
  <style>
    ld-cookie-consent {
      /* font */
      --ld-cookie-consent-font-body: 'Source Sans Pro', sans-serif;
      /* colors */
      --ld-cookie-consent-col-wht: #fff;
      --ld-cookie-consent-br-s: 0px;
      --ld-cookie-consent-br-m: 0px;
      --ld-cookie-consent-br-l: 0px;
      --ld-cookie-consent-col-neutral-010: #fafafd;
      --ld-cookie-consent-col-neutral-050: #8b919b;
      --ld-cookie-consent-col-neutral-100: #b9bdc3;
      --ld-cookie-consent-col-neutral-600: #0b182d;
      --ld-cookie-consent-col-neutral-900: #000;
      --ld-cookie-consent-thm-primary: hsl(260deg, 40%, 54%);
      --ld-cookie-consent-thm-primary-active: hsl(260deg, 40%, 34%);
      --ld-cookie-consent-thm-primary-alpha-low: hsl(260deg, 40%, 54%, 0.2);
      --ld-cookie-consent-thm-primary-alpha-lowest: hsl(260deg, 40%, 54%, 0.1);
      --ld-cookie-consent-thm-primary-focus: hsl(260deg, 40%, 64%);
      --ld-cookie-consent-thm-primary-highlight: hsl(260deg, 40%, 54%, 0.1);
      --ld-cookie-consent-thm-primary-hover: hsl(260deg, 40%, 44%);
      --ld-cookie-consent-thm-secondary: hsl(348deg, 73%, 69%);
      --ld-cookie-consent-thm-secondary-active: hsl(348deg, 73%, 49%);
      --ld-cookie-consent-thm-secondary-focus: hsl(348deg, 73%, 79%);
      --ld-cookie-consent-thm-secondary-highlight: hsl(348deg, 73%, 69%, 0.1);
      --ld-cookie-consent-thm-secondary-hover: hsl(348deg, 73%, 59%);
      /* layout */
      --ld-cookie-consent-max-inline-size: 44rem;
    }
  </style>`

const customLogo = `
  <svg slot="disclaimer-logo" width="901" height="870" viewBox="0 0 901 870" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M461 174.8c133.6 0 244.8 97.4 263.5 224.8h176C881.9 176.1 692 0 461 0v174.8Zm221-70c-1.2 0-1.2 0 0 0Z" fill="#5F82FF"/><path d="M461 694.8c133.6 0 244.8-97.4 263.5-224.8h176C881.9 693.5 692 869.6 461 869.6V694.8Zm221 70c-1.2 0-1.2 0 0 0Z" fill="#EA788E"/><path d="M0 434.7c-.4 110 41 216 115.8 296.8A436 436 0 0 0 403 870V697.1A265 265 0 0 1 173 435a264.1 264.1 0 0 1 230-262.1V0a436 436 0 0 0-287 138.3A434.7 434.7 0 0 0 0 434.7Z" fill="#7959B8"/></svg>
  <svg slot="preferences-logo" width="901" height="870" viewBox="0 0 901 870" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M461 174.8c133.6 0 244.8 97.4 263.5 224.8h176C881.9 176.1 692 0 461 0v174.8Zm221-70c-1.2 0-1.2 0 0 0Z" fill="#5F82FF"/><path d="M461 694.8c133.6 0 244.8-97.4 263.5-224.8h176C881.9 693.5 692 869.6 461 869.6V694.8Zm221 70c-1.2 0-1.2 0 0 0Z" fill="#EA788E"/><path d="M0 434.7c-.4 110 41 216 115.8 296.8A436 436 0 0 0 403 870V697.1A265 265 0 0 1 173 435a264.1 264.1 0 0 1 230-262.1V0a436 436 0 0 0-287 138.3A434.7 434.7 0 0 0 0 434.7Z" fill="#7959B8"/></svg>
`

describe('ld-cookie-consent', () => {
  for (const withCustomStyle of [false, true]) {
    describe(`disclaimer${withCustomStyle ? ' custom' : ''}`, () => {
      it('notice only', async () => {
        const page = await getPageWithContent(
          `${withCustomStyle ? customStyle : ''}<ld-cookie-consent
          settings='{
            "mode": "notice-only",
            "privacyStatementURL": "#",
            "showOnLoadDelay": 0
          }'>
            ${withCustomStyle ? customLogo : ''}
          </ld-cookie-consent>`,
          {
            disableAllTransitions: true,
            reducedMotion: true,
          }
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('opt-in', async () => {
        const settings = {
          categories,
          mode: 'opt-in',
          privacyStatementURL: '#',
          showOnLoadDelay: 0,
        }
        const page = await getPageWithContent(
          `${withCustomStyle ? customStyle : ''}<ld-cookie-consent
          settings='${JSON.stringify(settings)}'>
            ${withCustomStyle ? customLogo : ''}
          </ld-cookie-consent>`,
          {
            disableAllTransitions: true,
            reducedMotion: true,
          }
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('opt-out', async () => {
        const settings = {
          categories,
          mode: 'opt-out',
          privacyStatementURL: '#',
          showOnLoadDelay: 0,
        }
        const page = await getPageWithContent(
          `${withCustomStyle ? customStyle : ''}<ld-cookie-consent
          settings='${JSON.stringify(settings)}'>
            ${withCustomStyle ? customLogo : ''}
          </ld-cookie-consent>`,
          {
            disableAllTransitions: true,
            reducedMotion: true,
          }
        )

        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })

    describe(`preferences${withCustomStyle ? ' custom' : ''}`, () => {
      it('opt-in', async () => {
        const settings = {
          categories,
          mode: 'opt-in',
          privacyStatementURL: '#',
          showOnLoadDelay: 0,
        }
        const page = await getPageWithContent(
          `${withCustomStyle ? customStyle : ''}<ld-cookie-consent
          settings='${JSON.stringify(settings)}'>
            ${withCustomStyle ? customLogo : ''}
          </ld-cookie-consent>`,
          {
            disableAllTransitions: true,
            reducedMotion: true,
          }
        )

        const btnPrefs = await page.find(
          'ld-cookie-consent >>> [part="disclaimer-button-preferences"]'
        )
        btnPrefs.click()
        await page.waitForChanges()

        const accordionToggle0 = await page.find(
          'ld-cookie-consent >>> [part="preferences-accordion-toggle"]'
        )
        accordionToggle0.click()
        await page.waitForChanges()

        expect(
          await page.compareScreenshot('first category expanded')
        ).toMatchScreenshot()

        const accordionToggle2 = await page.find(
          'ld-cookie-consent >>> [part="preferences-accordion-section"]:last-of-type [part="preferences-accordion-toggle"]'
        )
        accordionToggle2.click()
        await page.waitForChanges()

        await page.evaluate(() => {
          const dialogContent = document
            .querySelector('ld-cookie-consent')
            .shadowRoot.querySelector('ld-modal')
            .shadowRoot.querySelector('[part="content"]')
          dialogContent.scrollTop = dialogContent.scrollHeight
        })
        await page.waitForChanges()

        expect(
          await page.compareScreenshot('third category expanded')
        ).toMatchScreenshot()
      })
    })
  }
})
