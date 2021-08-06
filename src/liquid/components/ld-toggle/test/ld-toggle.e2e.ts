import { newE2EPage } from '@stencil/core/testing'
import { ThemeName } from '../../../types/theme'

async function getPageWithContent(content, theme = 'none') {
  const page = await newE2EPage()
  await page.setContent(
    `<div class="ld-theme-${theme}" style="height: 100vh; display: grid; place-items: center">${content}</div>`
  )
  await page.addStyleTag({ path: './src/docs/global/styles/reset.css' })
  await page.addStyleTag({ path: './dist/css/liquid.global.css' })
  await page.addStyleTag({ path: './src/docs/utils/fontsBase64.css' })
  await page.addStyleTag({ path: './dist/css/ld-toggle.css' })
  await page.addStyleTag({ path: './dist/css/ld-icon.css' })
  await page.addStyleTag({ content: '*:focus { outline: none; }' })
  return page
}

const themes = [
  'none',
  ThemeName.ocean.toLowerCase(),
  ThemeName.bubblegum.toLowerCase(),
  // ThemeName.shake.toLowerCase(),
  // ThemeName.solvent.toLowerCase(),
  // ThemeName.tea.toLowerCase(),
]
const checkedStates = [false, true]
const allowableMismatchedPixels = 20

describe('ld-toggle', () => {
  describe(`themed`, () => {
    for (const theme of themes) {
      for (const checkedState of checkedStates) {
        const checkedStateStr = checkedState ? ' checked' : ''

        // Themed
        it(`default theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr}></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr}></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Large
        it(`large theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr}></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`large focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr}></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // With icons
        it(`with icons theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`with icons focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Disabled
        it(`disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} disabled></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} disabled></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // With icons (disabled)
        it(`with icons (disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`with icons (disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Aria-disabled
        it(`aria-disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} aria-disabled="true"></ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle${checkedStateStr} aria-disabled="true"></ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // With icons (aria-disabled)
        it(`with icons (aria-disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`with icons (aria-disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<ld-toggle mode="large"${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Themed CSS component
        it(`css component default theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Large CSS component
        it(`css component large theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component large focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // CSS component with icons
        it(`css component with icons theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component with icons focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Disabled CSS component
        it(`css component disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // CSS component with icons (disabled)
        it(`css component with icons (disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component with icons (disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // Aria-disabled CSS component
        it(`css component aria-disabled theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component aria-disabled focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })

        // CSS component with icons (aria-disabled)
        it(`css component with icons (aria-disabled) theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
              </div>`,
            theme
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
        it(`css component with icons (aria-disabled) focus theme-${theme}${checkedStateStr}`, async () => {
          const page = await getPageWithContent(
            `<div class="ld-toggle ld-toggle--large ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                <svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                <svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"></rect>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"></circle>
                </svg>
              </div>`,
            theme
          )
          await page.keyboard.press('Tab')
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot({ allowableMismatchedPixels })
        })
      }
    }
  })

  // Test is necessary, as unit tests can only test key events,
  // if a key event handler is explicitly assigned
  it('toggles on space key', async () => {
    const page = await getPageWithContent(`<ld-toggle></ld-toggle>`)
    const ldToggle = await page.find('ld-toggle')
    const input = await ldToggle.find('input')

    await input.press('Space')

    await page.waitForChanges()

    const checked = await input.getProperty('checked')
    expect(checked).toBe(true)
  })
})
