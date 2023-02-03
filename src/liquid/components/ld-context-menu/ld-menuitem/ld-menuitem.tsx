import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'ld-menuitem',
  styleUrl: 'ld-menuitem.css',
  shadow: true,
})
export class LdMenuitem {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
