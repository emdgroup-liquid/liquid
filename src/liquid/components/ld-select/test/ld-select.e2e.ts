import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdSelect } from '../ld-select'

jest.useRealTimers()

const selectIcon = `
  <svg
    role="presentation"
    class="ld-select__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="3"
      d="M3 6l5 4 5-4"
    />
  </svg>
`

describe('ld-select', () => {
  // Single select mode
  it(`single`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single focus`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Size
  it(`single size sm`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single size lg selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" size="lg">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Custom trigger icon
  it(`single custom trigger icon size sm`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
        <ld-icon slot="icon" name="placeholder"></ld-icon>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single custom trigger icon`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
        <ld-icon slot="icon" name="placeholder"></ld-icon>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single custom trigger icon size lg selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" size="lg">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
        <ld-icon slot="icon" name="placeholder"></ld-icon>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Disabled
  it(`single disabled`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" disabled>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single disabled focus`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" disabled>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Aria-disabled
  it(`single aria-disabled`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`single aria-disabled focus`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Invalid
  it(`single invalid`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick a fruit" name="fruit" invalid>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Multiple select mode
  it(`multiple`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple selected disabled`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple disabled>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple selected aria-disabled`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple aria-disabled="true">
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple focus clear all button`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple hover clear all button`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const btnClear = await page.find('ld-select >>> .ld-select__btn-clear')
    await btnClear.hover()
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple focus selection`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple invalid selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple invalid>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple size sm selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple size="sm">
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple size lg selected`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple size="lg">
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it(`multiple max-rows`, async () => {
    const page = await getPageWithContent(
      `
      <ld-select placeholder="Pick some fruits" name="fruits" multiple max-rows="2" style="max-width: 20rem">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
        <ld-option value="strawberry" selected>Strawberry</ld-option>
        <ld-option value="watermelon" disabled>Watermelon</ld-option>
        <ld-option value="honeymelon">Honeymelon</ld-option>
        <ld-option value="rasberry">Rasberry</ld-option>
        <ld-option value="cherry" selected>Cherry</ld-option>
        <ld-option value="blueberry">Blueberry</ld-option>
        <ld-option value="peach" selected>Peach</ld-option>
        <ld-option value="grape" selected>Grape</ld-option>
        <ld-option value="fuyu persimmon" selected>Fuyu Persimmon</ld-option>
        <ld-option value="monstera deliciosa">Monstera Deliciosa</ld-option>
        <ld-option value="pear" selected>Pear</ld-option>
        <ld-option value="pineapple" selected>Pineapple</ld-option>
        <ld-option value="plum" selected>Plum</ld-option>
      </ld-select>`
    )
    await new Promise((resolve) => setTimeout(resolve, 100))
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // CSS component
  it(`css component default`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits">
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`css component hover`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits">
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    await page.hover('.ld-select')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`css component focus`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits">
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Disabled CSS component
  it(`css component disabled`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits" disabled>
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`css component disabled hover`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits" disabled>
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    await page.hover('.ld-select')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`css component disabled focus`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits" disabled>
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  // Aria-disabled CSS component
  it(`css component aria-disabled`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits" aria-disabled="true">
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`css component aria-disabled hover`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits" aria-disabled="true">
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    await page.hover('.ld-select')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
  it(`css component aria-disabled focus`, async () => {
    const page = await getPageWithContent(
      `
      <div class='ld-select'>
        <select name="fruits" aria-disabled="true">
          <option value="">Pick a fruit</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
        </select>${selectIcon}
      </div>`,
      { components: LdSelect }
    )
    await page.keyboard.press('Tab')
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
