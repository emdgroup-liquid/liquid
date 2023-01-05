import { Component, h } from '@stencil/core'

/**
 * @part tbody - the table body
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-body',
  styleUrl: 'ld-table-body.shadow.css',
  shadow: true,
})
export class LdTableBody {
  render() {
    return (
      <tbody class="ld-table-body" part="tbody">
        <slot />
      </tbody>
    )
  }
}
