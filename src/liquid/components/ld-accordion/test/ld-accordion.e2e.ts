import {
  analyzeAccessibility,
  getPageWithContent,
} from "../../../utils/e2e-tests";

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor quisque lectus morbi mauris, tortor dictum elementum. Morbi volutpat senectus lacus sapien viverra quis volutpat. Mauris sed lacus ipsum dictumst egestas. Elit cras at interdum id porta magnis accumsan sit pulvinar. Mi dignissim gravida venenatis, nibh dignissim tincidunt enim. Lectus diam lobortis pharetra amet et nec. Est vitae vitae porttitor varius ac. Faucibus enim augue ac sollicitudin massa. Ipsum quis elementum amet tristique. A felis nunc iaculis maecenas id.";

describe("ld-accordion", () => {
  it("default", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Potato, cucumber, tomato</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Walnut, chestnut, strawberry</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("is accessible", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Potato, cucumber, tomato</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Walnut, chestnut, strawberry</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );
    page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it("hover", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    await page.hover("ld-accordion-toggle");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("focus", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("active", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    await page.keyboard.press("Tab");
    await page.keyboard.down("Space");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("dark", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion tone="dark">
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Potato, cucumber, tomato</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Walnut, chestnut, strawberry</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      { notWrapped: true, reducedMotion: true, bgColor: "var(--ld-col-wht)" },
    );
    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("on brand color", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion brand-color>
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Potato, cucumber, tomato</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Walnut, chestnut, strawberry</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        bgColor: "var(--ld-thm-primary)",
        notWrapped: true,
        reducedMotion: true,
      },
    );
    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("on brand color hover", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion brand-color>
        <ld-accordion-section>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-thm-primary)",
      },
    );

    await page.hover("ld-accordion-toggle");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("on brand color focus", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion brand-color>
        <ld-accordion-section>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-thm-primary)",
      },
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("on brand color active", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion brand-color>
        <ld-accordion-section>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-thm-primary)",
      },
    );

    await page.keyboard.press("Tab");
    await page.keyboard.down("Space");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("rounded", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion rounded brand-color>
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Potato, cucumber, tomato</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Walnut, chestnut, strawberry</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        bgColor: "var(--ld-thm-primary)",
        notWrapped: true,
        reducedMotion: true,
      },
    );

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("detached", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion detached rounded brand-color>
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Potato, cucumber, tomato</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Walnut, chestnut, strawberry</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        bgColor: "var(--ld-thm-primary)",
        notWrapped: true,
        reducedMotion: true,
      },
    );

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("split focus label", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section>
          <ld-accordion-toggle split>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    await page.keyboard.press("Tab");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("split focus trigger", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section>
          <ld-accordion-toggle split>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">Apple, orange, banana</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.waitForChanges();

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  it("nested", async () => {
    const page = await getPageWithContent(
      `
      <ld-accordion>
        <ld-accordion-section expanded>
          <ld-accordion-toggle>Fruits</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-accordion tone="dark" style="margin: var(--ld-sp-24) var(--ld-accordion-padding-x)">
              <ld-accordion-section>
                <ld-accordion-toggle>Sweet</ld-accordion-toggle>
                <ld-accordion-panel>
                  <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                </ld-accordion-panel>
              </ld-accordion-section>
              <ld-accordion-section expanded>
                <ld-accordion-toggle>Sour</ld-accordion-toggle>
                <ld-accordion-panel>
                  <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                </ld-accordion-panel>
              </ld-accordion-section>
              <ld-accordion-section>
                <ld-accordion-toggle>Bitter</ld-accordion-toggle>
                <ld-accordion-panel>
                  <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                </ld-accordion-panel>
              </ld-accordion-section>
              <ld-accordion-section>
                <ld-accordion-toggle disabled>Salty</ld-accordion-toggle>
                <ld-accordion-panel>
                  <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                </ld-accordion-panel>
              </ld-accordion-section>
            </ld-accordion>
          </ld-accordion-panel>
        </ld-accordion-section>
          <ld-accordion-section>
            <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
            <ld-accordion-panel>
              <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
            </ld-accordion-panel>
          </ld-accordion-section>
        <ld-accordion-section>
          <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
          <ld-accordion-panel>
            <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
          </ld-accordion-panel>
        </ld-accordion-section>
      </ld-accordion>`,
      {
        notWrapped: true,
        reducedMotion: true,
        bgColor: "var(--ld-col-neutral-010)",
      },
    );

    const result = await page.compareScreenshot();
    expect(result).toMatchScreenshot();
  });

  describe("auto-scroll", () => {
    it("auto-scrolls", async () => {
      const page = await getPageWithContent(
        `
        <div style="height: 100%; width: 100%; overflow-y: scroll">
          <div style="height: 100px"></div>
          <ld-accordion>
            <ld-accordion-section expanded>
              <ld-accordion-toggle>Fruits</ld-accordion-toggle>
              <ld-accordion-panel>
                <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
              </ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle>Vegetables</ld-accordion-toggle>
              <ld-accordion-panel>
                <ld-accordion tone="dark" style="margin: var(--ld-sp-24) var(--ld-accordion-padding-x)">
                <ld-accordion-section>
                  <ld-accordion-toggle>Sweet</ld-accordion-toggle>
                  <ld-accordion-panel>
                    <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                  </ld-accordion-panel>
                </ld-accordion-section>
                <ld-accordion-section expanded>
                  <ld-accordion-toggle>Sour</ld-accordion-toggle>
                  <ld-accordion-panel>
                    <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                  </ld-accordion-panel>
                </ld-accordion-section>
                <ld-accordion-section>
                  <ld-accordion-toggle>Bitter</ld-accordion-toggle>
                  <ld-accordion-panel>
                    <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                  </ld-accordion-panel>
                </ld-accordion-section>
                <ld-accordion-section>
                  <ld-accordion-toggle disabled>Salty</ld-accordion-toggle>
                  <ld-accordion-panel>
                    <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
                  </ld-accordion-panel>
                </ld-accordion-section>
              </ld-accordion>
              </ld-accordion-panel>
            </ld-accordion-section>
            <ld-accordion-section>
              <ld-accordion-toggle disabled>Nuts</ld-accordion-toggle>
              <ld-accordion-panel>
                <ld-typo variant="body-s" style="padding: var(--ld-sp-12) var(--ld-accordion-padding-x)">${loremIpsum}</ld-typo>
              </ld-accordion-panel>
            </ld-accordion-section>
          </ld-accordion>
          <div style="height: 400px"></div>
        </div>`,
        {
          notWrapped: true,
          reducedMotion: true,
          bgColor: "var(--ld-col-neutral-010)",
        },
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Space");
      await page.waitForChanges();

      const screenshotScroll1 = await page.compareScreenshot(
        "after expansion of outer panel",
      );
      expect(screenshotScroll1).toMatchScreenshot();

      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Space");
      await page.waitForChanges();

      const screenshotScroll2 = await page.compareScreenshot(
        "after expansion of inner panel",
      );
      expect(screenshotScroll2).toMatchScreenshot();
    });
  });
});
