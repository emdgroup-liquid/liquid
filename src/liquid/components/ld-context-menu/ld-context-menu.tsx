import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'ld-context-menu',
  styleUrl: 'ld-context-menu.css',
  shadow: true,
})
export class LdContextMenu {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
