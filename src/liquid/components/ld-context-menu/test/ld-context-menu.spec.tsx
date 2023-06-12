import { h } from '@stencil/core'
import { AnyHTMLElement } from '@stencil/core/internal'
import { MockHTMLElement } from '@stencil/core/mock-doc'
import { newSpecPage, SpecPage } from '@stencil/core/testing'
import { LdContextMenu } from '../ld-context-menu'
import { LdMenuitem } from '../ld-menuitem/ld-menuitem'
import '../../../utils/mutationObserver'
import { LdTooltip } from '../../ld-tooltip/ld-tooltip'
import { LdMenu } from '../ld-menu/ld-menu'
import { LdButton } from '../../ld-button/ld-button'

const prepareAndGetMenuInTooltip = async (
  page: SpecPage,
  triggerSlotElements: Element[],
  tooltipContentNodes: Node[]
) => {
  const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
  const tooltipDefaultSlot = tooltip.shadowRoot.querySelector<AnyHTMLElement>(
    '.ld-tooltip__content slot'
  )
  const tooltipTriggerSlot = tooltip.shadowRoot.querySelector<AnyHTMLElement>(
    '.ld-tooltip__trigger slot'
  )
  const triggerSlot = page.root.shadowRoot.querySelector<AnyHTMLElement>('slot')
  const defaultSlot =
    page.root.shadowRoot.querySelector<AnyHTMLElement>('ld-menu slot')
  const menuItems = Array.from(page.root.querySelectorAll('ld-menuitem'))
  const triggerLdButton = page.root.querySelector('ld-button')
  const triggerButton = page.root.querySelector('button')

  triggerSlot.assignedElements = jest.fn().mockReturnValue(triggerSlotElements)
  tooltipTriggerSlot.assignedElements = jest.fn().mockReturnValue([triggerSlot])
  tooltipDefaultSlot.assignedNodes = jest
    .fn()
    .mockReturnValue(tooltipContentNodes)
  defaultSlot.assignedNodes = jest.fn().mockReturnValue(menuItems)

  jest.advanceTimersByTime(0)
  await page.waitForChanges()

  const menuInTooltip = tooltip.shadowRoot.querySelector(
    'ld-tooltip-popper ld-menu'
  )

  const menuItemsInTooltip = Array.from(
    menuInTooltip.querySelectorAll<HTMLLdMenuitemElement>('ld-menuitem')
  )

  const innerFocusableElements = [...menuItems, ...menuItemsInTooltip]

  if (triggerLdButton) {
    innerFocusableElements.push(triggerLdButton)
  }

  if (triggerButton) {
    triggerButton.focus = jest.fn()
  }

  innerFocusableElements.forEach((element) =>
    Object.defineProperty(element, 'focusInner', {
      value: jest.fn(),
      configurable: true,
      writable: true,
    })
  )

  Object.defineProperty(tooltip, 'hideTooltip', {
    value: jest.fn(),
    configurable: true,
    writable: true,
  })

  return menuInTooltip
}

describe('ld-context-menu', () => {
  let assignedElements: Element[]
  let assignedNodes: Node[]

  beforeAll(() => {
    Object.defineProperty(MockHTMLElement.prototype, 'assignedElements', {
      value: () => assignedElements ?? [],
      configurable: true,
      writable: true,
    })
    Object.defineProperty(MockHTMLElement.prototype, 'assignedNodes', {
      value: () => assignedNodes ?? [],
      configurable: true,
      writable: true,
    })
  })

  afterEach(() => {
    assignedElements = undefined
    assignedNodes = undefined
  })

  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  it('forwards size prop to menu items in nested slots', async () => {
    // necessary to mock assignedNodes with a valid return value
    // TODO: these are actually no HTMLElements, maybe there is a better way?
    const menuItems = [
      <ld-menuitem>Menu item 1</ld-menuitem>,
      <ld-menuitem>Menu item 2</ld-menuitem>,
    ]
    const group = <ld-menuitem-group>{menuItems}</ld-menuitem-group>

    assignedNodes = [group]
    menuItems.forEach((menuItem) => {
      menuItem.tagName = 'LD-MENUITEM'
      menuItem.querySelectorAll = () => null
    })
    group.childNodes = menuItems
    group.querySelectorAll = () => null

    await newSpecPage({
      components: [LdContextMenu, LdMenu, LdMenuitem],
      template: () => (
        <ld-context-menu size="sm">
          <ld-button slot="trigger">Open</ld-button>
          {group}
        </ld-context-menu>
      ),
    })

    expect(menuItems[0].size).toBe('sm')
    expect(menuItems[1].size).toBe('sm')
  })

  it('forwards position', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem],
      template: () => (
        <ld-context-menu position="left middle">
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  it('clones the style attribute', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem],
      template: () => (
        <ld-context-menu style={{ width: '15rem' }}>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  it('focuses the first menu item when opened', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const tooltipTriggerButton =
      tooltip.shadowRoot.querySelector<HTMLLdButtonElement>(
        '.ld-tooltip__trigger'
      )
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const firstMenuItemInTooltip = menuInTooltip.querySelector('ld-menuitem')

    // clicking the button inside the tooltip shadow DOM because event bubbling
    // doesn't work here, somehow.
    tooltipTriggerButton.click()
    await page.waitForChanges()

    expect(firstMenuItemInTooltip.focusInner).toHaveBeenCalled()
  })

  it('focuses the trigger ld-button when closed', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const tooltipTriggerButton =
      tooltip.shadowRoot.querySelector<HTMLLdButtonElement>(
        '.ld-tooltip__trigger'
      )
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    await prepareAndGetMenuInTooltip(page, [triggerButton], [menu])

    // clicking the button inside the tooltip shadow DOM because event bubbling
    // doesn't work here, somehow.
    tooltipTriggerButton.click()
    await page.waitForChanges()

    // trigger tooltip close
    const event = {
      type: 'touchend',
      isTrusted: true,
      composedPath: () => [page.body],
    }
    page.body.dispatchEvent(event as unknown as Event)

    expect(triggerButton.focusInner).toHaveBeenCalled()
  })

  it('focuses the trigger button when closed', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <button slot="trigger">Open</button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const tooltipTriggerButton =
      tooltip.shadowRoot.querySelector<HTMLLdButtonElement>(
        '.ld-tooltip__trigger'
      )
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('button')

    await prepareAndGetMenuInTooltip(page, [triggerButton], [menu])

    // clicking the button inside the tooltip shadow DOM because event bubbling
    // doesn't work here, somehow.
    tooltipTriggerButton.click()
    await page.waitForChanges()

    // trigger tooltip close
    const event = {
      type: 'touchend',
      isTrusted: true,
      composedPath: () => [page.body],
    }
    page.body.dispatchEvent(event as unknown as Event)

    expect(triggerButton.focus).toHaveBeenCalled()
  })

  it('closes context menu on Escape key', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const tooltipTriggerButton =
      tooltip.shadowRoot.querySelector<HTMLLdButtonElement>(
        '.ld-tooltip__trigger'
      )
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const firstMenuItemInTooltip = menuInTooltip.querySelector('ld-menuitem')

    // clicking the button inside the tooltip shadow DOM because event bubbling
    // doesn't work here, somehow.
    tooltipTriggerButton.click()
    await page.waitForChanges()

    firstMenuItemInTooltip.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    )

    expect(tooltip.hideTooltip).toHaveBeenCalled()
  })

  it('prevents default on Tab key', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const tooltipTriggerButton =
      tooltip.shadowRoot.querySelector<HTMLLdButtonElement>(
        '.ld-tooltip__trigger'
      )
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const firstMenuItemInTooltip = menuInTooltip.querySelector('ld-menuitem')
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })

    // clicking the button inside the tooltip shadow DOM because event bubbling
    // doesn't work here, somehow.
    tooltipTriggerButton.click()
    await page.waitForChanges()

    firstMenuItemInTooltip.dispatchEvent(event)

    expect(event.defaultPrevented).toBeTruthy()
  })

  it('allows to set inner focus on menu item', async () => {
    const page = await newSpecPage({
      components: [LdMenuitem],
      html: `<ld-menuitem />`,
    })
    const ldMenuitem = page.root
    const ldButton = ldMenuitem.shadowRoot.querySelector('ld-button')

    ldButton.focusInner = jest.fn()
    await ldMenuitem.focusInner()

    expect(ldButton.focusInner).toHaveBeenCalled()
  })

  it('allows to open and close menu via methods', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })

    const contextMenu = page.root as HTMLLdContextMenuElement
    const tooltip = contextMenu.shadowRoot.querySelector('ld-tooltip')
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')
    const tooltipTrigger = tooltip.shadowRoot.querySelector(
      '.ld-tooltip__trigger'
    )
    const popper = tooltip.shadowRoot.querySelector('ld-tooltip-popper')

    await prepareAndGetMenuInTooltip(page, [triggerButton], [menu])

    expect(popper).toHaveAttribute('aria-hidden')

    await contextMenu.showContextMenu()
    await page.waitForChanges()

    expect(tooltipTrigger).toHaveClass('ld-tether-enabled')
    expect(popper).not.toHaveAttribute('aria-hidden')

    await contextMenu.hideContextMenu()
    await page.waitForChanges()

    expect(tooltip.hideTooltip).toHaveBeenCalled()
  })

  it('prevents closing menu', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem prevent-close>Can not close</ld-menuitem>
          <ld-menuitem>Can close</ld-menuitem>
        </ld-context-menu>
      ),
    })

    const contextMenu = page.root as HTMLLdContextMenuElement
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')
    const popper = tooltip.shadowRoot.querySelector('ld-tooltip-popper')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const menuItemsInTooltip = Array.from(
      menuInTooltip.querySelectorAll('ld-menuitem')
    )

    await contextMenu.showContextMenu()
    await page.waitForChanges()

    expect(popper).not.toHaveAttribute('aria-hidden')

    menuItemsInTooltip[0].click()
    await page.waitForChanges()

    expect(tooltip.hideTooltip).not.toHaveBeenCalled()

    menuItemsInTooltip[1].click()
    await page.waitForChanges()

    expect(tooltip.hideTooltip).not.toHaveBeenCalled()
  })

  it('opens on right-click', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu rightClick>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const firstMenuItemInTooltip = menuInTooltip.querySelector('ld-menuitem')

    tooltip.handleContextMenu(new Event('contextMenu'))
    await page.waitForChanges()

    expect(firstMenuItemInTooltip.focusInner).toHaveBeenCalled()
  })

  it('does not open on right-click if right-click is not enabled', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const firstMenuItemInTooltip = menuInTooltip.querySelector('ld-menuitem')

    tooltip.handleContextMenu(new Event('contextMenu'))
    await page.waitForChanges()

    expect(firstMenuItemInTooltip.focusInner).not.toHaveBeenCalled()
  })

  it('closes on right-click of other context menu', async () => {
    const page = await newSpecPage({
      components: [LdContextMenu, LdMenuitem, LdTooltip, LdMenu, LdButton],
      template: () => (
        <ld-context-menu rightClick>
          <ld-button slot="trigger">Open</ld-button>
          <ld-menuitem>Menu item</ld-menuitem>
        </ld-context-menu>
      ),
    })
    const tooltip = page.root.shadowRoot.querySelector('ld-tooltip')
    const menu = page.root.shadowRoot.querySelector('ld-menu')
    const triggerButton = page.root.querySelector('ld-button')

    const menuInTooltip = await prepareAndGetMenuInTooltip(
      page,
      [triggerButton],
      [menu]
    )
    const firstMenuItemInTooltip = menuInTooltip.querySelector('ld-menuitem')

    tooltip.handleContextMenu(new Event('contextMenu'))
    await page.waitForChanges()

    expect(firstMenuItemInTooltip.focusInner).toHaveBeenCalled()

    const closeSpy = jest.fn()
    tooltip.addEventListener('ldtooltipclose', closeSpy)

    page.body.dispatchEvent(new CustomEvent('ldtooltipopen', { bubbles: true }))
    await page.waitForChanges()

    expect(closeSpy).toHaveBeenCalled()
  })

  it('does not throw when trying to set inner focus before hydration', async () => {
    const component = new LdMenuitem()
    await component.focusInner()
  })

  it('does not throw when disconnecting before hydration', () => {
    const component = new LdMenuitem()
    component.disconnectedCallback()
  })
})
