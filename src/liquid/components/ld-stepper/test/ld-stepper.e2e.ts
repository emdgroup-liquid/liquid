import {
  analyzeAccessibility,
  getPageWithContent,
} from 'src/liquid/utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdSrOnly } from '../../ld-sr-only/ld-sr-only'
import { LdStep } from '../ld-step/ld-step'
import { LdStepper } from '../ld-stepper'

const getWcStepsEmpty = (
  withCustomIcons = false,
  optional = false,
  anchor = false
) => `
<ld-step done${anchor ? ' href="#"' : ''}${
  optional ? ' optional' : ''
} aria-label="Billing"></ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
} ${optional ? 'optional skipped' : 'done'} aria-label="Shipping"></ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
}${optional ? ' optional' : ''} current aria-label="Payment"></ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
}${optional ? ' optional' : ''} last-active next aria-label="Summary"></ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  optional ? ' optional' : ''
} disabled aria-label="Confirmation"></ld-step>`

const getWcStepsLabel = (
  withCustomIcons = false,
  optional = false,
  anchor = false
) => `
<ld-step done${anchor ? ' href="#"' : ''}${
  optional ? ' optional' : ''
}>Billing</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
} ${optional ? 'optional skipped' : 'done'}>Shipping</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
}${optional ? ' optional' : ''} current>Payment<br />method</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
}${optional ? ' optional' : ''} last-active next>Summary</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  optional ? ' optional' : ''
} disabled>Confirmation</ld-step>`

const getWcStepsDescription = (
  withCustomIcons = false,
  optional = false,
  anchor = false
) => `
<ld-step done${anchor ? ' href="#"' : ''}${
  optional ? ' optional' : ''
} description="Personal data including the billing address and optional additional information">Billing</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
} ${
  optional ? 'optional skipped' : 'done'
} description="Shipping address, if it differs from the billing addres">Shipping</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
}${
  optional ? ' optional' : ''
} current description="Payment method selection">Payment<br />method</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  withCustomIcons ? ' icon="placeholder"' : ''
}${
  optional ? ' optional' : ''
} last-active next description="Summary of your articles and all the previously given information">Summary</ld-step>
<ld-step${anchor ? ' href="#"' : ''}${
  optional ? ' optional' : ''
} disabled description="Order confirmation with follow-up information">Confirmation</ld-step>`

const wcStepperProps = {
  default: '',
  sm: ' size="sm"',
  lg: ' size="lg"',
  'on brand color': ' brand-color',
  'on brand color sm': ' brand-color size="sm"',
  'on brand color lg': ' brand-color size="lg"',
  vertical: ' vertical',
  'vertical sm': ' size="sm" vertical',
  'vertical lg': ' size="lg" vertical',
  'vertical on brand color': ' brand-color vertical',
  'vertical on brand color sm': ' brand-color size="sm" vertical',
  'vertical on brand color lg': ' brand-color size="lg" vertical',
}

const wcStepperInteractionProps = {
  default: '',
  'on brand color': ' brand-color',
}

const getCssStep = ({
  anchor = false,
  ariaLabel,
  description,
  disabled = false,
  label,
  modifiers = [],
  srLabel,
}: {
  anchor?: boolean
  ariaLabel?: string
  description?: string
  disabled?: boolean
  label?: string
  modifiers?: string[]
  srLabel?: string
}) => `
<li class="ld-step${
  modifiers.filter(Boolean).length
    ? ' ' +
      modifiers
        .filter(Boolean)
        .map((modifier) => `ld-step--${modifier}`)
        .join(' ')
    : ''
}">
  ${srLabel ? `<span class="ld-sr-only">${srLabel}: </span>` : ''}
  <${anchor ? 'a' : 'button'} class="ld-step__focusable-element"${
  !anchor && (modifiers.includes('done') || modifiers.includes('skipped'))
    ? ' href="#"'
    : ''
}${disabled ? ' aria-disabled="true"' : ''}${
  ariaLabel ? ` aria-label="${ariaLabel}"` : ''
}>${label ?? ''}</${anchor ? 'a' : 'button'}>
  ${
    modifiers.includes('done') && !modifiers.includes('custom-icon')
      ? '<svg class="ld-icon" role="presentation" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m12 4-6.592 6L2 6.6396" stroke="currentcolor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      : ''
  }
  ${
    modifiers.includes('custom-icon')
      ? '<svg class="ld-icon" role="presentation" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentcolor" stroke-width="2"/><circle cx="8" cy="8" r="3" stroke="currentcolor" stroke-width="2"/></svg>'
      : ''
  }
  ${
    description && modifiers.includes('vertical')
      ? `<span class="ld-step__description">${description}</span>`
      : ''
  }
</li>`

const getCssStepsEmpty = (
  withCustomIcons = false,
  modifiers: string[] = [],
  optional = false,
  anchor?: boolean
) =>
  getCssStep({
    anchor,
    ariaLabel: 'Billing',
    modifiers: ['done', 'with-icon', optional && 'optional', ...modifiers],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    ariaLabel: 'Shipping',
    modifiers: [
      optional ? 'optional' : 'done',
      optional && 'skipped',
      (!optional || withCustomIcons) && 'with-icon',
      withCustomIcons && 'custom-icon',
      ...modifiers,
    ],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    ariaLabel: 'Payment',
    modifiers: [
      'current',
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
    srLabel: 'Current',
  }) +
  getCssStep({
    anchor,
    ariaLabel: 'Summary',
    modifiers: [
      'last-active',
      'next',
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
  }) +
  getCssStep({
    anchor,
    ariaLabel: 'Confirmation',
    disabled: true,
    modifiers: [optional && 'optional', ...modifiers],
  })

const getCssStepsLabel = (
  withCustomIcons = false,
  modifiers: string[] = [],
  optional = false,
  anchor?: boolean
) =>
  getCssStep({
    anchor,
    label: 'Billing',
    modifiers: ['done', 'with-icon', optional && 'optional', ...modifiers],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    label: 'Shipping',
    modifiers: [
      optional ? 'optional' : 'done',
      optional && 'skipped',
      (!optional || withCustomIcons) && 'with-icon',
      withCustomIcons && 'custom-icon',
      ...modifiers,
    ],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    label: 'Payment<br />method',
    modifiers: [
      'current',
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    label: 'Summary',
    modifiers: [
      'last-active',
      'next',
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
  }) +
  getCssStep({
    anchor,
    disabled: true,
    label: 'Confirmation',
    modifiers: [optional && 'optional', ...modifiers],
  })

const getCssStepsDescription = (
  withCustomIcons = false,
  modifiers: string[] = [],
  optional = false,
  anchor?: boolean
) =>
  getCssStep({
    anchor,
    description:
      'Personal data including the billing address and optional additional information',
    label: 'Billing',
    modifiers: ['done', 'with-icon', optional && 'optional', ...modifiers],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    description: 'Shipping address, if it differs from the billing addres',
    label: 'Shipping',
    modifiers: [
      optional ? 'optional' : 'done',
      optional && 'skipped',
      (!optional || withCustomIcons) && 'with-icon',
      withCustomIcons && 'custom-icon',
      ...modifiers,
    ],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    description: 'Payment method selection',
    label: 'Payment<br />method',
    modifiers: [
      'current',
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
    srLabel: 'Completed',
  }) +
  getCssStep({
    anchor,
    description:
      'Summary of your articles and all the previously given information',
    label: 'Summary',
    modifiers: [
      'last-active',
      'next',
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
  }) +
  getCssStep({
    anchor,
    description: 'Order confirmation with follow-up information',
    disabled: true,
    label: 'Confirmation',
    modifiers: [optional && 'optional', ...modifiers],
  })

const getCssStepper = (steps: string, modifiers: string[] = []) => `
<span class="ld-sr-only">Payment, step 3 of 5</span>
<nav class="ld-stepper${
  modifiers.length
    ? ' ' + modifiers.map((modifier) => `ld-stepper--${modifier}`).join(' ')
    : ''
}">
  <ol>${steps}</ol>
</nav>`

const cssStepperModifiers = {
  default: [],
  sm: ['sm'],
  lg: ['lg'],
  'on brand color': ['brand-color'],
  'on brand color sm': ['brand-color', 'sm'],
  'on brand color lg': ['brand-color', 'lg'],
  vertical: ['vertical'],
  'vertical sm': ['sm', 'vertical'],
  'vertical lg': ['lg', 'vertical'],
  'vertical on brand color': ['brand-color', 'vertical'],
  'vertical on brand color sm': ['brand-color', 'sm', 'vertical'],
  'vertical on brand color lg': ['brand-color', 'lg', 'vertical'],
}

const cssStepperInteractionModifiers = {
  default: [],
  'on brand color': ['brand-color'],
}

const customIcons = [false, true]

describe('ld-stepper', () => {
  describe('web component', () => {
    Object.entries(wcStepperProps).forEach(([name, props]) => {
      customIcons.forEach((showIcons) => {
        describe(name + (showIcons ? ' with custom icons' : ''), () => {
          it('empty', async () => {
            const page = await getPageWithContent(
              `<ld-stepper${props}>${getWcStepsEmpty(showIcons)}</ld-stepper>`,
              props.includes('brand-color')
                ? {
                    bgColor: 'var(--ld-thm-primary)',
                  }
                : undefined
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with label text', async () => {
            const page = await getPageWithContent(
              `<ld-stepper${props}>${getWcStepsLabel(showIcons)}</ld-stepper>`,
              props.includes('brand-color')
                ? {
                    bgColor: 'var(--ld-thm-primary)',
                  }
                : undefined
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with label text (fit-content)', async () => {
            const page = await getPageWithContent(
              `<ld-stepper${props} fit-content>${getWcStepsLabel(
                showIcons
              )}</ld-stepper>`,
              props.includes('brand-color')
                ? {
                    bgColor: 'var(--ld-thm-primary)',
                  }
                : undefined
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with description', async () => {
            const page = await getPageWithContent(
              `<ld-stepper${props}>${getWcStepsDescription(
                showIcons
              )}</ld-stepper>`,
              props.includes('brand-color')
                ? {
                    bgColor: 'var(--ld-thm-primary)',
                  }
                : undefined
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with description (fit-content)', async () => {
            const page = await getPageWithContent(
              `<ld-stepper${props} fit-content>${getWcStepsDescription(
                showIcons
              )}</ld-stepper>`,
              props.includes('brand-color')
                ? {
                    bgColor: 'var(--ld-thm-primary)',
                  }
                : undefined
            )
            const results = await page.compareScreenshot()
            const accessibilityReport = await analyzeAccessibility(page, {
              // screen reader reads as if the li elements were nested correctly
              options: { rules: { list: { enabled: false } } },
              spec: {
                checks: [
                  // Exception because of the following message:
                  // "Element's background color could not be determined due to a pseudo element"
                  { id: 'color-contrast', options: { ignorePseudo: true } },
                ],
              },
            })

            expect(results).toMatchScreenshot()
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          })

          describe('optional', () => {
            it('empty', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty(
                  showIcons,
                  true
                )}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('with label text', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsLabel(
                  showIcons,
                  true
                )}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('with description', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsDescription(
                  showIcons,
                  true
                )}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })
          })
        })
      })
    })

    describe('anchor', () => {
      it('empty', async () => {
        const page = await getPageWithContent(
          `<ld-stepper>${getWcStepsEmpty(false, false, true)}</ld-stepper>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('with label text', async () => {
        const page = await getPageWithContent(
          `<ld-stepper>${getWcStepsLabel(false, false, true)}</ld-stepper>`
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('with description', async () => {
        const page = await getPageWithContent(
          `<ld-stepper vertical>${getWcStepsDescription(
            false,
            false,
            true
          )}</ld-stepper>`
        )

        const results = await page.compareScreenshot()
        const accessibilityReport = await analyzeAccessibility(page, {
          // screen reader reads as if the li elements were nested correctly
          options: { rules: { list: { enabled: false } } },
          spec: {
            checks: [
              // Exception because of the following message:
              // "Element's background color could not be determined due to a pseudo element"
              { id: 'color-contrast', options: { ignorePseudo: true } },
            ],
          },
        })

        expect(results).toMatchScreenshot()
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })
    })

    describe('interaction', () => {
      Object.entries(wcStepperInteractionProps).forEach(([name, props]) => {
        describe(name, () => {
          describe('active', () => {
            it('done', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })

            it('current', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('next', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })

            it('disabled', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.down('Space')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
          })

          describe('focus', () => {
            it('done', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })

            it('current', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('next', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })

            it('disabled', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.keyboard.press('Tab')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
          })

          describe('hover', () => {
            it('done', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.hover('ld-step:nth-of-type(1)')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })

            it('current', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.hover('ld-step:nth-of-type(3)')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('next', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.hover('ld-step:nth-of-type(4)')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                // screen reader reads as if the li elements were nested correctly
                options: { rules: { list: { enabled: false } } },
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })

            it('disabled', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${getWcStepsEmpty()}</ld-stepper>`,
                props.includes('brand-color')
                  ? {
                      bgColor: 'var(--ld-thm-primary)',
                    }
                  : undefined
              )

              await page.hover('ld-step:nth-of-type(5)')
              await page.waitForChanges()

              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })
          })

          describe('optional', () => {
            describe('active', () => {
              it('done', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  // screen reader reads as if the li elements were nested correctly
                  options: { rules: { list: { enabled: false } } },
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('skipped', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('current', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('next', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  // screen reader reads as if the li elements were nested correctly
                  options: { rules: { list: { enabled: false } } },
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('disabled', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })
            })

            describe('focus', () => {
              it('done', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  // screen reader reads as if the li elements were nested correctly
                  options: { rules: { list: { enabled: false } } },
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('skipped', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('current', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('next', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  // screen reader reads as if the li elements were nested correctly
                  options: { rules: { list: { enabled: false } } },
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('disabled', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })
            })

            describe('hover', () => {
              it('done', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.hover('ld-step:nth-of-type(1)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  // screen reader reads as if the li elements were nested correctly
                  options: { rules: { list: { enabled: false } } },
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('skipped', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.hover('ld-step:nth-of-type(2)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('current', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.hover('ld-step:nth-of-type(3)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('next', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.hover('ld-step:nth-of-type(4)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  // screen reader reads as if the li elements were nested correctly
                  options: { rules: { list: { enabled: false } } },
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('disabled', async () => {
                const page = await getPageWithContent(
                  `<ld-stepper${props}>${getWcStepsEmpty(
                    true,
                    true
                  )}</ld-stepper>`,
                  props.includes('brand-color')
                    ? {
                        bgColor: 'var(--ld-thm-primary)',
                      }
                    : undefined
                )

                await page.hover('ld-step:nth-of-type(5)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })
            })
          })
        })
      })
    })
  })

  describe('CSS component', () => {
    Object.entries(cssStepperModifiers).forEach(([name, modifiers]) => {
      customIcons.forEach((showIcons) => {
        describe(name + (showIcons ? ' with custom icons' : ''), () => {
          it('empty', async () => {
            const page = await getPageWithContent(
              getCssStepper(getCssStepsEmpty(showIcons, modifiers), modifiers),
              {
                bgColor: modifiers.includes('brand-color')
                  ? 'var(--ld-thm-primary)'
                  : undefined,
                components: [LdIcon, LdSrOnly, LdStep, LdStepper],
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with label text', async () => {
            const page = await getPageWithContent(
              getCssStepper(getCssStepsLabel(showIcons, modifiers), modifiers),
              {
                bgColor: modifiers.includes('brand-color')
                  ? 'var(--ld-thm-primary)'
                  : undefined,
                components: [LdIcon, LdSrOnly, LdStep, LdStepper],
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with label text (fit-content)', async () => {
            const page = await getPageWithContent(
              getCssStepper(getCssStepsLabel(showIcons, modifiers), [
                'fit-content',
                ...modifiers,
              ]),
              {
                bgColor: modifiers.includes('brand-color')
                  ? 'var(--ld-thm-primary)'
                  : undefined,
                components: [LdIcon, LdSrOnly, LdStep, LdStepper],
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          it('with description', async () => {
            const page = await getPageWithContent(
              getCssStepper(
                getCssStepsDescription(showIcons, modifiers),
                modifiers
              ),
              {
                bgColor: modifiers.includes('brand-color')
                  ? 'var(--ld-thm-primary)'
                  : undefined,
                components: [LdIcon, LdSrOnly, LdStep, LdStepper],
              }
            )
            const results = await page.compareScreenshot()
            const accessibilityReport = await analyzeAccessibility(page, {
              spec: {
                checks: [
                  // Exception because of the following message:
                  // "Element's background color could not be determined due to a pseudo element"
                  { id: 'color-contrast', options: { ignorePseudo: true } },
                ],
              },
            })

            expect(results).toMatchScreenshot()
            expect(accessibilityReport).toHaveNoAccessibilityIssues()
          })

          it('with description (fit-content)', async () => {
            const page = await getPageWithContent(
              getCssStepper(getCssStepsDescription(showIcons, modifiers), [
                'fit-content',
                ...modifiers,
              ]),
              {
                bgColor: modifiers.includes('brand-color')
                  ? 'var(--ld-thm-primary)'
                  : undefined,
                components: [LdIcon, LdSrOnly, LdStep, LdStepper],
              }
            )
            const results = await page.compareScreenshot()
            expect(results).toMatchScreenshot()
          })

          describe('optional', () => {
            it('empty', async () => {
              const page = await getPageWithContent(
                getCssStepper(
                  getCssStepsEmpty(showIcons, modifiers, true),
                  modifiers
                ),
                {
                  bgColor: modifiers.includes('brand-color')
                    ? 'var(--ld-thm-primary)'
                    : undefined,
                  components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                }
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('with label text', async () => {
              const page = await getPageWithContent(
                getCssStepper(
                  getCssStepsLabel(showIcons, modifiers, true),
                  modifiers
                ),
                {
                  bgColor: modifiers.includes('brand-color')
                    ? 'var(--ld-thm-primary)'
                    : undefined,
                  components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                }
              )
              const results = await page.compareScreenshot()
              expect(results).toMatchScreenshot()
            })

            it('with description', async () => {
              const page = await getPageWithContent(
                getCssStepper(
                  getCssStepsDescription(showIcons, modifiers, true),
                  modifiers
                ),
                {
                  bgColor: modifiers.includes('brand-color')
                    ? 'var(--ld-thm-primary)'
                    : undefined,
                  components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                }
              )
              const results = await page.compareScreenshot()
              const accessibilityReport = await analyzeAccessibility(page, {
                spec: {
                  checks: [
                    // Exception because of the following message:
                    // "Element's background color could not be determined due to a pseudo element"
                    { id: 'color-contrast', options: { ignorePseudo: true } },
                  ],
                },
              })

              expect(results).toMatchScreenshot()
              expect(accessibilityReport).toHaveNoAccessibilityIssues()
            })
          })
        })
      })
    })

    describe('anchor', () => {
      it('empty', async () => {
        const page = await getPageWithContent(
          getCssStepper(getCssStepsEmpty(false, undefined, false, true)),
          {
            components: [LdIcon, LdSrOnly, LdStep, LdStepper],
          }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('with label text', async () => {
        const page = await getPageWithContent(
          getCssStepper(getCssStepsLabel(false, undefined, false, true)),
          {
            components: [LdIcon, LdSrOnly, LdStep, LdStepper],
          }
        )
        const results = await page.compareScreenshot()
        expect(results).toMatchScreenshot()
      })

      it('with description', async () => {
        const page = await getPageWithContent(
          getCssStepper(
            getCssStepsDescription(false, ['vertical'], false, true),
            ['vertical']
          ),
          {
            components: [LdIcon, LdSrOnly, LdStep, LdStepper],
          }
        )
        const results = await page.compareScreenshot()
        const accessibilityReport = await analyzeAccessibility(page, {
          spec: {
            checks: [
              // Exception because of the following message:
              // "Element's background color could not be determined due to a pseudo element"
              { id: 'color-contrast', options: { ignorePseudo: true } },
            ],
          },
        })

        expect(results).toMatchScreenshot()
        expect(accessibilityReport).toHaveNoAccessibilityIssues()
      })
    })

    describe('interaction', () => {
      Object.entries(cssStepperInteractionModifiers).forEach(
        ([name, modifiers]) => {
          describe(name, () => {
            describe('active', () => {
              it('done', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('current', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('next', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('disabled', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.down('Space')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })
            })

            describe('focus', () => {
              it('done', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('current', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('next', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('disabled', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.keyboard.press('Tab')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })
            })

            describe('hover', () => {
              it('done', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.hover('li:nth-of-type(1)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('current', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.hover('li:nth-of-type(3)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })

              it('next', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.hover('li:nth-of-type(4)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                const accessibilityReport = await analyzeAccessibility(page, {
                  spec: {
                    checks: [
                      // Exception because of the following message:
                      // "Element's background color could not be determined due to a pseudo element"
                      { id: 'color-contrast', options: { ignorePseudo: true } },
                    ],
                  },
                })

                expect(results).toMatchScreenshot()
                expect(accessibilityReport).toHaveNoAccessibilityIssues()
              })

              it('disabled', async () => {
                const page = await getPageWithContent(
                  getCssStepper(getCssStepsEmpty(false, modifiers), modifiers),
                  {
                    bgColor: modifiers.includes('brand-color')
                      ? 'var(--ld-thm-primary)'
                      : undefined,
                    components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                  }
                )

                await page.hover('li:nth-of-type(5)')
                await page.waitForChanges()

                const results = await page.compareScreenshot()
                expect(results).toMatchScreenshot()
              })
            })

            describe('optional', () => {
              describe('active', () => {
                it('done', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.down('Space')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  const accessibilityReport = await analyzeAccessibility(page, {
                    spec: {
                      checks: [
                        // Exception because of the following message:
                        // "Element's background color could not be determined due to a pseudo element"
                        {
                          id: 'color-contrast',
                          options: { ignorePseudo: true },
                        },
                      ],
                    },
                  })

                  expect(results).toMatchScreenshot()
                  expect(accessibilityReport).toHaveNoAccessibilityIssues()
                })

                it('skipped', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.down('Space')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })

                it('current', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.down('Space')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })

                it('next', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.down('Space')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  const accessibilityReport = await analyzeAccessibility(page, {
                    spec: {
                      checks: [
                        // Exception because of the following message:
                        // "Element's background color could not be determined due to a pseudo element"
                        {
                          id: 'color-contrast',
                          options: { ignorePseudo: true },
                        },
                      ],
                    },
                  })

                  expect(results).toMatchScreenshot()
                  expect(accessibilityReport).toHaveNoAccessibilityIssues()
                })

                it('disabled', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.down('Space')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })
              })

              describe('focus', () => {
                it('done', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  const accessibilityReport = await analyzeAccessibility(page, {
                    spec: {
                      checks: [
                        // Exception because of the following message:
                        // "Element's background color could not be determined due to a pseudo element"
                        {
                          id: 'color-contrast',
                          options: { ignorePseudo: true },
                        },
                      ],
                    },
                  })

                  expect(results).toMatchScreenshot()
                  expect(accessibilityReport).toHaveNoAccessibilityIssues()
                })

                it('skipped', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })

                it('current', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })

                it('next', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  const accessibilityReport = await analyzeAccessibility(page, {
                    spec: {
                      checks: [
                        // Exception because of the following message:
                        // "Element's background color could not be determined due to a pseudo element"
                        {
                          id: 'color-contrast',
                          options: { ignorePseudo: true },
                        },
                      ],
                    },
                  })

                  expect(results).toMatchScreenshot()
                  expect(accessibilityReport).toHaveNoAccessibilityIssues()
                })

                it('disabled', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.keyboard.press('Tab')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })
              })

              describe('hover', () => {
                it('done', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.hover('li:nth-of-type(1)')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  const accessibilityReport = await analyzeAccessibility(page, {
                    spec: {
                      checks: [
                        // Exception because of the following message:
                        // "Element's background color could not be determined due to a pseudo element"
                        {
                          id: 'color-contrast',
                          options: { ignorePseudo: true },
                        },
                      ],
                    },
                  })

                  expect(results).toMatchScreenshot()
                  expect(accessibilityReport).toHaveNoAccessibilityIssues()
                })

                it('skipped', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.hover('li:nth-of-type(2)')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })

                it('current', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.hover('li:nth-of-type(3)')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })

                it('next', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.hover('li:nth-of-type(4)')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  const accessibilityReport = await analyzeAccessibility(page, {
                    spec: {
                      checks: [
                        // Exception because of the following message:
                        // "Element's background color could not be determined due to a pseudo element"
                        {
                          id: 'color-contrast',
                          options: { ignorePseudo: true },
                        },
                      ],
                    },
                  })

                  expect(results).toMatchScreenshot()
                  expect(accessibilityReport).toHaveNoAccessibilityIssues()
                })

                it('disabled', async () => {
                  const page = await getPageWithContent(
                    getCssStepper(
                      getCssStepsEmpty(true, modifiers, true),
                      modifiers
                    ),
                    {
                      bgColor: modifiers.includes('brand-color')
                        ? 'var(--ld-thm-primary)'
                        : undefined,
                      components: [LdIcon, LdSrOnly, LdStep, LdStepper],
                    }
                  )

                  await page.hover('li:nth-of-type(5)')
                  await page.waitForChanges()

                  const results = await page.compareScreenshot()
                  expect(results).toMatchScreenshot()
                })
              })
            })
          })
        }
      )
    })
  })
})
