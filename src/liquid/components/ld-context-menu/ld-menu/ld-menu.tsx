import { Component, Element, h, Prop, State, Watch } from '@stencil/core'

const isElement = (node: Node): node is Element => 'querySelectorAll' in node

const isMenuItem = (element: Element): element is HTMLLdMenuitemElement =>
  element.tagName === 'LD-MENUITEM'

const isSlot = (element: Element): element is HTMLSlotElement =>
  element.tagName === 'SLOT'

const getMenuItemOrNestedMenuItems = (node: Node) => {
  if (!isElement(node)) {
    return []
  }

  if (isMenuItem(node)) {
    return [node]
  }

  const items: HTMLLdMenuitemElement[] = []

  if (isSlot(node)) {
    node
      .assignedNodes()
      .forEach((node) => items.push(...getMenuItemOrNestedMenuItems(node)))
    return items
  }

  node.childNodes.forEach((node) =>
    items.push(...getMenuItemOrNestedMenuItems(node))
  )

  return items
}

@Component({
  tag: 'ld-menu',
  styleUrl: 'ld-menu.css',
  shadow: true,
})
export class LdMenu {
  @Element() el: HTMLLdMenuElement

  /** Size of the context menu. */
  @Prop() size?: 'sm' | 'lg'

  @State() initialized = false

  private initMenuItems = (element: Node, initial = false) => {
    if (!isElement(element)) {
      return
    }

    if (isMenuItem(element)) {
      element.size = this.size

      if (!initial) {
        return
      }

      element.ldTabindex = this.initialized ? -1 : 0

      if (!this.initialized) {
        this.initialized = true
      }

      return
    }

    if (isSlot(element)) {
      element.assignedNodes().forEach((node) => this.initMenuItems(node))
      return
    }

    element.childNodes.forEach((node) => this.initMenuItems(node))
  }

  private getAllMenuItems = () => {
    const items: HTMLLdMenuitemElement[] = []

    this.el
      .querySelectorAll('slot, ld-menuitem')
      .forEach((node) => items.push(...getMenuItemOrNestedMenuItems(node)))

    return items
  }

  private focusNext = (target: HTMLLdMenuitemElement) => {
    const allMenuItems = this.getAllMenuItems()
    const index = allMenuItems.indexOf(target)
    const next =
      allMenuItems.length > index + 1
        ? allMenuItems[index + 1]
        : allMenuItems[0]

    target.ldTabindex = -1
    next.ldTabindex = 0
    next.focusInner()
  }

  private focusPrev = (target: HTMLLdMenuitemElement) => {
    const allMenuItems = this.getAllMenuItems()
    const index = allMenuItems.indexOf(target)
    const prev =
      index === 0
        ? allMenuItems[allMenuItems.length - 1]
        : allMenuItems[index - 1]

    target.ldTabindex = -1
    prev.ldTabindex = 0
    prev.focusInner()
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLLdMenuitemElement

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        this.focusPrev(target)
        break
      case 'ArrowDown':
        event.preventDefault()
        this.focusNext(target)
        break
      case 'Tab':
    }
  }

  @Watch('size')
  handleSizeChange() {
    this.updateMenuItems()
  }

  private updateMenuItems = (initial = false) => {
    this.el
      .querySelectorAll('slot, ld-menuitem')
      .forEach((element) => this.initMenuItems(element, initial))
  }

  componentWillLoad() {
    this.updateMenuItems(true)
  }

  render() {
    return (
      <ul
        onKeyDown={this.handleKeyDown}
        class="ld-menu"
        part="list"
        role="menu"
      >
        <slot></slot>
      </ul>
    )
  }
}
