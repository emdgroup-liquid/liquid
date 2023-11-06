import {
  analyzeAccessibility,
  getPageWithContent,
} from "../../../utils/e2e-tests";
import { LdIcon } from "../../ld-icon/ld-icon";
import { LdTypo } from "../../ld-typo/ld-typo";
import { LdNotice } from "../ld-notice";

describe("ld-notice", () => {
  describe("web component", () => {
    describe("with headline", () => {
      it("info", async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("warning", async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline" mode="warning">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("error", async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline" mode="error">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("success", async () => {
        const page = await getPageWithContent(
          '<ld-notice headline="Headline" mode="success">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });
    });

    describe("without headline", () => {
      it("info", async () => {
        const page = await getPageWithContent(
          '<ld-notice>Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("warning", async () => {
        const page = await getPageWithContent(
          '<ld-notice mode="warning">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("error", async () => {
        const page = await getPageWithContent(
          '<ld-notice mode="error">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("success", async () => {
        const page = await getPageWithContent(
          '<ld-notice mode="success">Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.</ld-notice>',
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });

    describe("with custom icon", () => {
      it("info", async () => {
        const page = await getPageWithContent(
          `<ld-notice headline="With custom icon" mode="info">
              <ld-icon slot="custom-icon" name="placeholder" size="lg"></ld-icon>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
            </ld-notice>`,
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("error", async () => {
        const page = await getPageWithContent(
          `<ld-notice headline="With custom icon" mode="error">
              <ld-icon slot="custom-icon" name="placeholder" size="lg"></ld-icon>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
            </ld-notice>`,
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("warning", async () => {
        const page = await getPageWithContent(
          `<ld-notice headline="With custom icon" mode="warning">
              <ld-icon slot="custom-icon" name="placeholder" size="lg"></ld-icon>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
            </ld-notice>`,
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("success", async () => {
        const page = await getPageWithContent(
          `<ld-notice headline="With custom icon" mode="success">
              <ld-icon slot="custom-icon" name="placeholder" size="lg"></ld-icon>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
            </ld-notice>`,
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });
  });

  describe("css component", () => {
    describe("with headline", () => {
      it("info", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--info">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Headline</p>
            Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("warning", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--warning">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Headline</p>
            Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("error", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--error">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Headline</p>
            Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("success", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--success">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24.5C18.6274 24.5 24 19.1274 24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 19.1274 5.37258 24.5 12 24.5Z" fill="currentColor"/>
              <path d="M16.898 9.56123L10.4404 15.4388L7.10205 12.147" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">Success message</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice, LdTypo] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();

        const accessibilityReport = await analyzeAccessibility(page);
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });
    });

    describe("without headline", () => {
      it("info", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--info">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("warning", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--warning">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("error", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--error">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
              <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
            </svg>
            Lorem ipsum <a href="https://example.com/">dolor sit amet</a>, consectetur adipiscing elit. Metus pellentesque facilisi <code>nunc iaculis</code>. Laoreet eget eu lacus cursus <b>odio quam</b> ut elementum. Faucibus cursus <strong>in placerat</strong> enim non senectus. In molestie volutpat at <i>sem bibendum</i> ac id. Suspendisse erat <u>malesuada vulputate</u> et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("success", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--success">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24.5C18.6274 24.5 24 19.1274 24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 19.1274 5.37258 24.5 12 24.5Z" fill="currentColor"/>
              <path d="M16.898 9.56123L10.4404 15.4388L7.10205 12.147" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });

    describe("with custom icon", () => {
      it("info", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--info">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentcolor" stroke-width="2"/>
              <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">With custom icon</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("error", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--error">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentcolor" stroke-width="2"/>
              <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">With custom icon</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("warning", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--warning">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentcolor" stroke-width="2"/>
              <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">With custom icon</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("success", async () => {
        const page = await getPageWithContent(
          `
          <div class="ld-notice ld-notice--success">
            <svg class="ld-notice__icon ld-icon ld-icon--lg" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentcolor" stroke-width="2"/>
              <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            <p class="ld-notice__headline ld-typo--h4">With custom icon</p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio quam ut elementum. Faucibus cursus in placerat enim non senectus. In molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada vulputate et congue blandit in erat ornare. Rhoncus interdum.
          </div>`,
          { components: [LdIcon, LdNotice] },
        );
        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });
  });
});
