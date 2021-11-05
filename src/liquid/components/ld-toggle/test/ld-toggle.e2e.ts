import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdToggle } from '../ld-toggle'

jest.useRealTimers()

const themes = [
  'ocean',
  'bubblegum',
  // 'shake',
  // 'solvent',
  // 'tea',
]
const checkedStates = [false, true]

describe('ld-toggle', () => {
  describe(`themed`, () => {
    for (const theme of themes) {
      for (const checkedState of checkedStates) {
        const checkedStateStr = checkedState ? ' checked' : ''

        // Themed
        it(`default theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} />`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} />`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Large
        it(`large theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} />`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`large focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} />`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons
        it(`with icons theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (large)
        it(`with icons (large) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (large) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Disabled
        it(`disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} disabled />`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} disabled />`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (disabled)
        it(`with icons (disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (large, disabled)
        it(`with icons (large, disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (large, disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Aria-disabled
        it(`aria-disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} aria-disabled="true" />`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} aria-disabled="true" />`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (aria-disabled)
        it(`with icons (aria-disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (aria-disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (large, aria-disabled)
        it(`with icons (large, aria-disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (large, aria-disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Invalid
        it(`invalid theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} required />`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`invalid focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} required />`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (invalid)
        it(`with icons (invalid) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (invalid) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // With icons (large, invalid)
        it(`with icons (large, invalid) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`with icons (large, invalid) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle size="lg"${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Themed CSS component
        it(`css component default theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Large CSS component
        it(`css component large theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component large focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons
        it(`css component with icons theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (large)
        it(`css component with icons (large) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (large) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Disabled CSS component
        it(`css component disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (disabled)
        it(`css component with icons (disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (large, disabled)
        it(`css component with icons (large, disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (large, disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (aria-disabled)
        it(`css component with icons (aria-disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (aria-disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (large, aria-disabled)
        it(`css component with icons (large, aria-disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (large, aria-disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // Invalid CSS component
        it(`css component invalid theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component invalid focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme,
            LdToggle
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (invalid)
        it(`css component with icons (invalid) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (invalid) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        // CSS component with icons (large, invalid)
        it(`css component with icons (large, invalid) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it(`css component with icons (large, invalid) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
                </svg>
              </div>`,
            theme,
            [LdToggle, LdIcon]
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
      }
    }
  })

  // Test is necessary, as unit tests can only test key events,
  // if a key event handler is explicitly assigned
  it('toggles on space key', async () => {
    const page = await getPageWithContent(`<ld-toggle />`)
    const input = await page.find('ld-toggle >>> input')

    await page.keyboard.press('Tab')
    await page.keyboard.press('Space')
    await page.waitForChanges()

    const checked = await input.getProperty('checked')
    expect(checked).toBe(true)
  })
})
