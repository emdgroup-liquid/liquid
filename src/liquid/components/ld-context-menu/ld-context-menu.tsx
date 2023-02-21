import { Component, Element, h, Prop } from '@stencil/core'

@Component({
  tag: 'ld-context-menu',
  styleUrl: 'ld-context-menu.css',
  shadow: true,
})
export class LdContextMenu {
  @Element() el: HTMLLdContextMenuElement
  private menuRef: HTMLLdMenuElement

  /** Size of the context menu. */
  @Prop() position?: HTMLLdTooltipElement['position'] = 'bottom left'

  /** Size of the context menu. */
  @Prop() size?: 'sm' | 'lg'

  componentDidLoad() {
    const style = this.el.getAttribute('style')

    if (style) {
      this.menuRef.setAttribute('style', style)
      this.el.removeAttribute('style')
    }
  }

  render() {
    return (
      <ld-tooltip position={this.position} triggerType="click" unstyled>
        <slot name="trigger" slot="trigger" />
        <ld-menu ref={(el) => (this.menuRef = el)} size={this.size}>
          <slot />
        </ld-menu>
      </ld-tooltip>
    )
  }
}
