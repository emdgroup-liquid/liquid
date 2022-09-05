import { getPageWithContent } from 'src/liquid/utils/e2e-tests'
import { LdBgCells } from '../ld-bg-cells'

const cellTypes = [
  'bioreliance',
  'f',
  'hexagon',
  'millipore',
  'milliq',
  'o',
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

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells class="custom" />
        <style>
          .custom {
            --ld-bg-cells-layer-translation-x: 20%;
            --ld-bg-cells-layer-size: 300%;
          }
        </style>`
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })
  })

  describe('css component', () => {
    it(`default`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells">
          <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/liquid/assets/hexagon-cell.svg')"></div>
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
            <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/liquid/assets/${cellType}-cell.svg')"></div>
          </div>`,
          { components: LdBgCells }
        )
        const results = await page.compareScreenshot()

        expect(results).toMatchScreenshot()
      })
    })

    it(`with custom css vars`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-bg-cells custom">
          <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/liquid/assets/hexagon-cell.svg')"></div>
        </div>
        <style>
          .custom {
            --ld-bg-cells-layer-translation-x: 20%;
            --ld-bg-cells-layer-size: 300%;
          }
        </style>`,
        { components: LdBgCells }
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it('with three layers', async () => {
      const page = await getPageWithContent(
        `<ld-bg-cells three-layers></ld-bg-cells>`,
        { components: LdBgCells }
      )
      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })
  })
})
