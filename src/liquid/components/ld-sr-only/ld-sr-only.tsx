import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'ld-sr-only',
  styleUrl: 'ld-sr-only.css',
  shadow: true,
})
export class LdSrOnly {
  render() {
    return (
      <Host class="ld-sr-only">
        <slot></slot>
      </Host>
    )
  }
}
