import {
  analyzeAccessibility,
  getPageWithContent,
} from "../../../utils/e2e-tests";
import { LdLink } from "../ld-link";
import { LdTypo } from "../../ld-typo/ld-typo";

describe("ld-link", () => {
  describe("web component", () => {
    it("is accessible", async () => {
      const page = await getPageWithContent("<ld-link>link</ld-link>");
      const accessibilityReport = await analyzeAccessibility(page);
      expect(accessibilityReport).toHaveNoAccessibilityIssues();
    });

    it("default", async () => {
      const page = await getPageWithContent(`
        <ld-typo variant="body-xs">
          <b>XS</b>: Lorem ipsum <ld-link>dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
        <ld-typo variant="body-m">
          <b>S</b>: Lorem ipsum <ld-link>dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
        <ld-typo variant="body-xl">
          <b>M</b>: Lorem ipsum <ld-link>dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
      `);
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });

    it("with chevron start", async () => {
      const page = await getPageWithContent(`
        <ld-typo variant="body-xs">
          <b>XS</b>: Lorem ipsum <ld-link chevron="start">dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
        <ld-typo variant="body-m">
          <b>S</b>: Lorem ipsum <ld-link chevron="start">dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
        <ld-typo variant="body-xl">
          <b>M</b>: Lorem ipsum <ld-link chevron="start">dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
      `);
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });

    it("with chevron end", async () => {
      const page = await getPageWithContent(`
        <ld-typo variant="body-xs">
          <b>XS</b>: Lorem ipsum <ld-link chevron="end">dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
        <ld-typo variant="body-m">
          <b>S</b>: Lorem ipsum <ld-link chevron="end">dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
        <ld-typo variant="body-xl">
          <b>M</b>: Lorem ipsum <ld-link chevron="end">dolor sit amet</ld-link>, consectetur adipiscing elit.
        </ld-typo>
      `);
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });

    it("breaks", async () => {
      const page = await getPageWithContent(`
        <ld-typo>
          Lorem ipsum dolor sit amet, <ld-link>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</ld-link>, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ld-typo>
      `);
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });
  });

  describe("css component", () => {
    it("default", async () => {
      const page = await getPageWithContent(
        `
        <p class="ld-typo--body-xs">
          <b>XS</b>: Lorem ipsum <a class="ld-link">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
        <p class="ld-typo--body-m">
          <b>S</b>: Lorem ipsum <a class="ld-link">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
        <p class="ld-typo--body-xl">
          <b>M</b>: Lorem ipsum <a class="ld-link">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
      `,
        { components: [LdLink, LdTypo] },
      );
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();

      const accessibilityReport = await analyzeAccessibility(page);
      expect(accessibilityReport).toHaveNoAccessibilityIssues();
    });

    it("with chevron start", async () => {
      const page = await getPageWithContent(
        `
        <p class="ld-typo--body-xs">
          <b>XS</b>: Lorem ipsum <a class="ld-link ld-link--chevron-start">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
        <p class="ld-typo--body-m">
          <b>S</b>: Lorem ipsum <a class="ld-link ld-link--chevron-start">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
        <p class="ld-typo--body-xl">
          <b>M</b>: Lorem ipsum <a class="ld-link ld-link--chevron-start">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
      `,
        { components: [LdLink, LdTypo] },
      );
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });

    it("with chevron end", async () => {
      const page = await getPageWithContent(
        `
        <p class="ld-typo--body-xs">
          <b>XS</b>: Lorem ipsum <a class="ld-link ld-link--chevron-end">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
        <p class="ld-typo--body-m">
          <b>S</b>: Lorem ipsum <a class="ld-link ld-link--chevron-end">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
        <p class="ld-typo--body-xl">
          <b>M</b>: Lorem ipsum <a class="ld-link ld-link--chevron-end">dolor sit amet</a>, consectetur adipiscing elit.
        </p>
      `,
        { components: [LdLink, LdTypo] },
      );
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });

    it("breaks", async () => {
      const page = await getPageWithContent(
        `
        <p class="ld-typo--body-m">
          Lorem ipsum dolor sit amet, <a class="ld-link">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</a>, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      `,
        { components: [LdLink, LdTypo] },
      );
      const results = await page.compareScreenshot();
      expect(results).toMatchScreenshot();
    });
  });
});
