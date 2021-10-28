import { getPageWithContent } from 'src/liquid/utils/e2e-tests'
import { LdTypo } from '../../ld-typo/ld-typo'
import { LdBgCells } from '../ld-bg-cells'

const cellTypes = [
  'bioreliance',
  'f',
  'hexagon',
  'millipore',
  'qa-x2f-qc',
  'safc',
  'sigma-aldrich',
  't',
  'tile',
]
const allowableMismatchedPixels = 2000

jest.useRealTimers()

describe('ld-bg-cells', () => {
  describe('web component', () => {
    it(`default`, async () => {
      const page = await getPageWithContent(`<ld-bg-cells />`)
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })

    cellTypes.forEach((cellType) => {
      it(`type ${cellType}`, async () => {
        const page = await getPageWithContent(
          `<ld-bg-cells type="${cellType}" />`
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })
    })

    it(`with repeating cell pattern`, async () => {
      const page = await getPageWithContent(`<ld-bg-cells repeat />`)
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells class="custom" />
        <style>
          .custom {
            --ld-bg-cells-background-color: var(--ld-col-vm2);
            --ld-bg-cells-foreground-color: var(--ld-col-vm4);
            --ld-bg-cells-position: bottom left;
            --ld-bg-cells-size: 150%;
          }
        </style>`
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })

    it(`with scrollable content`, async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells style="height: 9rem; width: 15rem">
          <ld-typo style="color: var(--ld-col-wht); margin: var(--ld-sp-16)">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </ld-typo>
        </ld-bg-cells>`
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })
  })

  // TODO: create separate css file per cell type to fix css component
  xdescribe('css component', () => {
    it(`default`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells ld-bg-cells--safc">
          <div class="ld-bg-cells__pattern"></div>
        </div>`,
        undefined,
        LdBgCells
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })

    cellTypes.forEach((cellType) => {
      it(`type ${cellType}`, async () => {
        const page = await getPageWithContent(
          `<div class="ld-bg-cells ld-bg-cells--${cellType} ">
            <div class="ld-bg-cells__pattern"></div>
          </div>`,
          undefined,
          LdBgCells
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot({ allowableMismatchedPixels })
      })
    })

    it(`with repeating cell pattern`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells ld-bg-cells--safc">
          <div class="ld-bg-cells__pattern ld-bg-cells__pattern--repeat"></div>
        </div>`,
        undefined,
        LdBgCells
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells ld-bg-cells--safc custom">
          <div class="ld-bg-cells__pattern"></div>
        </div>
        <style>
          .custom {
            --ld-bg-cells-background-color: var(--ld-col-vm2);
            --ld-bg-cells-foreground-color: var(--ld-col-vm4);
            --ld-bg-cells-position: bottom left;
            --ld-bg-cells-size: 150%;
          }
        </style>`,
        undefined,
        LdBgCells
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })

    it(`with scrollable content`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells ld-bg-cells--safc" style="height: 9rem; width: 15rem">
          <div class="ld-bg-cells__pattern"></div>
          <div class="ld-bg-cells__content">
            <p class="ld-typo--body-m" style="color: var(--ld-col-wht); margin: var(--ld-sp-16)">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>`,
        undefined,
        [LdBgCells, LdTypo]
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot({ allowableMismatchedPixels })
    })
  })
})
