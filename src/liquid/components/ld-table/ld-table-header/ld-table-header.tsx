import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
} from '@stencil/core'
import { closest } from '../../../utils/closest'
import { getClassNames } from '../../../utils/getClassNames'
import { isAriaDisabled } from '../../../utils/ariaDisabled'

/**
 * @part cell - the actual th element
 * @part sort-button-asc - ascending sort button
 * @part sort-button-desc - descending sort button
 * @part sort-buttons - container wrapping the sort buttons
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-table-header',
  styleUrl: 'ld-table-header.shadow.css',
  shadow: true,
})
export class LdTableHeader {
  @Element() el: HTMLLdTableHeaderElement

  /**
   * This attribute contains a short abbreviated description
   * of the cell's content. Some user-agents, such as speech readers,
   * may present this description before the content itself.
   */
  @Prop() abbr?: HTMLTableCellElement['abbr']

  /** Indicates for how many columns the cell extends. */
  @Prop() colspan?: HTMLTableCellElement['colSpan']

  /**
   * This attribute contains a list of space-separated strings,
   * each corresponding to the id attribute of the <th> elements
   * that apply to this element.
   */
  @Prop() headers?: HTMLTableCellElement['headers']

  /** Indicates for how many rows the cell extends. */
  @Prop() rowspan?: HTMLTableCellElement['rowSpan']

  /** Defines the cells that the header element relates to. */
  @Prop() scope?: HTMLTableCellElement['scope']

  /** Defines whether the column is sortable. */
  @Prop() sortable? = false

  /** Defines whether the column is sorted and in which order. */
  @Prop({ mutable: true }) sortOrder?: 'asc' | 'desc'

  /** Emitted with culumn index and sort order. */
  @Event() ldTableSort: EventEmitter<{
    columnIndex: number
    sortOrder: 'asc' | 'desc'
  }>

  /**
   * @internal
   * Resets sort buttons.
   */
  @Method()
  async resetSort() {
    this.sortOrder = undefined
  }

  handleSort = (sortOrder: 'asc' | 'desc') => {
    this.sortOrder = sortOrder
    const columnIndex = Array.from(this.el.parentNode.children).indexOf(this.el)
    this.ldTableSort.emit({
      columnIndex,
      sortOrder,
    })
  }

  onSortClick = (ev: Event, sortOrder: 'asc' | 'desc') => {
    ev.preventDefault()
    ev.stopPropagation()
    if (
      isAriaDisabled(
        closest('ld-button', ev.target as HTMLElement).ariaDisabled
      )
    ) {
      return
    }
    this.handleSort(sortOrder)
  }

  onThClick = () => {
    if (!this.sortable) return
    if (this.sortOrder === 'desc') {
      this.handleSort('asc')
    } else {
      this.handleSort('desc')
    }
  }

  componentWillLoad() {
    if (this.sortOrder) {
      this.handleSort(this.sortOrder)
    }
  }

  renderChevron(asc?: boolean) {
    return (
      <ld-icon size="sm" part={`icon chevron-${asc ? 'asc' : 'desc'}`}>
        <svg
          fill="none"
          height="7"
          part={`svg svg-${asc ? 'asc' : 'desc'}`}
          style={{
            transform: asc ? undefined : 'rotate(180deg)',
          }}
          viewBox="0 0 15 7"
          width="15"
        >
          <path
            d="M13.3 5.5 7.3 1l-6 4.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ld-icon>
    )
  }

  render() {
    return (
      <th
        class={getClassNames([
          'ld-table-header',
          this.sortable && 'ld-table-header--sortable',
        ])}
        abbr={this.abbr}
        colSpan={this.colspan}
        headers={this.abbr}
        rowspan={this.rowspan}
        scope={this.scope}
        part="cell"
        onClick={this.onThClick}
      >
        <slot />
        {this.sortable && (
          <div class="ld-table-header__sort-buttons" part="sort-buttons">
            <ld-button
              aria-disabled={this.sortOrder === 'asc' ? 'true' : undefined}
              mode="ghost"
              onClick={(ev) => this.onSortClick(ev, 'asc')}
              part="sort-button-asc"
              size="sm"
            >
              {this.renderChevron(true)}
            </ld-button>
            <ld-button
              aria-disabled={this.sortOrder === 'desc' ? 'true' : undefined}
              mode="ghost"
              onClick={(ev) => this.onSortClick(ev, 'desc')}
              part="sort-button-desc"
              size="sm"
            >
              {this.renderChevron()}
            </ld-button>
          </div>
        )}
      </th>
    )
  }
}
