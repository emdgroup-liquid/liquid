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
  await page.addStyleTag({ path: './dist/css/ld-button.css' })
  await page.addStyleTag({ content: '*:focus { outline: none; }' })
  return page
}

const themes = [
  'none',
  ThemeName.ocean.toLowerCase(),
  // ThemeName.bubblegum.toLowerCase(),
  // ThemeName.shake.toLowerCase(),
  // ThemeName.solvent.toLowerCase(),
  ThemeName.tea.toLowerCase(),
]

const modes = [
  '',
  'highlight',
  'secondary',
  'on-brand-color',
  'secondary-on-brand-color',
  'ghost',
  'danger',
]

const cssIconComponent = `
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
`

const allowableMismatchedRatio = 0.02

describe('ld-button', () => {
  for (const mode of modes) {
    const modeStr = mode ? ` ${mode}` : ''
    describe(`themed${modeStr}`, () => {
      for (const theme of themes) {
        // Themed
        it(`default theme-${theme}${modeStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.hover('ld-button')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`active theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Disabled
        it(`disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.hover('ld-button')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled active theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Aria-disabled
        it(`aria-disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`aria-disabled hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.hover('ld-button')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`aria-disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`aria-disabled active theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            theme
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Progress button
        it(`progress button theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button progress="0.75">Text</ld-button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        it(`progress button secondary theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button progress="0.75" mode="secondary">Text</ld-button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        it(`progress button ghost theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<ld-button progress="0.75" mode="ghost">Text</ld-button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Themed CSS component
        const modeModifier = mode ? ` ld-button--${mode}` : ''
        it(`css component default theme-${theme}${modeStr}`, async () => {
          const page = await getPageWithContent(
            `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.hover('.ld-button')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component active theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Disabled CSS component
        it(`css component disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.hover('.ld-button')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled active theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled hover theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.hover('.ld-button')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled focus theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled active theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
            theme
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Progress button CSS component
        it(`css component progress button theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-busy="true" aria-live="polite" class="ld-button">
              Text
              <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
            </button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        it(`css component progress button secondary theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-busy="true" aria-live="polite" class="ld-button ld-button--secondary">
              Text
              <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
            </button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        it(`css component progress button ghost theme-${theme}`, async () => {
          const page = await getPageWithContent(
            `<button aria-busy="true" aria-live="polite" class="ld-button ld-button--ghost">
              Text
              <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
            </button>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
      }
    })
  }

  describe('sizes', () => {
    it('sm', async () => {
      const page = await getPageWithContent(
        '<ld-button size="sm">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('lg', async () => {
      const page = await getPageWithContent(
        '<ld-button size="lg">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('icon only', () => {
    it('icon button', async () => {
      const page = await getPageWithContent(
        '<ld-button><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('icon button sm', async () => {
      const page = await getPageWithContent(
        '<ld-button size="sm"><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('icon button lg', async () => {
      const page = await getPageWithContent(
        '<ld-button size="lg"><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('justify content with custom width', () => {
    it('justify center', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="center">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('justify start', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="start">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('justify end', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="end">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('justify between', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="between">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('multiline with text align', () => {
    it('multiline text centered', async () => {
      const page = await getPageWithContent(
        '<ld-button>Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.</ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('multiline text left', async () => {
      const page = await getPageWithContent(
        '<ld-button align-text="left"><ld-icon name="placeholder"></ld-icon>Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.</ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('multiline text right', async () => {
      const page = await getPageWithContent(
        '<ld-button align-text="right">Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('as anchor', () => {
    it('anchor with target blank', async () => {
      const page = await getPageWithContent(
        `<ld-button href="#" target="_blank">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })
})
