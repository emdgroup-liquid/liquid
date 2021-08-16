import { newE2EPage } from '@stencil/core/testing'
import { ThemeName } from '../../../types/theme'

jest.useRealTimers()

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './src/docs/global/styles/reset.css' })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  await page.addStyleTag({ path: './dist/css/ld-input.css' })
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

const allowableMismatchedRatio = 0.02

const cssIconComponent = `
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
`

describe('ld-input', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    describe(`themed${toneStr}`, () => {
      for (const theme of themes) {
        // Themed
        it(`default theme-${theme}${toneStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-input tone="${tone}" placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`with value theme-${theme}${toneStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-input tone="${tone}" value="Value"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-input tone="${tone}" placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Disabled
        it(`disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-input tone="${tone}" disabled placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled with value theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-input tone="${tone}" disabled value="Value"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-input tone="${tone}" disabled placeholder="Placeholder"><ld-icon slot="end" name="placeholder"></ld-icon></ld-input>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Themed CSS component
        const toneModifier = tone ? ` ld-input--${tone}` : ''
        it(`css component default theme-${theme}${toneStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}"><input placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component with value theme-${theme}${toneStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}"><input value="Value"></input>${cssIconComponent}</div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}"><input placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          await page.hover('.ld-input')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}"><input placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Disabled CSS component
        it(`css component disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" disabled><input disabled placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled with value theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" disabled><input disabled value="Value"></input>${cssIconComponent}</div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" disabled><input disabled placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          await page.hover('.ld-input')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" disabled><input disabled placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled with value theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" value="Value"></input>${cssIconComponent}</div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          await page.hover('.ld-input')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-input${toneModifier}" aria-disabled="true"><input aria-disabled="true" placeholder="Placeholder"></input>${cssIconComponent}</div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
      }
    })
  }

  describe('aria-disabled', () => {
    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-input aria-disabled="true"></ld-input>`
      )
      const ldInput = await page.find('ld-input')
      const input = await ldInput.find('input')

      await input.press('8')
      await input.press('8')
      await input.press(' ')

      await page.keyboard.down('Shift')
      await input.press('KeyM')
      await input.press('KeyP')
      await input.press('KeyH')
      await page.keyboard.up('Shift')

      await page.waitForChanges()

      const value = await input.getProperty('value')
      expect(value).toBe('')
    })
  })
})
