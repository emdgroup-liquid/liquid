import {
  analyzeAccessibility,
  getPageWithContent,
} from "../../../utils/e2e-tests";

const attributeMap = {
  default: "",
  disabled: " disabled",
  negative: " negative",
  unit: ' unit="%" stops="20,50,75"',
  "aria-disabled indicators step": ' aria-disabled="true" indicators step="10"',
  "aria-disabled indicators stops":
    ' aria-disabled="true" indicators stops="20,50,75"',
  "aria-disabled negative": ' aria-disabled="true" negative',
  "aria-disabled": ' aria-disabled="true"',
  "custom width": ' width="450px"',
  "custom width indicators step": ' step="10" width="450px"',
  "custom width indicators stops": ' stops="20,50,75" width="450px"',
  "disabled indicators step": ' disabled indicators step="10"',
  "disabled indicators stops": ' disabled indicators stops="20,50,75"',
  "disabled negative": " disabled negative",
  "hide stop labels": ' hide-stop-labels indicators stops="20,50,75"',
  "hide value labels": " hide-value-labels",
  "hide values": " hide-values",
  "indicators step": ' indicators step="10"',
  "indicators stops": ' indicators stops="20,50,75"',
};

// It's important to set the initial value(s) in a way that they always
// match the attributes, because otherwise value correction applies and
// states (hover, etc.) may not work properly.
describe("ld-slider", () => {
  Object.entries(attributeMap).forEach(([description, attributes]) => {
    describe(description, () => {
      it("single value", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
        );

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("min value", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="0"></ld-slider>`,
        );

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("max value", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="100"></ld-slider>`,
        );

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("multiple values", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="20,50"></ld-slider>`,
        );

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("hover", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
          { reducedMotion: true },
        );

        const input = await page.find("ld-slider >>> input");
        // Only works with `value="50"`, because it positions in the middle
        // of the input, but actually needs to position right on the thumb.
        await input.hover();

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("focus", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
          { reducedMotion: true },
        );

        await page.keyboard.press("Tab");

        const results = await page.compareScreenshot();
        const accessibilityReport = await analyzeAccessibility(page);

        expect(results).toMatchScreenshot();
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("active", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} value="50"></ld-slider>`,
          { reducedMotion: true },
        );

        const input = await page.find("ld-slider >>> input");
        // Only works with `value="50"`, because it positions in the middle
        // of the input, but actually needs to position right on the thumb.
        await input.hover();
        await page.mouse.down();

        const results = await page.compareScreenshot();
        const accessibilityReport = await analyzeAccessibility(page);

        expect(results).toMatchScreenshot();
        expect(accessibilityReport).toHaveNoAccessibilityIssues();
      });

      it("size sm", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} size="sm" value="50"></ld-slider>`,
        );

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });

      it("size lg", async () => {
        const page = await getPageWithContent(
          `<ld-slider${attributes} size="lg" value="50"></ld-slider>`,
        );

        const results = await page.compareScreenshot();
        expect(results).toMatchScreenshot();
      });
    });
  });
});
