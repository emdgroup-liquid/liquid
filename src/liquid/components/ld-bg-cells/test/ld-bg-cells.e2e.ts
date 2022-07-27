import { getPageWithContent } from 'src/liquid/utils/e2e-tests'
import { LdTypo } from '../../ld-typo/ld-typo'
import { LdBgCells } from '../ld-bg-cells'

const cellTypes = [
  'bioreliance',
  'f',
  'hexagon',
  'millipore',
  'safc',
  'sigma-aldrich',
  'supelco',
  't',
  'tile',
]

describe('ld-bg-cells', () => {
  describe('web component', () => {
    it(`default`, async () => {
      const page = await getPageWithContent(`<ld-bg-cells />`)
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    cellTypes.forEach((cellType) => {
      it(`type ${cellType}`, async () => {
        const page = await getPageWithContent(
          `<ld-bg-cells type="${cellType}" />`
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot()
      })
    })

    it(`with repeating cell pattern`, async () => {
      const page = await getPageWithContent(`<ld-bg-cells repeat />`)
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells class="custom" />
        <style>
          .custom {
            --ld-bg-cells-position: bottom left;
            --ld-bg-cells-size: 150%;
          }
        </style>`
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
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

      expect(results).toMatchScreenshot()
    })
  })

  describe('css component', () => {
    it(`default`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells">
          <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/liquid/assets/hexagon-cell.svg')"></div>
        </div>`,
        { components: LdBgCells }
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    cellTypes.forEach((cellType) => {
      it(`type ${cellType}`, async () => {
        const page = await getPageWithContent(
          `<div class="ld-bg-cells ld-bg-cells--${cellType} ">
            <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/liquid/assets/${cellType}-cell.svg')"></div>
          </div>`,
          { components: LdBgCells }
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot()
      })
    })

    it(`with repeating cell pattern`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells">
          <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/liquid/assets/hexagon-cell.svg')"></div>
        </div>`,
        { components: LdBgCells }
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells custom">
          <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/liquid/assets/hexagon-cell.svg')"></div>
        </div>
        <style>
          .custom {
            --ld-bg-cells-position: bottom left;
            --ld-bg-cells-size: 150%;
          }
        </style>`,
        { components: LdBgCells }
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`with scrollable content`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells" style="height: 9rem; width: 15rem">
          <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/liquid/assets/hexagon-cell.svg')"></div>
          <div class="ld-bg-cells__content">
            <p class="ld-typo" style="color: var(--ld-col-wht); margin: var(--ld-sp-16)">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>`,
        { components: [LdBgCells, LdTypo] }
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })
  })
})
