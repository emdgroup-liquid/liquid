import { getPageWithContent } from '../../../utils/e2e-tests'

jest.useRealTimers()

const positions = [
  'bottom center',
  'bottom left',
  'bottom right',
  'left bottom',
  'left middle',
  'left top',
  'right bottom',
  'right middle',
  'right top',
  'top center',
  'top left',
  'top right',
]

const loremipsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

describe('ld-tooltip', () => {
  it(`default trigger`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip>
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`
    )
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`default trigger (focus)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`default trigger (hover)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`
    )
    await page.hover('ld-tooltip')
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom clickable trigger`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-button slot="trigger">Click me</ld-button>
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`
    )
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom clickable trigger (focus)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-button slot="trigger">Click me</ld-button>
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom clickable trigger (hover)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-button slot="trigger">Click me</ld-button>
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`
    )
    await page.hover('ld-tooltip')
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom inline trigger`, async () => {
    const page = await getPageWithContent(
      `<p>
        I am an
        <ld-tooltip trigger-type="click">
          <span slot="trigger" style="text-decoration: underline">inline</span>
          <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
          <ld-typo>
            ${loremipsum}
          </ld-typo>
        </ld-tooltip>
      trigger!</p>`
    )
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom inline trigger (focus)`, async () => {
    const page = await getPageWithContent(
      `<p>
        I am an
        <ld-tooltip trigger-type="click">
          <span slot="trigger" style="text-decoration: underline">inline</span>
          <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
          <ld-typo>
            ${loremipsum}
          </ld-typo>
        </ld-tooltip>
      trigger!</p>`
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom inline trigger (hover)`, async () => {
    const page = await getPageWithContent(
      `<p>
        I am an
        <ld-tooltip trigger-type="click">
          <span slot="trigger" style="text-decoration: underline">inline</span>
          <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
          <ld-typo>
            ${loremipsum}
          </ld-typo>
        </ld-tooltip>
      trigger!</p>`
    )
    await page.hover('ld-tooltip')
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  positions.forEach((position) => {
    it(`position ${position} (default)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip position="${position}">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`position ${position} (with arrow)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip arrow position="${position}">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`position ${position} (custom trigger)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip position="${position}">
          <ld-button slot="trigger">Trigger</ld-button>
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`position ${position} (custom trigger with arrow)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip arrow position="${position}">
          <ld-button slot="trigger">Trigger</ld-button>
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })
  })
})
