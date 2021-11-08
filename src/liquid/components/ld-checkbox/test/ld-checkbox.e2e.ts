import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdCheckbox } from '../ld-checkbox'

jest.useRealTimers()

const tones = [undefined, 'dark']
const checkedStates = [false, true]

const checkAndBox = `
  <svg
    class="ld-checkbox__check"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L5.40795 10L2 6.63964"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <div class="ld-checkbox__box"></div>
`

describe('ld-checkbox', () => {
  for (const tone of tones) {
    const toneStr = tone ? ` ${tone}` : ''
    describe(`themed${toneStr}`, () => {
      for (const checkedState of checkedStates) {
        const checkedStateStr = checkedState ? ' checked' : ''

        it(`default ${toneStr}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}"></ld-checkbox>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr}></ld-checkbox>`
          )
          const checkbox = await page.find('ld-checkbox')
          await checkbox.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr}></ld-checkbox>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Disabled
        it(`disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr} disabled></ld-checkbox>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr} disabled></ld-checkbox>`
          )
          const checkbox = await page.find('ld-checkbox')
          await checkbox.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr} disabled></ld-checkbox>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Aria-disabled
        it(`aria-disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-checkbox>`
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`aria-disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-checkbox>`
          )
          const checkbox = await page.find('ld-checkbox')
          await checkbox.hover()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`aria-disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-checkbox tone="${tone}" ${checkedStateStr} aria-disabled="true"></ld-checkbox>`
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Themed CSS component
        const toneModifier = tone ? ` ld-checkbox--${tone}` : ''
        it(`css component default ${toneStr}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          await page.hover('.ld-checkbox')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr}></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Disabled CSS component
        it(`css component disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}" disabled>
                <input type="checkbox" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          await page.hover('.ld-checkbox')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} disabled></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component aria-disabled hover ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}" aria-disabled="true">
                <input type="checkbox" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
          )
          await page.hover('.ld-checkbox')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component aria-disabled focus ${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-checkbox${toneModifier}">
                <input type="checkbox" ${checkedStateStr} aria-disabled="true"></input>${checkAndBox}
              </div>`,
            undefined,
            LdCheckbox
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
      const page = await getPageWithContent(`<ld-checkbox></ld-checkbox>`)
      const input = await page.find('ld-checkbox >>> input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(true)
    })

    it('prevents input value changes with an aria-disabled attribute', async () => {
      const page = await getPageWithContent(
        `<ld-checkbox aria-disabled="true"></ld-checkbox>`
      )
      const input = await page.find('ld-checkbox >>> input')

      await input.press('Space')

      await page.waitForChanges()

      const checked = await input.getProperty('checked')
      expect(checked).toBe(false)
    })
  })
})
