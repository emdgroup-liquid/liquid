import { getPageWithContent } from 'src/liquid/utils/e2e-tests'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdSrOnly } from '../../ld-sr-only/ld-sr-only'
import { LdStep } from '../ld-step/ld-step'
import { LdStepper } from '../ld-stepper'

const getWcStepsEmpty = (withCustomIcons = false, optional = false) => `
<ld-step done${optional ? ' optional' : ''}></ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''} ${
  optional ? 'optional skipped' : 'done'
}></ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''}${
  optional ? ' optional' : ''
} current></ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''}${
  optional ? ' optional' : ''
}></ld-step>
<ld-step></ld-step>`

const getWcStepsLabel = (withCustomIcons = false, optional = false) => `
<ld-step done${optional ? ' optional' : ''}>Billing</ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''} ${
  optional ? 'optional skipped' : 'done'
}>Shipping</ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''}${
  optional ? ' optional' : ''
} current>Payment<br />method</ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''}${
  optional ? ' optional' : ''
}>Summary</ld-step>
<ld-step>Confirmation</ld-step>`

const getWcStepsDescription = (withCustomIcons = false, optional = false) => `
<ld-step done${
  optional ? ' optional' : ''
} description="Personal data including the billing address and optional additional information">Billing</ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''} ${
  optional ? 'optional skipped' : 'done'
} description="Shipping address, if it differs from the billing addres">Shipping</ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''}${
  optional ? ' optional' : ''
} current description="Payment method selection">Payment<br />method</ld-step>
<ld-step${withCustomIcons ? ' icon="placeholder"' : ''}${
  optional ? ' optional' : ''
} description="Summary of your articles and all the previously given information">Summary</ld-step>
<ld-step description="Order confirmation with follow-up information">Confirmation</ld-step>`

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

const getCssStep = ({
  description,
  label,
  modifiers = [],
  srLabel,
}: {
  description?: string
  label?: string
  modifiers?: string[]
  srLabel?: string
}) => `
<li class="ld-step${
  modifiers.length
    ? ' ' + modifiers.map((modifier) => `ld-step--${modifier}`).join(' ')
    : ''
}">
  ${srLabel ? `<span class="ld-sr-only">${srLabel}: </span>` : ''}
  <a${
    modifiers.includes('done') || modifiers.includes('skipped')
      ? ' href="#"'
      : ''
  }>${label ?? ''}</a>
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
  modifiers?: string[],
  optional = false
) =>
  getCssStep({
    modifiers: ['done', 'with-icon', optional && 'optional', ...modifiers],
    srLabel: 'Completed',
  }) +
  getCssStep({
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
    modifiers: [
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
  }) +
  getCssStep({ modifiers })

const getCssStepsLabel = (
  withCustomIcons = false,
  modifiers?: string[],
  optional = false
) =>
  getCssStep({
    label: 'Billing',
    modifiers: ['done', 'with-icon', optional && 'optional', ...modifiers],
    srLabel: 'Completed',
  }) +
  getCssStep({
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
    label: 'Summary',
    modifiers: [
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
  }) +
  getCssStep({
    label: 'Confirmation',
    modifiers,
  })

const getCssStepsDescription = (
  withCustomIcons = false,
  modifiers?: string[],
  optional = false
) =>
  getCssStep({
    description:
      'Personal data including the billing address and optional additional information',
    label: 'Billing',
    modifiers: ['done', 'with-icon', optional && 'optional', ...modifiers],
    srLabel: 'Completed',
  }) +
  getCssStep({
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
    description:
      'Summary of your articles and all the previously given information',
    label: 'Summary',
    modifiers: [
      withCustomIcons && 'custom-icon',
      withCustomIcons && 'with-icon',
      optional && 'optional',
      ...modifiers,
    ],
  }) +
  getCssStep({
    description: 'Order confirmation with follow-up information',
    label: 'Confirmation',
    modifiers,
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
            expect(results).toMatchScreenshot()
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
              expect(results).toMatchScreenshot()
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
                getCssStepper(
                  getCssStepsEmpty(showIcons, modifiers),
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
                  getCssStepsLabel(showIcons, modifiers),
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
              expect(results).toMatchScreenshot()
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
                expect(results).toMatchScreenshot()
              })
            })
          })
        })
      })
    })
  })
})
