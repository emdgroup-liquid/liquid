import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { closest } from '../../utils/closest'

/**
 * @part scroll-container - the scroll-container wrapping the table element
 * @part table - the table element
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table',
  styleUrl: 'ld-table.css',
  shadow: true,
})
export class LdTable {
  @Element() el: HTMLLdTableElement
  tableRef: HTMLTableElement

  // The following events is not used within the ld-table component itself.
  // Their only purpose is to create type definitions on the ld-table component,
  // in order to be able to add inline listeners in TSX, for listening
  // on the events bubling up from ld-table-* sub-components.

  /** Emitted from ld-table-header with culumn index and sort order. */
  @Event() ldTableSort: EventEmitter<{
    columnIndex: number
    sortOrder: 'asc' | 'desc'
  }>

  /** Emitted from ld-table-row with row index and selected state. */
  @Event() ldTableSelect: EventEmitter<{
    rowIndex: number
    selected: boolean
  }>

  /** Emitted from ld-table-row with selected state. */
  @Event() ldTableSelectAll: EventEmitter<{
    selected: boolean
  }>

  @Listen('ldTableSort')
  handleTableSort(
    ev: CustomEvent<{
      columnIndex: number
      sortOrder?: 'asc' | 'desc'
    }>
  ) {
    const ldTableHeader = closest('ld-table-header', ev.target as HTMLElement)
    Array.from(ldTableHeader.parentNode.children).forEach(
      (th: HTMLLdTableHeaderElement, index) => {
        if (index !== ev.detail.columnIndex) {
          th.resetSort()
        }
      }
    )

    if (ev.defaultPrevented) return

    const ldTableBody = this.el.querySelector('ld-table-body')
    Array.from(ldTableBody.querySelectorAll('ld-table-row'))
      .sort(this.getComparer(ev.detail.columnIndex, ev.detail.sortOrder))
      .forEach((tr) => ldTableBody.appendChild(tr))
  }

  @Listen('ldTableSelectAll')
  handleTableSelectAll(
    ev: CustomEvent<{
      selected: boolean
    }>
  ) {
    if (ev.defaultPrevented) return

    // Select or deselect all.
    const ldTableBody = this.el.querySelector('ld-table-body')
    Array.from(ldTableBody.querySelectorAll('ld-table-row')).forEach(
      (tr) => (tr.selected = ev.detail.selected)
    )
  }

  @Listen('ldTableSelect')
  async handleTableSelect(
    ev: CustomEvent<{
      selected: boolean
    }>
  ) {
    if (ev.defaultPrevented) return

    // Check if all are selected and update select all checkbox.
    const ldTableBody = this.el.querySelector('ld-table-body')
    const allRowsInTableBody = ldTableBody.querySelectorAll('ld-table-row')
    const allSelected = Array.from(allRowsInTableBody).every(
      (tr) => tr.selected
    )
    const noneSelected = Array.from(allRowsInTableBody).every(
      (tr) => !tr.selected
    )
    const ldTableHead = this.el.querySelector('ld-table-head')
    if (!ldTableHead) return

    const firstRowInHead = ldTableHead.querySelector('ld-table-row')
    firstRowInHead.selected = allSelected
    firstRowInHead.indeterminate = !allSelected && !noneSelected
  }

  getCellValue = (tr: HTMLLdTableRowElement, columnIndex: number) =>
    tr.children[columnIndex].textContent.trim()

  getComparer =
    (columnIndex: number, sortOrder: 'asc' | 'desc') =>
    (tr1: HTMLLdTableRowElement, tr2: HTMLLdTableRowElement) => {
      const str1 = this.getCellValue(
        sortOrder === 'asc' ? tr1 : tr2,
        columnIndex
      )
      const str2 = this.getCellValue(
        sortOrder === 'asc' ? tr2 : tr1,
        columnIndex
      )
      const num1 = parseFloat(str1.replaceAll(/,/g, ''))
      const num2 = parseFloat(str2.replaceAll(/,/g, ''))
      if (!isNaN(num1) && !isNaN(num2)) {
        return num1 - num2
      }
      return str1.localeCompare(str2)
    }

  componentDidLoad() {
    const hasSelectionDisabled = Array.from(
      this.el.querySelectorAll('ld-table-row')
    ).some((tr) => tr.selectionDisabled)
    if (hasSelectionDisabled) {
      const firstRowInHead = this.el.querySelector<HTMLLdTableRowElement>(
        'ld-table-head ld-table-row'
      )
      if (firstRowInHead) {
        firstRowInHead.selectionDisabled = true
      }
    }
  }

  render() {
    const cl = getClassNames(['ld-table'])

    return (
      <Host
        class={cl}
        role="figure"
        style={{
          // Increase specificity to overwrite Tailwind's preflight reset.
          border: 'solid var(--ld-sp-1) var(--ld-table-border-col)',
        }}
      >
        <slot name="toolbar" />
        <div part="scroll-container" class="ld-table__scroll-container">
          <table part="table" ref={(el) => (this.tableRef = el)}>
            <slot />
          </table>
        </div>
      </Host>
    )
  }
}
