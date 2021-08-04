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

const tones = [undefined, 'dark']
const checkedStates = [false, true]

const allowableMismatchedRatio = 0.02

const checkAndBox = `
  <svg
    class="ld-toggle__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-toggle__box"></div>
`

describe('ld-toggle', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    describe(`themed${toneStr}`, () => {
      for (const theme of themes) {
        for (const checkedState of checkedStates) {
          const checkedStateStr = checkedState ? ' checked' : ''

          // Themed
          it(`default theme-${theme}${toneStr}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-toggle tone="${tone}"></ld-toggle>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-toggle tone="${tone}" ${checkedStateStr}></ld-toggle>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Disabled
          it(`disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-toggle tone="${tone}" ${checkedStateStr} disabled></ld-toggle>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-toggle tone="${tone}" ${checkedStateStr} disabled></ld-toggle>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Aria-disabled
          it(`aria-disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-toggle tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-toggle>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-toggle tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-toggle>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Themed CSS component
          const toneModifier = tone ? ` ld-toggle--${tone}` : ''
          it(`css component default theme-${theme}${toneStr}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-toggle')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Disabled CSS component
          it(`css component disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component disabled hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}" disabled>
                <input type="toggle" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-toggle')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Aria-disabled CSS component
          it(`css component aria-disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component aria-disabled hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}" aria-disabled="true">
                <input type="toggle" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-toggle')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-toggle${toneModifier}">
                <input type="toggle" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
        }
      }
    })
  }

  describe('aria-disabled', () => {
    it('does not prevent input value changes without an aria-disabled attribute', async () => {
      const page = await getPageWithContent(`<ld-toggle></ld-toggle>`)
      const ldToggle = await page.find('ld-toggle')
      const input = await ldToggle.find('input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(true)
    })

    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-toggle aria-disabled="true"></ld-toggle>`
      )
      const ldToggle = await page.find('ld-toggle')
      const input = await ldToggle.find('input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(false)
    })
  })
})
