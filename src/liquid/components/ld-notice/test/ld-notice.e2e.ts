import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdTypo } from '../../ld-typo/ld-typo'
import { LdNotice } from '../ld-notice'

describe('ld-notice', () => {
  describe('web component', () => {
    describe('with headline', () => {
      it('info', async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>'
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('warning', async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline" mode="warning">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>'
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('error', async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline" mode="error">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>'
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })
    })

    describe('without headline', () => {
      it('info', async () => {
        const page = await getPageWithContent(
          '<ld-notice>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>'
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('warning', async () => {
        const page = await getPageWithContent(
          '<ld-notice mode="warning">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>'
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('error', async () => {
        const page = await getPageWithContent(
          '<ld-notice mode="error">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>'
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })
  })

  describe('css component', () => {
    describe('with headline', () => {
      it('info', async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--info">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Headline</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('warning', async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--warning">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Headline</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })

      it('error', async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--error">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Headline</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()

        const accessibilityReport = await analyzeAccessibility(page)
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })
    })

    describe('without headline', () => {
      it('info', async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--info">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('warning', async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--warning">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('error', async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--error">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })
  })
})
