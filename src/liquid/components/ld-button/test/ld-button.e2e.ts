import { getPageWithContent } from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdButton } from '../ld-button'

jest.useRealTimers()

const modes = [
  '',
  'highlight',
  'secondary',
  'on-brand-color',
  'secondary-on-brand-color',
  'ghost',
  'danger',
]

const cssIconComponent = `
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
`

const allowableMismatchedRatio = 0.02

describe('ld-button', () => {
  for (const mode of modes) {
    const modeStr = mode ? `mode ${mode}` : 'mode none'
    describe(modeStr, () => {
      it(`default ${modeStr}`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`hover`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.hover('ld-button')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`focus`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`active`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // Disabled
      it(`disabled`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`disabled hover`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.hover('ld-button')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`disabled focus`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`disabled active`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // Aria-disabled
      it(`aria-disabled`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`aria-disabled hover`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.hover('ld-button')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`aria-disabled focus`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`aria-disabled active`, async () => {
        const page = await getPageWithContent(
          `<ld-button mode="${mode}" aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // Progress button
      it(`progress button`, async () => {
        const page = await getPageWithContent(
          `<ld-button progress="0.75">Text</ld-button>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`progress button secondary`, async () => {
        const page = await getPageWithContent(
          `<ld-button progress="0.75" mode="secondary">Text</ld-button>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`progress button ghost`, async () => {
        const page = await getPageWithContent(
          `<ld-button progress="0.75" mode="ghost">Text</ld-button>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // CSS component
      const modeModifier = mode ? ` ld-button--${mode}` : ''
      it(`css component default ${modeStr}`, async () => {
        const page = await getPageWithContent(
          `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component hover`, async () => {
        const page = await getPageWithContent(
          `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.hover('.ld-button')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component focus`, async () => {
        const page = await getPageWithContent(
          `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component active`, async () => {
        const page = await getPageWithContent(
          `<button class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // Disabled CSS component
      it(`css component disabled`, async () => {
        const page = await getPageWithContent(
          `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component disabled hover`, async () => {
        const page = await getPageWithContent(
          `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.hover('.ld-button')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component disabled focus`, async () => {
        const page = await getPageWithContent(
          `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component disabled active`, async () => {
        const page = await getPageWithContent(
          `<button disabled class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // Aria-disabled CSS component
      it(`css component aria-disabled`, async () => {
        const page = await getPageWithContent(
          `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component aria-disabled hover`, async () => {
        const page = await getPageWithContent(
          `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.hover('.ld-button')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component aria-disabled focus`, async () => {
        const page = await getPageWithContent(
          `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.keyboard.press('Tab')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
      it(`css component aria-disabled active`, async () => {
        const page = await getPageWithContent(
          `<button aria-disabled="true" class="ld-button${modeModifier}">Text${cssIconComponent}</button>`,
          undefined,
          [LdButton, LdIcon]
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      // Progress button CSS component
      it(`css component progress button`, async () => {
        const page = await getPageWithContent(
          `<button aria-busy="true" aria-live="polite" class="ld-button">
            Text
            <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
          </button>`,
          undefined,
          LdButton
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`css component progress button secondary`, async () => {
        const page = await getPageWithContent(
          `<button aria-busy="true" aria-live="polite" class="ld-button ld-button--secondary">
            Text
            <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
          </button>`,
          undefined,
          LdButton
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })

      it(`css component progress button ghost`, async () => {
        const page = await getPageWithContent(
          `<button aria-busy="true" aria-live="polite" class="ld-button ld-button--ghost">
            Text
            <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
          </button>`,
          undefined,
          LdButton
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot({ allowableMismatchedRatio })
      })
    })
  }

  describe('sizes', () => {
    it('sm', async () => {
      const page = await getPageWithContent(
        '<ld-button size="sm">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('lg', async () => {
      const page = await getPageWithContent(
        '<ld-button size="lg">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('icon only', () => {
    it('icon button', async () => {
      const page = await getPageWithContent(
        '<ld-button><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('icon button sm', async () => {
      const page = await getPageWithContent(
        '<ld-button size="sm"><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('icon button lg', async () => {
      const page = await getPageWithContent(
        '<ld-button size="lg"><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('justify content with custom width', () => {
    it('justify center', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="center">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('justify start', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="start">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('justify end', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="end">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('justify between', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="between">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('multiline with text align', () => {
    it('multiline text centered', async () => {
      const page = await getPageWithContent(
        '<ld-button>Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.</ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('multiline text left', async () => {
      const page = await getPageWithContent(
        '<ld-button align-text="left"><ld-icon name="placeholder"></ld-icon>Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.</ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
    it('multiline text right', async () => {
      const page = await getPageWithContent(
        '<ld-button align-text="right">Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('as anchor', () => {
    it('anchor with target blank', async () => {
      const page = await getPageWithContent(
        `<ld-button href="#" target="_blank">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot({ allowableMismatchedRatio })
    })
  })

  describe('implicit form submission', () => {
    it('submits form implicitly', async () => {
      const page = await getPageWithContent(
        `<form><ld-button>Text</ld-button></form>`
      )
      const form = await page.find('form')
      expect(form).not.toBeNull()
      const formSubmitSpy = await form.spyOnEvent('submit')

      // Using ldButton.click here leads to Error: Node is either not visible or not an HTMLElement
      await page.evaluate(() => document.querySelector('ld-button').click())
      await page.evaluate(async () => {
        await new Promise((resolve) => setTimeout(resolve))
      })
      page.waitForChanges()

      expect(formSubmitSpy).toHaveReceivedEvent()
    })
  })
})
