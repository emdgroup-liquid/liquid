import { Component, h, Prop } from '@stencil/core'

/**
 * @part col - the col
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-col',
  styleUrl: 'ld-table-col.shadow.css',
  shadow: true,
})
export class LdTableCol {
  /** indicating the number of consecutive columns the colgroup element spans. */
  @Prop() span: HTMLTableColElement['span']

  render() {
    return (
      <col class="ld-table-col" span={this.span} part="col">
        <slot />
      </col>
    )
  }
}
