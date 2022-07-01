import { getPageWithContent } from 'src/liquid/utils/e2e-tests'

const sizes = ['sm', 'md', 'lg']

const getSwitchHTML = (props = '') => `
  <ld-switch ${props}>
    <ld-switch-item label="Fruits" value="fruits"></ld-switch-item>
    <ld-switch-item label="Vegetables" value="vegetables"></ld-switch-item>
    <ld-switch-item label="Nuts" value="nuts" disabled></ld-switch-item>
  </ld-switch>
`

const brandColor = {
  bgColor: 'var(--ld-thm-primary)',
  notWrapped: true,
}

describe('ld-switch', () => {
  it(`default`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`hover`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.hover('ld-switch-item:nth-of-type(2)')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`hover selected`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.hover('ld-switch-item:nth-of-type(1)')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`hover disabled`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.hover('ld-switch-item:nth-of-type(3)')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`focus`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`focus selected`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`focus disabled`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`active`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.down('Space')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`active selected`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.down('Space')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`active disabled`, async () => {
    const page = await getPageWithContent(getSwitchHTML())
    await page.keyboard.press('Tab')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await page.keyboard.down('Space')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  describe('brand-color', () => {
    it(`default`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`hover`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.hover('ld-switch-item:nth-of-type(2)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`hover selected`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.hover('ld-switch-item:nth-of-type(1)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`hover disabled`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.hover('ld-switch-item:nth-of-type(3)')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`focus`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`focus selected`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`focus disabled`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`active`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`active selected`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.keyboard.press('Tab')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it(`active disabled`, async () => {
      const page = await getPageWithContent(
        getSwitchHTML('brand-color'),
        brandColor
      )
      await page.keyboard.press('Tab')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.press('ArrowRight')
      await page.keyboard.down('Space')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('size', () => {
    for (const size of sizes) {
      it(`size ${size}`, async () => {
        const page = await getPageWithContent(getSwitchHTML(`size="${size}"`))
        await page.keyboard.press('Tab')
        await page.keyboard.press('ArrowRight')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    }
  })
})
