import { Component, Host, h, Element, Prop } from '@stencil/core'

@Component({
  tag: 'ld-context-menu',
  styleUrl: 'ld-context-menu.css',
  shadow: true,
})
export class LdContextMenu {
  @Element() el: HTMLLdContextMenuElement

  /** Size of the context menu. */
  @Prop() size?: 'sm' | 'lg'

  componentWillLoad() {
    this.el.querySelectorAll('ld-menuitem').forEach((ldMenuItem) => {
      ldMenuItem.size = this.size
    })
  }

  render() {
    return (
      <Host>
        <slot name="trigger" />
        <ul class="ld-context-menu" role="menu">
          <slot />
        </ul>
      </Host>
    )
  }
}
