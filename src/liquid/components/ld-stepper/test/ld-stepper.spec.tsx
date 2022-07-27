import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdStep } from '../ld-step/ld-step'
import { LdStepper } from '../ld-stepper'
import '../../../utils/mutationObserver'

describe('ld-stepper', () => {
  describe('renders', () => {
    it('default', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper>
            <ld-step current />
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with size prop', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper size="sm">
            <ld-step current />
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with current step label', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper>
            <ld-step current>Step 1</ld-step>
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with fit-content', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper fitContent>
            <ld-step current />
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with custom label', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper
            labelTemplate="$2: $1"
            labelSummaryTemplate="Schritt $1 von $2"
          >
            <ld-step current>Step 1</ld-step>
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('vertical', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper vertical>
            <ld-step current />
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('on brand color', async () => {
      const page = await newSpecPage({
        components: [LdStepper, LdStep],
        template: () => (
          <ld-stepper brandColor>
            <ld-step current />
          </ld-stepper>
        ),
      })
      expect(page.root).toMatchSnapshot()
    })
  })

  it('propagates prop changes', async () => {
    const page = await newSpecPage({
      components: [LdStepper, LdStep],
      template: () => (
        <ld-stepper>
          <ld-step current />
        </ld-stepper>
      ),
    })
    const ldStepper = page.root as HTMLLdStepperElement

    ldStepper.brandColor = true
    ldStepper.size = 'lg'
    ldStepper.vertical = true
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })
})
