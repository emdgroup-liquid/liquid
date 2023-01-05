import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core'
import { closest } from '../../../utils/closest'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @part checkbox - the selection checkbox
 * @part label - the selection label
 * @part row - the table row
 * @part select - the selection cell
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-row',
  styleUrl: 'ld-table-row.shadow.css',
  shadow: true,
})
export class LdTableRow {
  @Element() el: HTMLLdTableRowElement

  /** Makes the row selectable by adding a checkbox to the start of the row. */
  @Prop() selectable?: boolean

  /** In selectable mode the checkbox is sticky by default. */
  @Prop() selectionSticky = true

  /** Makes the row selectable by adding a checkbox to the start of the row. */
  @Prop() selecttionLabel = 'Row selection'

  /** Indicates that the row is selected. */
  @Prop({ mutable: true }) selected?: boolean

  /** Indicates that the selection state is indeterminate. */
  @Prop({ mutable: true }) indeterminate?: boolean

  /** Indicates that the row selection is disabled. */
  @Prop() selectionDisabled?: boolean

  /** Emitted with selected state. */
  @Event() ldTableSelectAll: EventEmitter<{
    selected: boolean
  }>

  /** Emitted with row index and selected state. */
  @Event() ldTableSelect: EventEmitter<{
    rowIndex: number
    selected: boolean
  }>

  handleSelect = (selected: boolean) => {
    this.indeterminate = false
    if (closest('ld-table-head', this.el)) {
      this.ldTableSelectAll.emit({
        selected,
      })
    } else {
      const rowIndex = Array.from(this.el.parentNode.children).indexOf(this.el)
      this.ldTableSelect.emit({
        rowIndex,
        selected,
      })
    }
  }

  onSelectInput = (ev: InputEvent) => {
    this.selected = (ev.target as HTMLInputElement).checked
    this.handleSelect(this.selected)
  }

  componentWillLoad() {
    if (this.selected) {
      this.handleSelect(this.selected)
    }
  }

  render() {
    return (
      <tr class="ld-table-row" part="row">
        {this.selectable && (
          <ld-table-cell
            class={getClassNames([
              'ld-table-row__selection-cell',
              this.selectionSticky && 'ld-table-row__selection-cell--sticky',
            ])}
            part="cell select"
          >
            <ld-label class="ld-table__selection-label" part="label">
              <ld-sr-only>{this.selecttionLabel}</ld-sr-only>
              <ld-checkbox
                aria-disabled={this.selectionDisabled ? 'true' : undefined}
                checked={this.selected}
                indeterminate={this.indeterminate}
                onInput={this.onSelectInput}
                part="checkbox"
              />
            </ld-label>
          </ld-table-cell>
        )}
        <slot />
      </tr>
    )
  }
}
