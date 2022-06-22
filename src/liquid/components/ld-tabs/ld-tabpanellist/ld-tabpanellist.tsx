import { Component, h, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tabpanellist',
  styleUrl: 'ld-tabpanellist.shadow.css',
  shadow: true,
})
export class LdTabpanellist {
  render() {
    return (
      <Host class="ld-tabpanellist">
        <slot></slot>
      </Host>
    )
  }
}
