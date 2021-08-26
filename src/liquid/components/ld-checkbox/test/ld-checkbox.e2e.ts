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
  await page.addStyleTag({ path: './dist/css/ld-checkbox.css' })
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

const checkAndBox = `
  <svg
    class="ld-checkbox__check"
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
  <div class="ld-checkbox__box"></div>
`

describe('ld-checkbox', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    describe(`themed${toneStr}`, () => {
      for (const theme of themes) {
        for (const checkedState of checkedStates) {
          const checkedStateStr = checkedState ? ' checked' : ''

          // Themed
          it(`default theme-${theme}${toneStr}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-checkbox tone="${tone}"></ld-checkbox>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-checkbox tone="${tone}" ${checkedStateStr}></ld-checkbox>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Disabled
          it(`disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-checkbox tone="${tone}" ${checkedStateStr} disabled></ld-checkbox>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-checkbox tone="${tone}" ${checkedStateStr} disabled></ld-checkbox>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Aria-disabled
          it(`aria-disabled theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-checkbox tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-checkbox>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<ld-checkbox tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-checkbox>`,
              theme
            )
            await page.keyboard.press('Tab')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })

          // Themed CSS component
          const toneModifier = tone ? ` ld-checkbox--${tone}` : ''
          it(`css component default theme-${theme}${toneStr}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-checkbox')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr}></input>${checkAndBox}
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
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component disabled hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}" disabled>
                <input type="checkbox" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-checkbox')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} disabled></input>${checkAndBox}
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
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
              theme
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component aria-disabled hover theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}" aria-disabled="true">
                <input type="checkbox" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
              theme
            )
            await page.hover('.ld-checkbox')
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot({ allowableMismatchedRatio })
          })
          it(`css component aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
            const page = await getPageWithContent(
              `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
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
      const page = await getPageWithContent(`<ld-checkbox></ld-checkbox>`)
      const ldCheckbox = await page.find('ld-checkbox')
      const input = await ldCheckbox.find('input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(true)
    })

    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-checkbox aria-disabled="true"></ld-checkbox>`
      )
      const ldCheckbox = await page.find('ld-checkbox')
      const input = await ldCheckbox.find('input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(false)
    })
  })
})
