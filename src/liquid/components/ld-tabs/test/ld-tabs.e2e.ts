import { newE2EPage } from '@stencil/core/testing'

jest.useRealTimers()

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: flex; justify-content: center; align-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
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

const rounded = ['all', 'all-lg', 'top', 'top-lg']

const sizes = ['sm', 'lg']

const cssIconComponent = `
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
`

const getTabsHTML = (props = '', withText = true, withIcon = false) => `
  <ld-tabs ${props}>
    <ld-tablist>
      <ld-tab selected>${withIcon ? cssIconComponent : ''}${
  withText ? 'Fruits' : ''
}</ld-tab>
      <ld-tab>${withIcon ? cssIconComponent : ''}${
  withText ? 'Vegetables' : ''
}</ld-tab>
      <ld-tab>${withIcon ? cssIconComponent : ''}${
  withText ? 'Nuts' : ''
}</ld-tab>
      <ld-tab disabled>${withIcon ? cssIconComponent : ''}${
  withText ? 'Grain' : ''
}</ld-tab>
    </ld-tablist>
  </ld-tabs>
`

const getManyTabsHTML = (props = '') => `
  <ld-tabs ${props} style="max-width: calc(100% - var(--ld-sp-24)*2)">
    <ld-tablist>
      <ld-tab selected>Classical</ld-tab>
      <ld-tab>Rock</ld-tab>
      <ld-tab>Indie</ld-tab>
      <ld-tab>Jazz</ld-tab>
      <ld-tab>Blues</ld-tab>
      <ld-tab>Soul</ld-tab>
      <ld-tab>Gospel</ld-tab>
      <ld-tab>Pop</ld-tab>
      <ld-tab>Hip Hop</ld-tab>
      <ld-tab>Raggea</ld-tab>
      <ld-tab>Raggeaton</ld-tab>
      <ld-tab>R&B</ld-tab>
      <ld-tab>Electric</ld-tab>
      <ld-tab>Country</ld-tab>
      <ld-tab>Punk</ld-tab>
      <ld-tab>Latin</ld-tab>
      <ld-tab>Funk</ld-tab>
      <ld-tab>Ambient</ld-tab>
      <ld-tab>Bossa Nova</ld-tab>
      <ld-tab>Flamenco</ld-tab>
    </ld-tablist>
  </ld-tabs>
`

const allowableMismatchedRatio = 0.02

describe('ld-checkbox', () => {
  for (const theme of themes) {
    it(`default theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`hover theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.hover('ld-tab:nth-of-type(2)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`hover selected theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.hover('ld-tab:nth-of-type(1)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`hover disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.hover('ld-tab:nth-of-type(3)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`focus theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`focus selected theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`focus disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`active theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`active selected theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.keyboard.press('Tab')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`active disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(getTabsHTML(), theme)
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  }

  describe('mode', () => {
    for (const theme of themes) {
      it(`ghost theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost hover theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.hover('ld-tab:nth-of-type(2)')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost hover selected theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.hover('ld-tab:nth-of-type(1)')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost hover disabled theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.hover('ld-tab:nth-of-type(3)')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost focus theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost focus selected theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost focus disabled theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost active theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost active selected theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost active disabled theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="ghost"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`ghost theme-${theme} many`, async () => {
        const page = await getPageWithContent(
          getManyTabsHTML('mode="ghost"'),
          theme
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color hover theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.hover('ld-tab:nth-of-type(2)')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color hover selected theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.hover('ld-tab:nth-of-type(1)')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color hover disabled theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.hover('ld-tab:nth-of-type(3)')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color focus theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color focus selected theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color focus disabled theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color active theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color active selected theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color active disabled theme-${theme}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML('mode="brand-color"'),
          theme
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowRight')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`brand-color theme-${theme} many`, async () => {
        const page = await getPageWithContent(
          getManyTabsHTML('mode="brand-color"'),
          theme
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
    }
  })

  describe('rounded corners', () => {
    for (const r of rounded) {
      it(`rounded ${r}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML(`mode="brand-color" rounded="${r}"`)
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
    }
  })

  describe('size', () => {
    for (const size of sizes) {
      it(`size ${size}`, async () => {
        const page = await getPageWithContent(getTabsHTML(`size="${size}"`))
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
    }
  })

  describe('with icons', () => {
    for (const size of sizes) {
      it(`icon and text size ${size}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML(`size="${size}"`, true, true)
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`icon only size ${size}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML(`size="${size}"`, false, true)
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
    }
  })
})
