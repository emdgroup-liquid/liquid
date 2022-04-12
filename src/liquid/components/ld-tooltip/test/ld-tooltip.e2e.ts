import { getPageWithContent } from '../../../utils/e2e-tests'

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
      </ld-tooltip>`,
      { disableAllTransitions: true }
    )
    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`default trigger (focus)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`,
      { disableAllTransitions: true }
    )
    await page.keyboard.press('Tab')
    await new Promise((resolve) => setTimeout(resolve, 200))

    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`default trigger (hover)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`,
      { disableAllTransitions: true }
    )
    await page.hover('ld-tooltip')
    await new Promise((resolve) => setTimeout(resolve, 200))

    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom clickable trigger`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-button slot="trigger">Click me</ld-button>
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`,
      { disableAllTransitions: true }
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
      </ld-tooltip>`,
      { disableAllTransitions: true }
    )
    await page.keyboard.press('Tab')
    await new Promise((resolve) => setTimeout(resolve, 200))

    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  it(`custom clickable trigger (hover)`, async () => {
    const page = await getPageWithContent(
      `<ld-tooltip trigger-type="click">
        <ld-button slot="trigger">Click me</ld-button>
        <ld-typo variant="h4" style="margin-bottom: 10px">Headline</ld-typo>
        <ld-typo>${loremipsum}</ld-typo>
      </ld-tooltip>`,
      { disableAllTransitions: true }
    )
    await page.hover('ld-tooltip')
    await new Promise((resolve) => setTimeout(resolve, 200))

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
      trigger!</p>`,
      { disableAllTransitions: true }
    )
    await new Promise((resolve) => setTimeout(resolve, 200))
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
      trigger!</p>`,
      { disableAllTransitions: true }
    )
    await page.keyboard.press('Tab')
    await new Promise((resolve) => setTimeout(resolve, 200))

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
      trigger!</p>`,
      { disableAllTransitions: true }
    )
    await page.hover('ld-tooltip')
    await new Promise((resolve) => setTimeout(resolve, 200))

    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })

  positions.forEach((position) => {
    it(`position ${position} (default)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip position="${position}">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`,
        { disableAllTransitions: true }
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve, 200))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`position ${position} (with arrow)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip arrow position="${position}">
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`,
        { disableAllTransitions: true }
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve, 200))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`position ${position} (custom trigger)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip position="${position}">
          <ld-button slot="trigger">Trigger</ld-button>
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`,
        { disableAllTransitions: true }
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve, 200))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })

    it(`position ${position} (custom trigger with arrow)`, async () => {
      const page = await getPageWithContent(
        `<ld-tooltip arrow position="${position}">
          <ld-button slot="trigger">Trigger</ld-button>
          <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
        </ld-tooltip>`,
        { disableAllTransitions: true }
      )
      await page.keyboard.press('Tab')
      await new Promise((resolve) => setTimeout(resolve, 200))

      const results = await page.compareScreenshot()

      expect(results).toMatchScreenshot()
    })
  })

  it('size sm', async () => {
    const page = await getPageWithContent(
      `<ld-tooltip size="sm">
        <ld-typo>I'm the small size tooltip.</ld-typo>
      </ld-tooltip>`,
      { disableAllTransitions: true }
    )
    await page.keyboard.press('Tab')
    await new Promise((resolve) => setTimeout(resolve, 200))

    const results = await page.compareScreenshot()

    expect(results).toMatchScreenshot()
  })
})
