import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdSelect } from '../ld-select'

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
  describe('single', () => {
    it('default', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('selected', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('focus', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Size
    it('size sm', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('size lg selected', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" size="lg">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Custom trigger icon
    describe('custom trigger icon ', () => {
      it('default', async () => {
        const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
        <ld-icon slot="icon" name="placeholder"></ld-icon>
      </ld-select>`)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
      it('size sm', async () => {
        const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
        <ld-icon slot="icon" name="placeholder"></ld-icon>
      </ld-select>`)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
      it('size lg selected', async () => {
        const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" size="lg">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
        <ld-icon slot="icon" name="placeholder"></ld-icon>
      </ld-select>`)
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })

    // Disabled
    it('disabled', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" disabled>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('disabled focus', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" disabled>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Aria-disabled
    it('aria-disabled', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('aria-disabled focus', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Invalid
    it('invalid', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick a fruit" name="fruit" invalid>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    describe('internal option', () => {
      it('focus', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('selected', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        await page.keyboard.press('ArrowUp')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('selected focus', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('disabled', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple" disabled>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('Space')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('disabled focus', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple" disabled>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })
  })

  describe('multiple', () => {
    it('default', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple">Apple</ld-option>
        <ld-option value="banana">Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('selected', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('selected disabled', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple disabled>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('selected aria-disabled', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple aria-disabled="true">
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('focus clear all button', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('hover clear all button', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const btnClear = await page.find('ld-select >>> .ld-select__btn-clear')
      await btnClear.hover()
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('focus selection', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('invalid selected', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple invalid>
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('size sm selected', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple size="sm">
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('size lg selected', async () => {
      const page = await getPageWithContent(`
      <ld-select placeholder="Pick some fruits" name="fruits" multiple size="lg">
        <ld-option value="apple" selected>Apple</ld-option>
        <ld-option value="banana" selected>Banana</ld-option>
      </ld-select>`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    it('max-rows', async () => {
      const page = await getPageWithContent(`
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
      </ld-select>`)
      await new Promise((resolve) => setTimeout(resolve, 100))
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    describe('internal option', () => {
      it('focus', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('selected', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('selected focus', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('disabled', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple" disabled>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('disabled focus', async () => {
        const page = await getPageWithContent(`
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple" disabled>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>`)
        await page.keyboard.press('Tab')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        await page.keyboard.press('ArrowDown')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })
  })

  describe('css component', () => {
    it('default', async () => {
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
    it('hover', async () => {
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
    it('focus', async () => {
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
    it('disabled', async () => {
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
    it('disabled hover', async () => {
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
    it('disabled focus', async () => {
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
    it('aria-disabled', async () => {
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
    it('aria-disabled hover', async () => {
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
    it('aria-disabled focus', async () => {
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
  describe('z-order', () => {
    fit('current selection is still visible when opened in a container with a set z-order', async () => {
      const page = await getPageWithContent(`
      <div style="will-change: transform">
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      </div>`)
      await page.keyboard.press('Tab')
      await page.waitForChanges()
      await page.keyboard.press('ArrowDown')
      await page.waitForChanges()
      await page.keyboard.press('ArrowDown')
      await page.waitForChanges()
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })
})
