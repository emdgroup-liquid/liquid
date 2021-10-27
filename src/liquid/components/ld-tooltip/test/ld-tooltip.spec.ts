/* eslint-disable @typescript-eslint/ban-ts-comment */
import { newSpecPage } from '@stencil/core/testing'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdTooltip } from '../ld-tooltip'
import { LdTooltipPopper } from '../ld-tooltip-popper/ld-tooltip-popper'

const positions = [
  'bottom center',
  'bottom left',
  'bottom right',
  'left bottom',
  'left middle',
  'left top',
  'right bottom',
  'right middle',
  'right top',
  'top center',
  'top left',
  'top right',
]

describe('ld-tooltip', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders custom trigger', async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <div slot="trigger">Custom trigger</div>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with arrow', async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip arrow>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  positions.forEach((position) => {
    it(`renders with position ${position}`, async () => {
      const page = await newSpecPage({
        components: [LdIcon, LdTooltip, LdTooltipPopper],
        html: `<ld-tooltip position="${position}">
          <h4>Headline</h4>
          <p>Text content</p>
        </ld-tooltip>`,
      })

      const component = page.root
      const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
      const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

      // @ts-ignore
      defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
      trigger.dispatchEvent(new Event('mouseenter'))
      jest.advanceTimersByTime(0)
      await page.waitForChanges()

      expect(component).toMatchSnapshot()
    })
  })

  it(`initializes on mouseenter, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )
  })

  it(`initializes on focus, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )
  })

  it(`does not initialize on click, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')

    trigger.dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`initializes on click, if trigger-type is "click"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )
  })

  it(`does not initialize on mouseenter, if trigger-type is "click"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')

    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`does not initialize on focus, if trigger-type is "click"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')

    trigger.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`does not initialize, if disabled (trigger-type: "hover")`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip disabled>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')

    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)

    trigger.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`does not initialize, if disabled (trigger-type: "click")`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip disabled trigger-type="click">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')

    trigger.dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`hides on mouseleave, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )

    trigger.dispatchEvent(new Event('mouseleave'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`hides on blur, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )

    trigger.dispatchEvent(new Event('blur'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })

  it(`does not hide on click, if trigger-type is "hover"`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip>
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )

    trigger.dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )
  })

  it(`shows after delay`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip show-delay="500">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(499)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)

    jest.advanceTimersByTime(1)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )
  })

  it(`hides after delay`, async () => {
    const page = await newSpecPage({
      components: [LdIcon, LdTooltip, LdTooltipPopper],
      html: `<ld-tooltip hide-delay="500">
        <h4>Headline</h4>
        <p>Text content</p>
      </ld-tooltip>`,
    })

    const component = page.root
    const trigger = component.shadowRoot.querySelector('.ld-tooltip__trigger')
    const defaultSlot = component.shadowRoot.querySelector('.ld-tooltip slot')

    // @ts-ignore
    defaultSlot.assignedNodes = () => component.querySelectorAll('> *')
    trigger.dispatchEvent(new Event('mouseenter'))
    jest.advanceTimersByTime(0)
    trigger.dispatchEvent(new Event('mouseleave'))
    jest.advanceTimersByTime(499)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).not.toBe(
      null
    )

    jest.advanceTimersByTime(1)

    expect(component.shadowRoot.querySelector('.ld-tether-enabled')).toBe(null)
  })
})
