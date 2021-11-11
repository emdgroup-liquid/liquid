import { getPageWithContent } from 'src/liquid/utils/e2e-tests'

jest.useRealTimers()

const rounded = ['all', 'all-lg', 'top', 'top-lg']

const sizes = ['sm', 'lg']

const getTabsHTML = (props = '', withText = true, withIcon = false) => {
  const getContent = (text) =>
    (withIcon ? '<ld-icon name="placeholder"></ld-icon>' : '') +
    (withText ? text : '')
  return `
  <ld-tabs>
    <ld-tablist ${props}>
      <ld-tab selected>${getContent('Fruits')}</ld-tab>
      <ld-tab>${getContent('Vegetables')}</ld-tab>
      <ld-tab>${getContent('Nuts')}</ld-tab>
      <ld-tab disabled>${getContent('Grain')}</ld-tab>
    </ld-tablist>
  </ld-tabs>
`
}

const getManyTabsHTML = (props = '') => `
  <ld-tabs style="max-width: calc(100% - var(--ld-sp-24)*2)">
    <ld-tablist ${props}>
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

describe('ld-tabs', () => {
  it(`default`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`hover`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.hover('ld-tab:nth-of-type(2)')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`hover selected`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.hover('ld-tab:nth-of-type(1)')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`hover disabled`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.hover('ld-tab:nth-of-type(3)')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`focus`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`focus selected`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`focus disabled`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`active`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.down('Space')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`active selected`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.down('Space')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`active disabled`, async () => {
    const page = await getPageWithContent(getTabsHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.down('Space')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`many`, async () => {
    const page = await getPageWithContent(getManyTabsHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('mode', () => {
    it(`ghost`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost hover`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.hover('ld-tab:nth-of-type(2)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost hover selected`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.hover('ld-tab:nth-of-type(1)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost hover disabled`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.hover('ld-tab:nth-of-type(3)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost focus`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost focus selected`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost focus disabled`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost active`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost active selected`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.keyboard.press('Tab')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost active disabled`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="ghost"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`ghost many`, async () => {
      const page = await getPageWithContent(getManyTabsHTML('mode="ghost"'))
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color hover`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.hover('ld-tab:nth-of-type(2)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color hover selected`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.hover('ld-tab:nth-of-type(1)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color hover disabled`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.hover('ld-tab:nth-of-type(3)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color focus`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color focus selected`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color focus disabled`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color active`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color active selected`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.keyboard.press('Tab')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color active disabled`, async () => {
      const page = await getPageWithContent(getTabsHTML('mode="brand-color"'))
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`brand-color many`, async () => {
      const page = await getPageWithContent(
        getManyTabsHTML('mode="brand-color"')
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('rounded corners', () => {
    for (const r of rounded) {
      it(`rounded ${r}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML(`mode="brand-color" rounded="${r}"`)
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    }
  })

  describe('size', () => {
    for (const size of sizes) {
      it(`size ${size}`, async () => {
        const page = await getPageWithContent(getTabsHTML(`size="${size}"`))
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    }
  })

  describe('with icons', () => {
    for (const size of sizes) {
      it(`icon and text size ${size}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML(`size="${size}"`, true, true)
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it(`icon only size ${size}`, async () => {
        const page = await getPageWithContent(
          getTabsHTML(`size="${size}"`, false, true)
        )
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    }
  })
})
