import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'ld-checkbox',
  styleUrl: 'ld-checkbox.css',
  shadow: false,
})
export class LdCheckbox {
  render() {
    return (
      <Host class="ld-checkbox">
        <slot></slot>
      </Host>
    )
  }
}
