import { Component, h, Host } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-toolbar',
  styleUrl: 'ld-table-toolbar.shadow.css',
  shadow: true,
})
export class LdTableToolbar {
  render() {
    return (
      <Host class="ld-table__toolbar">
        <slot />
      </Host>
    )
  }
}
