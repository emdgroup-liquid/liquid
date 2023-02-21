import { Component, Element, h, Prop } from '@stencil/core'

const isMenuItem = (element: Element): element is HTMLLdMenuitemElement =>
  element.tagName === 'LD-MENUITEM'

const isSlot = (element: Element): element is HTMLSlotElement =>
  element.tagName === 'SLOT'

@Component({
  tag: 'ld-menu',
  styleUrl: 'ld-menu.css',
  shadow: true,
})
export class LdMenu {
  @Element() el: HTMLLdMenuElement

  /** Size of the context menu. */
  @Prop() size?: 'sm' | 'lg'

  private forwardSize = (node: Element) => {
    if (isMenuItem(node)) {
      node.size = this.size
      return
    }

    if (isSlot(node)) {
      node.assignedNodes().forEach(this.forwardSize)
      return
    }

    node.childNodes.forEach(this.forwardSize)
  }

  componentWillLoad() {
    this.el.querySelectorAll('slot, ld-menuitem').forEach(this.forwardSize)
  }

  render() {
    return (
      <ul class="ld-menu" part="list" role="menu">
        <slot></slot>
      </ul>
    )
  }
}
