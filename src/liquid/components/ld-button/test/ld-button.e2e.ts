import {
  analyzeAccessibility,
  getPageWithContent,
} from '../../../utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdButton } from '../ld-button'

const modes = [
  '',
  'highlight',
  'secondary',
  'ghost',
  'danger',
  'danger-secondary',
]
const attributes = ['', 'brand-color']

const modeMap = {
  danger: 'ld-button--danger',
  ghost: 'ld-button--ghost',
  highlight: 'ld-button--highlight',
  neutral: 'ld-button--neutral',
  secondary: 'ld-button--secondary',
  'danger-ghost': 'ld-button--ghost ld-button--danger-ghost',
  'danger-secondary': 'ld-button--secondary ld-button--danger-secondary',
  'neutral-ghost': 'ld-button--ghost ld-button--neutral-ghost',
  'neutral-secondary': 'ld-button--secondary ld-button--neutral-secondary',
}

const cssIconComponent = `
  <span class="ld-icon" role="presentation">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
`

describe('ld-button', () => {
  modes.forEach((mode) => {
    attributes.forEach((attribute) => {
      const bgColor =
        attribute === 'brand-color' ? 'var(--ld-thm-primary)' : undefined
      const modeDescription = mode ? `mode ${mode}` : 'mode none'
      const modeStr = mode ? ` mode="${mode}"` : ''
      const attributeStr = attribute ? ` ${attribute}` : ''

      describe(`${modeDescription}${attributeStr}`, () => {
        it('default', async () => {
          const page = await getPageWithContent(
            `<ld-button${
              modeStr + attributeStr
            }>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            {
              bgColor,
            }
          )
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()

          const accessibilityReport = await analyzeAccessibility(page)
          expect(accessibilityReport).toHaveNoAccessibilityIssues()
        })
        it('hover', async () => {
          const page = await getPageWithContent(
            `<ld-button${
              modeStr + attributeStr
            }>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            {
              bgColor,
            }
          )
          await page.hover('ld-button')
          await page.waitForChanges()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it('focus', async () => {
          const page = await getPageWithContent(
            `<ld-button${
              modeStr + attributeStr
            }>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            {
              bgColor,
            }
          )
          await page.keyboard.press('Tab')
          await page.waitForChanges()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })
        it('active', async () => {
          const page = await getPageWithContent(
            `<ld-button${
              modeStr + attributeStr
            }>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
            {
              bgColor,
            }
          )
          await page.keyboard.press('Tab')
          await page.keyboard.down('Space')
          await page.waitForChanges()
          const results = await page.compareScreenshot()
          expect(results).toMatchScreenshot()
        })

        describe('disabled', () => {
          it('default', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()

            const accessibilityReport = await analyzeAccessibility(page)
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          })
          it('hover', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            await page.hover('ld-button')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('focus', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            await page.keyboard.press('Tab')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('active', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } disabled>Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            await page.keyboard.press('Tab')
            await page.keyboard.down('Space')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        })

        describe('aria-disabled', () => {
          it('default', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('hover', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            await page.hover('ld-button')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('focus', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            await page.keyboard.press('Tab')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('active', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } aria-disabled="true">Text<ld-icon name="placeholder"></ld-icon></ld-button>`,
              {
                bgColor,
              }
            )
            await page.keyboard.press('Tab')
            await page.keyboard.down('Space')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        })

        describe('progress button', () => {
          it('default', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } progress="0.75">Text</ld-button>`,
              {
                disableAllTransitions: true,
                bgColor,
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('hover', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } progress="0.75">Text</ld-button>`,
              {
                disableAllTransitions: true,
                bgColor,
              }
            )
            await page.hover('ld-button')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('focus', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } progress="0.75">Text</ld-button>`,
              {
                disableAllTransitions: true,
                bgColor,
              }
            )
            await page.keyboard.press('Tab')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('active', async () => {
            const page = await getPageWithContent(
              `<ld-button${
                modeStr + attributeStr
              } progress="0.75">Text</ld-button>`,
              {
                disableAllTransitions: true,
                bgColor,
              }
            )
            await page.keyboard.press('Tab')
            await page.keyboard.down('Space')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
        })

        describe('css component', () => {
          const modeModifier = mode ? ` ${modeMap[mode]}` : ''
          const attributeModifier = attribute ? ` ld-button--${attribute}` : ''
          const modifiers = modeModifier + attributeModifier

          it('default', async () => {
            const page = await getPageWithContent(
              `<button class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
              {
                bgColor,
                components: [LdButton, LdIcon],
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('hover', async () => {
            const page = await getPageWithContent(
              `<button class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
              {
                bgColor,
                components: [LdButton, LdIcon],
              }
            )
            await page.hover('.ld-button')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('focus', async () => {
            const page = await getPageWithContent(
              `<button class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
              {
                bgColor,
                components: [LdButton, LdIcon],
              }
            )
            await page.keyboard.press('Tab')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })
          it('active', async () => {
            const page = await getPageWithContent(
              `<button class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
              {
                bgColor,
                components: [LdButton, LdIcon],
              }
            )
            await page.keyboard.press('Tab')
            await page.keyboard.down('Space')
            await page.waitForChanges()
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          describe('disabled', () => {
            it('default', async () => {
              const page = await getPageWithContent(
                `<button disabled class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('hover', async () => {
              const page = await getPageWithContent(
                `<button disabled class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              await page.hover('.ld-button')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('focus', async () => {
              const page = await getPageWithContent(
                `<button disabled class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              await page.keyboard.press('Tab')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('active', async () => {
              const page = await getPageWithContent(
                `<button disabled class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
          })

          describe('aria-disabled', () => {
            it('default', async () => {
              const page = await getPageWithContent(
                `<button aria-disabled="true" class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('hover', async () => {
              const page = await getPageWithContent(
                `<button aria-disabled="true" class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              await page.hover('.ld-button')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('focus', async () => {
              const page = await getPageWithContent(
                `<button aria-disabled="true" class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              await page.keyboard.press('Tab')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('active', async () => {
              const page = await getPageWithContent(
                `<button aria-disabled="true" class="ld-button${modifiers}">Text${cssIconComponent}</button>`,
                {
                  bgColor,
                  components: [LdButton, LdIcon],
                }
              )
              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
          })

          describe('progress button', () => {
            it('default', async () => {
              const page = await getPageWithContent(
                `<button aria-busy="true" aria-live="polite" class="ld-button${modifiers}">
                Text
                <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
              </button>`,
                {
                  disableAllTransitions: true,
                  bgColor,
                  components: LdButton,
                }
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('hover', async () => {
              const page = await getPageWithContent(
                `<button aria-busy="true" aria-live="polite" class="ld-button${modifiers}">
                Text
                <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
              </button>`,
                {
                  disableAllTransitions: true,
                  bgColor,
                  components: LdButton,
                }
              )
              await page.hover('.ld-button')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('focus', async () => {
              const page = await getPageWithContent(
                `<button aria-busy="true" aria-live="polite" class="ld-button${modifiers}">
                Text
                <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
              </button>`,
                {
                  disableAllTransitions: true,
                  bgColor,
                  components: LdButton,
                }
              )
              await page.keyboard.press('Tab')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
            it('active', async () => {
              const page = await getPageWithContent(
                `<button aria-busy="true" aria-live="polite" class="ld-button${modifiers}">
                Text
                <span class="ld-button__progress" style="--ld-button-progress: 0.75"></span>
              </button>`,
                {
                  disableAllTransitions: true,
                  bgColor,
                  components: LdButton,
                }
              )
              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
          })
        })
      })
    })
  })

  describe('sizes', () => {
    it('sm', async () => {
      const page = await getPageWithContent(
        '<ld-button size="sm">Text<ld-icon name="placeholder" size="sm"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it('lg', async () => {
      const page = await getPageWithContent(
        '<ld-button size="lg">Text<ld-icon name="placeholder" size="lg"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('icon only', () => {
    it('icon button', async () => {
      const page = await getPageWithContent(
        '<ld-button><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('icon button sm', async () => {
      const page = await getPageWithContent(
        '<ld-button size="sm"><ld-icon name="placeholder" size="sm"></ld-icon><ld-sr-only>Text</ld-sr-only></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it('icon button lg', async () => {
      const page = await getPageWithContent(
        '<ld-button size="lg"><ld-sr-only>Text</ld-sr-only><ld-icon name="placeholder" size="lg"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })

    describe('ghost', () => {
      it('default', async () => {
        const page = await getPageWithContent(
          '<ld-button mode="ghost"><ld-icon name="placeholder"></ld-icon></ld-button>'
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
      it('sm', async () => {
        const page = await getPageWithContent(
          '<ld-button mode="ghost" size="sm"><ld-icon name="placeholder" size="sm"></ld-icon></ld-button>'
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
      it('lg', async () => {
        const page = await getPageWithContent(
          '<ld-button mode="ghost" size="lg"><ld-icon name="placeholder" size="lg"></ld-icon></ld-button>'
        )
        await page.keyboard.press('Tab')
        await page.keyboard.down('Space')
        await page.waitForChanges()
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })
    })
  })

  describe('justify content with custom width', () => {
    it('justify center', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="center">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('justify start', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="start">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('justify end', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="end">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('justify between', async () => {
      const page = await getPageWithContent(
        '<ld-button style="width: 8rem" justify-content="between">Text<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('multiline with text align', () => {
    it('multiline text centered', async () => {
      const page = await getPageWithContent(
        '<ld-button>Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.</ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
    it('multiline text left', async () => {
      const page = await getPageWithContent(
        '<ld-button align-text="left"><ld-icon name="placeholder"></ld-icon>Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.</ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
    it('multiline text right', async () => {
      const page = await getPageWithContent(
        '<ld-button align-text="right">Almost before we knew it, we had left the ground. A shining crescent far beneath the flying vessel. Then came the night of the first falling star.<ld-icon name="placeholder"></ld-icon></ld-button>'
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()
    })
  })

  describe('as anchor', () => {
    it('anchor with target blank', async () => {
      const page = await getPageWithContent(
        `<ld-button href="#" target="_blank">Text<ld-icon name="placeholder"></ld-icon></ld-button>`
      )
      const results = await page.compareScreenshot()
      expect(results).toMatchScreenshot()

      const accessibilityReport = await analyzeAccessibility(page)
      expect(accessibilityReport).toHaveNoAccessibilityIssues()
    })
  })

  describe('implicit form interaction', () => {
    it('submits form implicitly', async () => {
      const page = await getPageWithContent(
        `<form><ld-button>Text</ld-button></form>`
      )
      const form = await page.find('form')
      const formResetSpy = await form.spyOnEvent('reset')
      const formSubmitSpy = await form.spyOnEvent('submit')

      // Using ldButton.click here leads to Error: Node is either not visible or not an HTMLElement
      await page.evaluate(() => document.querySelector('ld-button').click())
      await page.evaluate(async () => {
        await new Promise((resolve) => setTimeout(resolve))
      })
      page.waitForChanges()

      expect(formResetSpy).not.toHaveReceivedEvent()
      expect(formSubmitSpy).toHaveReceivedEvent()
    })

    it('resets form implicitly', async () => {
      const page = await getPageWithContent(
        `<form><ld-button type="reset">Text</ld-button></form>`
      )
      const form = await page.find('form')
      const formResetSpy = await form.spyOnEvent('reset')
      const formSubmitSpy = await form.spyOnEvent('submit')

      // Using ldButton.click here leads to Error: Node is either not visible or not an HTMLElement
      await page.evaluate(() => document.querySelector('ld-button').click())
      await page.evaluate(async () => {
        await new Promise((resolve) => setTimeout(resolve))
      })
      page.waitForChanges()

      expect(formResetSpy).toHaveReceivedEvent()
      expect(formSubmitSpy).not.toHaveReceivedEvent()
    })
  })
})
