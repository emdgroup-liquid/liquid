import { newE2EPage } from '@stencil/core/testing'

jest.useRealTimers()

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './src/docs/global/styles/reset.css' })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  await page.addStyleTag({ path: './dist/css/ld-radio.css' })
  await page.addStyleTag({ content: '*:focus { outline: none; }' })
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

const tones = [undefined, 'dark']
const checkedStates = [false, true]

const allowableMismatchedRatio = 0.02

const dotAndBox = `
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
`

describe('ld-radio', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    describe(`themed${toneStr}`, () => {
      for (const theme of themes) {
        for (const checkedState of checkedStates) {
          const checkedStateStr = checkedState ? ' checked' : ''

          // Themed
          it(`default theme-${theme}${toneStr}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-radio tone="${tone}"></ld-radio>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-radio tone="${tone}" ${checkedStateStr}></ld-radio>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Disabled
          it(`disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-radio tone="${tone}" ${checkedStateStr} disabled></ld-radio>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-radio tone="${tone}" ${checkedStateStr} disabled></ld-radio>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Aria-disabled
          it(`aria-disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-radio tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-radio>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-radio tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-radio>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Themed CSS component
          const toneModifier = tone ? ` ld-radio--${tone}` : ''
          it(`css component default theme-${theme}${toneStr}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr}></input>${dotAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr}></input>${dotAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-radio')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr}></input>${dotAndBox}
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
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} disabled></input>${dotAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component disabled hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}" disabled>
                <input type="radio" ${checkedStateStr} disabled></input>${dotAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-radio')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} disabled></input>${dotAndBox}
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
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component aria-disabled hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}" aria-disabled="true">
                <input type="radio" ${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-radio')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
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
      const page = await getPageWithContent(`<ld-radio></ld-radio>`)
      const ldRadio = await page.find('ld-radio')
      const input = await ldRadio.find('input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(true)
    })

    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-radio aria-disabled="true"></ld-radio>`
      )
      const ldRadio = await page.find('ld-radio')
      const input = await ldRadio.find('input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(false)
    })
  })
})
