import { Component, h } from '@stencil/core'

/**
 * @part tfoot - the table footer
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-foot',
  styleUrl: 'ld-table-foot.shadow.css',
  shadow: true,
})
export class LdTableFoot {
  render() {
    return (
      <tfoot class="ld-table-foot" part="tfoot">
        <slot />
      </tfoot>
    )
  }
}
