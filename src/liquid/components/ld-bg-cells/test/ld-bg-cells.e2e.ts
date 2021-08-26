import { newE2EPage } from '@stencil/core/testing'

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div${
      theme !== 'none' ? ` class="ld-theme-${theme}"` : ''
    } style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  await page.addStyleTag({ path: './dist/css/ld-paragraph.css' })
  await page.addStyleTag({ path: './dist/css/ld-bg-cells.css' })
  await page.addStyleTag({ content: 'body { margin: 0; }' })
  return page
}

const themes = [
  'none',
  'ocean',
  'bubblegum',
  // 'shake',
  // 'solvent',
  // 'tea',
]
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
  for (const theme of themes) {
    describe(`theme ${theme}`, () => {
      describe('web component', () => {
        it(`default`, async () => {
          const page = await getPageWithContent(
            `<ld-bg-cells></ld-bg-cells>`,
            theme
          )
          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        cellTypes.forEach((cellType) => {
          it(`type ${cellType}`, async () => {
            const page = await getPageWithContent(
              `<ld-bg-cells type="${cellType}"></ld-bg-cells>`,
              theme
            )
            const results = await page.compareScreenshot()

            expect(results).toMatchScreenshot({ allowableMismatchedPixels })
          })
        })

        it(`with repeating cell pattern`, async () => {
          const page = await getPageWithContent(
            `<ld-bg-cells repeat></ld-bg-cells>`,
            theme
          )
          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        it(`with custom css vars`, async () => {
          const page = await getPageWithContent(
            `<ld-bg-cells class="custom"></ld-bg-cells>
            <style>
              .custom {
                --ld-bg-cells-background-color: var(--ld-col-vm2);
                --ld-bg-cells-foreground-color: var(--ld-col-vm4);
                --ld-bg-cells-position: bottom left;
                --ld-bg-cells-size: 150%;
              }
            </style>`,
            theme
          )
          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        it(`with scrollable content`, async () => {
          const page = await getPageWithContent(
            `<ld-bg-cells style="height: 9rem; width: 15rem">
              <ld-paragraph style="color: var(--ld-col-wht); margin: var(--ld-sp-16)">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
              </ld-paragraph>
            </ld-bg-cells>`,
            theme
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
            theme
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
              theme
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
            theme
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
            theme
          )
          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        it(`with scrollable content`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-bg-cells ld-bg-cells--safc" style="height: 9rem; width: 15rem">
              <div class="ld-bg-cells__pattern"></div>
              <div class="ld-bg-cells__content">
                <p class="ld-paragraph" style="color: var(--ld-col-wht); margin: var(--ld-sp-16)">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>`,
            theme
          )
          const results = await page.compareScreenshot()

          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
      })
    })
  }
})
