import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdSelect } from '../ld-select'

jest.useRealTimers()

const themes = [
  'none',
  // 'ocean',
  // 'bubblegum',
  // 'shake',
  // 'solvent',
  // 'tea',
]

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

const allowableMismatchedRatio = 0.02

describe('ld-select', () => {
  for (const theme of themes) {
    // Single select mode
    it(`single theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single focus theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Size
    it(`single size sm theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single size lg selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" size="lg">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Custom trigger icon
    it(`single custom trigger icon size sm theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-icon slot="icon" name="placeholder"></ld-icon>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single custom trigger icon theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-icon slot="icon" name="placeholder"></ld-icon>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single custom trigger icon size lg selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" size="lg">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
          <ld-icon slot="icon" name="placeholder"></ld-icon>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Disabled
    it(`single disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" disabled>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single disabled focus theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" disabled>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Aria-disabled
    it(`single aria-disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`single aria-disabled focus theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Invalid
    it(`single invalid theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick a fruit" name="fruit" invalid>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Multiple select mode
    it(`multiple theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple selected disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple disabled>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple selected aria-disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple aria-disabled="true">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple focus clear all button theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple hover clear all button theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const btnClear = await page.find('ld-select >>> .ld-select__btn-clear')
      await btnClear.hover()
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple focus selection theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple invalid selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple invalid>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple size sm selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple size="sm">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple size lg selected theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple size="lg">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>`,
        theme
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    it(`multiple max-rows theme-${theme}`, async () => {
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
        </ld-select>`,
        theme
      )
      await new Promise((resolve) => setTimeout(resolve, 100))
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Themed CSS component
    it(`css component default theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits">
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`css component hover theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits">
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      await page.hover('.ld-select')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`css component focus theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits">
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Disabled CSS component
    it(`css component disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits" disabled>
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`css component disabled hover theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits" disabled>
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      await page.hover('.ld-select')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`css component disabled focus theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits" disabled>
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })

    // Aria-disabled CSS component
    it(`css component aria-disabled theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits" aria-disabled="true">
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`css component aria-disabled hover theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits" aria-disabled="true">
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      await page.hover('.ld-select')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it(`css component aria-disabled focus theme-${theme}`, async () => {
      const page = await getPageWithContent(
        `
        <div class='ld-select'>
          <select name="fruits" aria-disabled="true">
            <option value="">Pick a fruit</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
          </select>${selectIcon}
        </div>`,
        theme,
        LdSelect
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  }
})
