import { newE2EPage } from '@stencil/core/testing'
import { ThemeName } from '../../../types/theme'

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './src/docs/global/styles/reset.css' })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  await page.addStyleTag({ path: './dist/css/ld-toggle.css' })
  await page.addStyleTag({ content: '*:focus { outline: none; }' })
  return page
}

const themes = [
  'none',
  ThemeName.ocean.toLowerCase(),
  ThemeName.bubblegum.toLowerCase(),
  // ThemeName.shake.toLowerCase(),
  // ThemeName.solvent.toLowerCase(),
  // ThemeName.tea.toLowerCase(),
]
const checkedStates = [false, true]
const allowableMismatchedPixels = 20

describe('ld-toggle', () => {
  describe(`themed`, () => {
    for (const theme of themes) {
      for (const checkedState of checkedStates) {
        const checkedStateStr = checkedState ? ' checked' : ''

        // Themed
        it(`default theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle ${checkedStateStr}></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Disabled
        it(`disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle ${checkedStateStr} disabled></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle ${checkedStateStr} disabled></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Aria-disabled
        it(`aria-disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle ${checkedStateStr} aria-disabled="true"></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle ${checkedStateStr} aria-disabled="true"></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Themed CSS component
        it(`css component default theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Disabled CSS component
        it(`css component disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
      }
    }
  })
})
