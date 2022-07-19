import { getPageWithContent } from 'src/liquid/utils/e2e-tests'

const wcStepsEmpty = (withIcons = false) => `
<ld-step done></ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} done></ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} current></ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''}></ld-step>
<ld-step></ld-step>`

const wcStepsLabel = (withIcons = false) => `
<ld-step done>Billing</ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} done>Shipping</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} current>Payment<br />method</ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''}>Summary</ld-step>
<ld-step>Confirmation</ld-step>`

const wcStepsDescription = (withIcons = false) => `
<ld-step done description="Personal data including the billing address and optional additional information">Billing</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} done description="Shipping address, if it differs from the billing addres">Shipping</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} current description="Payment method selection">Payment<br />method</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} description="Summary of your articles and all the previously given information">Summary</ld-step>
<ld-step description="Order confirmation with follow-up information">Confirmation</ld-step>`

const wcOptionalStepsEmpty = (withIcons = false) => `
<ld-step${withIcons ? ' icon="placeholder"' : ''} optional done></ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} optional skipped></ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} optional current></ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} optional></ld-step>
<ld-step></ld-step>`

const wcOptionalStepsLabel = (withIcons = false) => `
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional done>Billing</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional skipped>Shipping</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional current>Payment<br />method</ld-step>
<ld-step${withIcons ? ' icon="placeholder"' : ''} optional>Summary</ld-step>
<ld-step>Confirmation</ld-step>`

const wcOptionalStepsDescription = (withIcons = false) => `
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional done description="Personal data including the billing address and optional additional information">Billing</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional skipped description="Shipping address, if it differs from the billing addres">Shipping</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional current description="Payment method selection">Payment<br />method</ld-step>
<ld-step${
  withIcons ? ' icon="placeholder"' : ''
} optional description="Summary of your articles and all the previously given information">Summary</ld-step>
<ld-step description="Order confirmation with follow-up information">Confirmation</ld-step>`

const stepperProps = {
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

const customIcons = [false, true]

describe('ld-stepper', () => {
  describe('web component', () => {
    Object.entries(stepperProps).forEach(([name, props]) => {
      customIcons.forEach((showIcons) => {
        describe(name + (showIcons ? ' with custom icons' : ''), () => {
          it('empty', async () => {
            const page = await getPageWithContent(
              `<ld-stepper${props}>${wcStepsEmpty(showIcons)}</ld-stepper>`,
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
              `<ld-stepper${props}>${wcStepsLabel(showIcons)}</ld-stepper>`,
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
              `<ld-stepper${props} fit-content>${wcStepsLabel(
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
              `<ld-stepper${props}>${wcStepsDescription(
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
              `<ld-stepper${props} fit-content>${wcStepsDescription(
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
                `<ld-stepper${props}>${wcOptionalStepsEmpty(
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

            it('with label text', async () => {
              const page = await getPageWithContent(
                `<ld-stepper${props}>${wcOptionalStepsLabel(
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
                `<ld-stepper${props}>${wcOptionalStepsDescription(
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
          })
        })
      })
    })
  })
})
