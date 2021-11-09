import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdToggle } from '../ld-toggle'

jest.useRealTimers()

const checkedStates = [false, true]

const iconStart = `
<svg class="ld-toggle__icon-start ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
</svg>
`

const iconEnd = `
<svg class="ld-toggle__icon-end ld-icon ld-icon--sm" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3" />
  <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3" />
</svg>
`

describe('ld-toggle', () => {
  for (const checkedState of checkedStates) {
    const checkedStateStr = checkedState ? ' checked' : ''

    it(`default ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(`<ld-toggle${checkedStateStr} />`)
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(`<ld-toggle${checkedStateStr} />`)
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Large
    it(`large ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} />`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`large focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} />`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons
    it(`with icons ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (large)
    it(`with icons (large) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (large) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr}>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Disabled
    it(`disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} disabled />`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`disabled focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} disabled />`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (disabled)
    it(`with icons (disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (large, disabled)
    it(`with icons (large, disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (large, disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Aria-disabled
    it(`aria-disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} aria-disabled="true" />`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`aria-disabled focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} aria-disabled="true" />`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (aria-disabled)
    it(`with icons (aria-disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (aria-disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (large, aria-disabled)
    it(`with icons (large, aria-disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (large, aria-disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Invalid
    it(`invalid ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required />`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`invalid disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required disabled />`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`invalid aria-disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required aria-disabled="true" />`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`invalid focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required />`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (invalid)
    it(`with icons (invalid) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (invalid disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required disabled>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (invalid aria-disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required aria-disabled="true">
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (invalid) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // With icons (large, invalid)
    it(`with icons (large, invalid) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`with icons (large, invalid) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<ld-toggle size="lg"${checkedStateStr} required>
              <ld-icon name="placeholder" size="sm" slot="icon-start"></ld-icon>
              <ld-icon name="placeholder" size="sm" slot="icon-end"></ld-icon>
            </ld-toggle>`
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component
    it(`css component default ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Large CSS component
    it(`css component large ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component large focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons
    it(`css component with icons ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (large)
    it(`css component with icons (large) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (large) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Disabled CSS component
    it(`css component disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component disabled focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (disabled)
    it(`css component with icons (disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (large, disabled)
    it(`css component with icons (large, disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (large, disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} disabled />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Aria-disabled CSS component
    it(`css component aria-disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component aria-disabled focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (aria-disabled)
    it(`css component with icons (aria-disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (aria-disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (large, aria-disabled)
    it(`css component with icons (large, aria-disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (large, aria-disabled) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // Invalid CSS component
    it(`css component invalid ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component invalid disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} required disabled />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component invalid aria-disabled ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} required aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component invalid focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
              </div>`,
        undefined,
        LdToggle
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (invalid)
    it(`css component with icons (invalid) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (invalid disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required disabled />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (invalid aria-disabled) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required aria-disabled="true" />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (invalid) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    // CSS component with icons (large, invalid)
    it(`css component with icons (large, invalid) ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it(`css component with icons (large, invalid) focus ${checkedStateStr}`, async () => {
      const page = await getPageWithContent(
        `<div class="ld-toggle ld-toggle--lg ld-toggle--with-icons">
                <input type="checkbox"${checkedStateStr} required />
                <span class="ld-toggle__knob"></span>
                ${iconStart}
                ${iconEnd}
              </div>`,
        undefined,
        [LdToggle, LdIcon]
      )
      await page.keyboard.press('Tab')
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  }

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
