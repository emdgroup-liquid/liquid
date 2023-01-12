import { Component, h, Prop } from '@stencil/core'

/**
 * @part cell - the actual td element
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-cell',
  styleUrl: 'ld-table-cell.shadow.css',
  shadow: true,
})
export class LdTableCell {
  /** Contains a non-negative integer value that indicates for how many columns the cell extends. */
  @Prop() colspan: HTMLTableCellElement['colSpan']

  /** Contains a list of space-separated strings, each corresponding to the id attribute of the table header elements that apply to this element. */
  @Prop() headers: HTMLTableCellElement['headers']

  /** Contains a non-negative integer value that indicates for how many rows the cell extends. */
  @Prop() rowspan: HTMLTableCellElement['rowSpan']

  render() {
    return (
      <td
        class="ld-table-cell"
        colSpan={this.colspan}
        headers={this.headers}
        part="cell"
        rowSpan={this.rowspan}
      >
        <slot />
      </td>
    )
  }
}
