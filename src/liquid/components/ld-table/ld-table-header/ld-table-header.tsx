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

/**
 * @part cell - the table cell
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

  /** Defines the cells that the header element relates to. */
  @Prop() scope: HTMLTableCellElement['scope']

  /** Defines whether the column is sortable. */
  @Prop() sortable = false

  /** Defines whether the column is sorted. */
  @Prop({ mutable: true }) sorted?: 'asc' | 'desc'

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
    this.sorted = undefined
  }

  handleSort = (sortOrder: 'asc' | 'desc') => {
    this.sorted = sortOrder
    const columnIndex = Array.from(this.el.parentNode.children).indexOf(this.el)
    this.ldTableSort.emit({
      columnIndex,
      sortOrder,
    })
  }

  onSortClick = (ev: Event, sortOrder: 'asc' | 'desc') => {
    ev.preventDefault()
    if (closest('ld-button', ev.target as HTMLElement).ariaDisabled) return
    this.handleSort(sortOrder)
  }

  componentWillLoad() {
    if (this.sorted) {
      this.handleSort(this.sorted)
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
      <th class="ld-table-header" scope={this.scope} part="cell">
        <slot />
        {this.sortable && (
          <div class="ld-table-header__sort-buttons" part="sort-buttons">
            <ld-button
              aria-disabled={this.sorted === 'asc' ? 'true' : undefined}
              mode="ghost"
              onClick={(ev) => this.onSortClick(ev, 'asc')}
              part="sort-button-asc"
              size="sm"
            >
              {this.renderChevron(true)}
            </ld-button>
            <ld-button
              aria-disabled={this.sorted === 'desc' ? 'true' : undefined}
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
