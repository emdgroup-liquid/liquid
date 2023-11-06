import { getPageWithContent } from "../../../utils/e2e-tests";
import { LdBgCells } from "../ld-bg-cells";
import { readFileSync } from "node:fs";

const cellTypes = [
  "bioreliance",
  "f",
  "hexagon",
  "mdo",
  "millipore",
  "milliq",
  "o",
  "safc",
  "sigma-aldrich",
  "supelco",
  "t",
  "tile",
];

function fetchLayers(cellType: string): {
  primaryLayer: string;
  secondaryLayer: string;
} {
  const patternString = readFileSync(
    `./dist/liquid/assets/${cellType}-cell.svg`,
  ).toString();

  const primaryLayer = patternString.replace(
    "<svg",
    '<svg class="ld-bg-cells__layer"',
  );
  const secondaryLayer = patternString.replace(
    "<svg",
    '<svg class="ld-bg-cells__secondary-layer"',
  );

  return { primaryLayer, secondaryLayer };
}

describe("ld-bg-cells", () => {
  describe("web component", () => {
    it(`default`, async () => {
      const page = await getPageWithContent(`<ld-bg-cells />`);
      const results = await page.compareScreenshot();

      expect(results).toMatchScreenshot();
    });

    cellTypes.forEach((cellType) => {
      it(`type ${cellType}`, async () => {
        const page = await getPageWithContent(
          `<ld-bg-cells type="${cellType}" />`,
        );
        const results = await page.compareScreenshot();

        expect(results).toMatchScreenshot();
      });
    });

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells class="custom" />
        <style>
          .custom {
            --ld-bg-cells-layer-translation-x: 20%;
            --ld-bg-cells-layer-size: 300%;
          }
        </style>`,
      );
      const results = await page.compareScreenshot();

      expect(results).toMatchScreenshot();
    });
  });

  describe("css component", () => {
    it(`default`, async () => {
      const { primaryLayer, secondaryLayer } = await fetchLayers("hexagon");
      const page = await getPageWithContent(
        `<div class="ld-bg-cells">
          ${secondaryLayer}
          ${primaryLayer}
        </div>`,
        { components: LdBgCells },
      );
      const results = await page.compareScreenshot();

      expect(results).toMatchScreenshot();
    });

    cellTypes.forEach((cellType) => {
      it(`type ${cellType}`, async () => {
        const { primaryLayer, secondaryLayer } = await fetchLayers(cellType);

        const page = await getPageWithContent(
          `<div class="ld-bg-cells ld-bg-cells--${cellType}">
            ${secondaryLayer}
            ${primaryLayer}
          </div>`,
          { components: LdBgCells },
        );
        const results = await page.compareScreenshot();

        expect(results).toMatchScreenshot();
      });
    });

    it(`with custom css vars`, async () => {
      const { primaryLayer, secondaryLayer } = await fetchLayers("hexagon");
      const page = await getPageWithContent(
        `<div class="ld-bg-cells custom">
          ${secondaryLayer}
          ${primaryLayer}
        </div>
        <style>
          .custom {
            --ld-bg-cells-layer-translation-x: 20%;
            --ld-bg-cells-layer-size: 300%;
          }
        </style>`,
        { components: LdBgCells },
      );
      const results = await page.compareScreenshot();

      expect(results).toMatchScreenshot();
    });

    it("with three layers", async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells three-layers></ld-bg-cells>`,
        { components: LdBgCells },
      );
      const results = await page.compareScreenshot();

      expect(results).toMatchScreenshot();
    });
  });
});
