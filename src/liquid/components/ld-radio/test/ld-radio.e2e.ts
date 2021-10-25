import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdRadio } from '../ld-radio'

jest.useRealTimers()

const tones = [undefined, 'dark']
const checkedStates = [false, true]

const allowableMismatchedRatio = 0.02

const dotAndBox = `
  <div class="ld-radio__dot"></div>
  <div class="ld-radio__box"></div>
`

describe('ld-radio', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    describe(`themed${toneStr}`, () => {
      for (const checkedState of checkedStates) {
        const checkedStateStr = checkedState ? ' checked' : ''

        it(`default ${toneStr}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}"></ld-radio>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr}></ld-radio>`
          )
          const radio = await page.find('ld-radio')
          await radio.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr}></ld-radio>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Disabled
        it(`disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr} disabled></ld-radio>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr} disabled></ld-radio>`
          )
          const radio = await page.find('ld-radio')
          await radio.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr} disabled></ld-radio>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Aria-disabled
        it(`aria-disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-radio>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`aria-disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-radio>`
          )
          const radio = await page.find('ld-radio')
          await radio.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`aria-disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-radio tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-radio>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Themed CSS component
        const toneModifier = tone ? ` ld-radio--${tone}` : ''
        it(`css component default ${toneStr}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr}></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr}></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          await page.hover('.ld-radio')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr}></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Disabled CSS component
        it(`css component disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} disabled></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}" disabled>
                <input type="radio" ${checkedStateStr} disabled></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          await page.hover('.ld-radio')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} disabled></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}" aria-disabled="true">
                <input type="radio" ${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          await page.hover('.ld-radio')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
        })
        it(`css component aria-disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-radio${toneModifier}">
                <input type="radio" ${checkedStateStr} aria-disabled="true"></input>${dotAndBox}
              </div>`,
            undefined,
            LdRadio
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedRatio })
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
})
