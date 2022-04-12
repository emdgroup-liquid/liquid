import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tabpanel',
  styleUrl: 'ld-tabpanel.shadow.css',
  shadow: true,
})
export class LdTabpanel {
  render() {
    return (
      <Host role="tabpanel" class="ld-tabpanel" tabindex="-1">
        <slot></slot>
      </Host>
    )
  }
}
