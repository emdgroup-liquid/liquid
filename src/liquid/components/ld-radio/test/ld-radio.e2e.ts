import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdRadio } from '../ld-radio'

jest.useRealTimers()

const tones = [undefined, 'dark']
const checkedStates = [false, true]

const dotAndBox = `
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
`

describe('ld-radio', () => {
  for (const tone of tones) {
    describe(tone ? `tone ${tone}` : 'no tone', () => {
      for (const checkedState of checkedStates) {
        const checkedStateStr = checkedState ? ' checked' : ''

        it(`default${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"></ld-radio>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`hover${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr}></ld-radio>`
          )
          const radio = await page.find('ld-radio')
          await radio.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`focus${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr}></ld-radio>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Disabled
        it(`disabled${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr} disabled></ld-radio>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`disabled hover${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr} disabled></ld-radio>`
          )
          const radio = await page.find('ld-radio')
          await radio.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`disabled focus${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr} disabled></ld-radio>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Aria-disabled
        it(`aria-disabled${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr} aria-disabled="true"></ld-radio>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`aria-disabled hover${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr} aria-disabled="true"></ld-radio>`
          )
          const radio = await page.find('ld-radio')
          await radio.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`aria-disabled focus${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"${checkedStateStr} aria-disabled="true"></ld-radio>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component
        const toneModifier = tone ? ` ld-radio--${tone}` : ''
        it(`css component default${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr}></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component hover${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr}></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          await page.hover('.ld-radio')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component focus${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr}></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Disabled CSS component
        it(`css component disabled${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr} disabled></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component disabled hover${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}" disabled>
              <input type="radio"${checkedStateStr} disabled></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          await page.hover('.ld-radio')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component disabled focus${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr} disabled></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component aria-disabled hover${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}" aria-disabled="true">
              <input type="radio"${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          await page.hover('.ld-radio')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component aria-disabled focus${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
              <input type="radio"${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
            </div>`,
            { components: LdRadio }
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      }
    })
  }

  describe('aria-disabled', () => {
    it('does not prevent input value changes without an aria-disabled attribute', async () => {
      const page = await getPageWithContent(`<ld-radio></ld-radio>`)
      const input = await page.find('ld-radio >>> input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(true)
    })

    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-radio aria-disabled="true"></ld-radio>`
      )
      const input = await page.find('ld-radio >>> input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(false)
    })
  })

  it('emits input event', async () => {
    const page = await getPageWithContent(
      `
      <form id="example-form" novalidate>
        <ld-radio value="orange" name="fruit" required invalid></ld-radio>
        <ld-radio value="banana" name="fruit" required invalid></ld-radio>
      </form>
      <script>
        const orangeRadio = document.querySelector('#example-form ld-radio:first-of-type')
        const bananaRadio = document.querySelector('#example-form ld-radio:last-of-type')
        function validateInput() {
          value = orangeRadio.checked || bananaRadio.checked
          if (!value) {
            orangeRadio.setAttribute('invalid', 'true')
            bananaRadio.setAttribute('invalid', 'true')
            return false
          }
          orangeRadio.removeAttribute('invalid')
          bananaRadio.removeAttribute('invalid')
          return true
        }
        orangeRadio.addEventListener('input', validateInput)
        bananaRadio.addEventListener('input', validateInput)
      </script>`
    )
    const ldRadioOrange = await page.find('ld-radio[value="orange"]')
    expect(ldRadioOrange).toHaveAttribute('invalid')

    ldRadioOrange.click()
    await page.waitForChanges()

    expect(ldRadioOrange).not.toHaveAttribute('invalid')
  })
})
