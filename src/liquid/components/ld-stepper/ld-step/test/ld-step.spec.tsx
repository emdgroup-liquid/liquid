import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../../../ld-icon/ld-icon'
import { LdStep } from '../ld-step'
import '../../../../utils/mutationObserver'

describe('ld-step', () => {
  describe('renders', () => {
    it('default', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with size prop', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step size="lg" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with text', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step>Step 1</ld-step>,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with description', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step description="Example description" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as current', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step current />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as disabled', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step disabled />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as last active', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step last-active />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as next', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step next />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as done', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step done />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as optional', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step optional />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as skipped', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step optional skipped />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as done but optional', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step done optional />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('on brand color', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step brandColor />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('vertical', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step vertical />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as anchor', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step href="#" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('as disabled anchor', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step disabled href="#" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    describe('with custom label', () => {
      it('current', async () => {
        const page = await newSpecPage({
          components: [LdStep],
          template: () => <ld-step current labelCurrent="Aktiv" />,
        })
        expect(page.root.shadowRoot.querySelector('ld-sr-only')).toEqualText(
          'Aktiv: '
        )
      })

      it('done', async () => {
        const page = await newSpecPage({
          components: [LdStep],
          template: () => <ld-step done labelDone="Erledigt" />,
        })
        expect(page.root.shadowRoot.querySelector('ld-sr-only')).toEqualText(
          'Erledigt: '
        )
      })

      it('optional', async () => {
        const page = await newSpecPage({
          components: [LdStep],
          template: () => <ld-step optional labelOptional="Skippable" />,
        })
        expect(page.root.shadowRoot.querySelector('ld-sr-only')).toEqualText(
          'Skippable: '
        )
      })

      it('skipped', async () => {
        const page = await newSpecPage({
          components: [LdStep],
          template: () => (
            <ld-step optional skipped labelSkipped="Übersprungen" />
          ),
        })
        expect(page.root.shadowRoot.querySelector('ld-sr-only')).toEqualText(
          'Übersprungen: '
        )
      })

      it('was optional', async () => {
        const page = await newSpecPage({
          components: [LdStep],
          template: () => (
            <ld-step
              done
              optional
              labelDone="Erledigt"
              labelWasOptional="war optional"
            />
          ),
        })
        expect(page.root.shadowRoot.querySelector('ld-sr-only')).toEqualText(
          'Erledigt (war optional): '
        )
      })
    })

    it('with custom icon', async () => {
      const page = await newSpecPage({
        components: [LdIcon, LdStep],
        template: () => <ld-step icon="favorite" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with ldTabindex', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step ldTabindex={5} />,
      })
      expect(page.root.shadowRoot.querySelector('button').tabIndex).toBe(5)
    })

    it('with cloned attribute', async () => {
      const page = await newSpecPage({
        components: [LdStep],
        template: () => <ld-step aria-hidden="true" />,
      })
      await page.waitForChanges()
      // Test environment does not seem to support the `ariaHidden` prop, here
      expect(
        page.root.shadowRoot.querySelector('button').getAttribute('aria-hidden')
      ).toBe('true')
    })
  })

  it('initially emits ldstepselected event when current', async () => {
    const page = await newSpecPage({
      components: [LdStep],
      template: () => <ld-step current>Step 1</ld-step>,
    })
    const eventHandler = jest.fn()

    page.root.addEventListener('ldstepselected', eventHandler)
    page.rootInstance.componentDidLoad()

    expect(eventHandler).toHaveBeenCalledTimes(1)
    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          index: 0,
          label: 'Step 1',
        },
      })
    )
  })

  it('emits ldstepselected event on click', async () => {
    const page = await newSpecPage({
      components: [LdStep],
      template: () => <ld-step done>Step 1</ld-step>,
    })
    const eventHandler = jest.fn()
    const button = page.root.shadowRoot.querySelector('button')

    page.root.addEventListener('ldstepselected', eventHandler)
    button.click()

    expect(eventHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          index: 0,
          label: 'Step 1',
        },
      })
    )
  })

  it('does not emit ldstepselected event on click when current', async () => {
    const page = await newSpecPage({
      components: [LdStep],
      template: () => <ld-step current>Step 1</ld-step>,
    })
    const eventHandler = jest.fn()
    const button = page.root.shadowRoot.querySelector('button')

    page.root.addEventListener('ldstepselected', eventHandler)
    button.click()

    expect(eventHandler).not.toHaveBeenCalledWith()
  })

  it('does not emit ldstepselected event on click when disabled', async () => {
    const page = await newSpecPage({
      components: [LdStep],
      template: () => <ld-step disabled>Step 1</ld-step>,
    })
    const eventHandler = jest.fn()
    const button = page.root.shadowRoot.querySelector('button')

    page.root.addEventListener('ldstepselected', eventHandler)
    button.click()

    expect(eventHandler).not.toHaveBeenCalledWith()
  })

  it('allows to set inner focus', async () => {
    const page = await newSpecPage({
      components: [LdStep],
      template: () => <ld-step done>Step 1</ld-step>,
    })
    const button = page.root.shadowRoot.querySelector('button')

    button.focus = jest.fn()
    await page.root.focusInner()

    expect(button.focus).toHaveBeenCalled()
  })
})
