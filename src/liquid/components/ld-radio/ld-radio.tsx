import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host } from '@stencil/core'

@Component({
  tag: 'ld-radio',
  styleUrl: 'ld-radio.css',
  shadow: false,
})
export class LdRadio {
  render() {
    return (
      <Host class="ld-radio">
        <slot></slot>
      </Host>
    )
  }
}
