import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @slot - (optional) Custom SVG pagination (only valid without name prop).
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part pagination - Actual SVG element
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-pagination',
  styleUrl: 'ld-pagination.css',
  shadow: true,
})
export class LdPagination {
  @Element() element: HTMLElement
  private itemsPerSlide = 5

  /** Label to communicate the type of an item. */
  @Prop() itemLabel = 'Page'

  /** The maximum number of items. */
  @Prop() length = Infinity

  /** Mode of the pagination. */
  @Prop() mode?: 'dots' | 'select'

  /** The currently selected item (an index of `-1` means nothing is selected). */
  @Prop({ mutable: true }) selectedIndex = 0

  /** Size of the pagination. */
  @Prop() size?: 'sm' | 'lg'

  /** Dispatched, if the selected index changes. */
  @Event() ldchange: EventEmitter<number>

  @Watch('selectedIndex')
  handleChange() {
    this.ldchange.emit(this.selectedIndex)
  }

  private renderItem = (_: unknown, index: number) => {
    const itemNumber = index + 1
    const showOffset = Math.floor(this.itemsPerSlide / 2)
    const isEven = showOffset === this.itemsPerSlide / 2
    const renderDots = this.itemsPerSlide + 2 < this.length
    const showFrom =
      this.length - this.selectedIndex > showOffset + 1
        ? this.selectedIndex >
          this.itemsPerSlide - showOffset + (isEven ? 1 : 0)
          ? this.selectedIndex - showOffset
          : 0
        : this.length - this.itemsPerSlide - 1
    const showTo =
      this.selectedIndex > showOffset
        ? this.selectedIndex < this.length - this.itemsPerSlide + 1
          ? this.selectedIndex + showOffset - (isEven ? 1 : 0)
          : this.length - 1
        : this.itemsPerSlide

    return (
      <li
        class={getClassNames([
          'ld-pagination__item',
          renderDots && index < showFrom && 'ld-pagination__item--hidden-start',
          renderDots && index > showTo && 'ld-pagination__item--hidden-end',
          index === this.selectedIndex && 'ld-pagination__item--selected',
        ])}
        aria-label={`${this.itemLabel} ${itemNumber}`}
      >
        <ld-button
          mode={index === this.selectedIndex ? undefined : 'ghost'}
          onClick={() => {
            this.selectedIndex = index
          }}
          size={this.size}
        >
          {itemNumber}
        </ld-button>
      </li>
    )
  }

  render() {
    const showOffset = Math.floor(this.itemsPerSlide / 2)
    const isEven = showOffset === this.itemsPerSlide / 2
    const renderDots = this.itemsPerSlide + 2 < this.length
    const showStartDots = renderDots && this.selectedIndex > showOffset + 1
    const showEndDots =
      renderDots &&
      this.selectedIndex < this.length - showOffset - (isEven ? 1 : 2)
    const maxSlideIndex = this.length - this.itemsPerSlide - showOffset
    const slideIndex = showStartDots
      ? (showEndDots ? this.selectedIndex - showOffset - 1 : maxSlideIndex) * -1
      : 0

    console.log({
      showEndDots,
      showStartDots,
      selectedIndex: this.selectedIndex,
      showOffset,
    })

    return (
      <Host role="navigation">
        <ul
          class={getClassNames([
            'ld-pagination',
            this.size && `ld-pagination--${this.size}`,
            `ld-pagination--${this.mode ?? 'default'}`,
          ])}
        >
          <li class="ld-pagination__arrow">
            <ld-button
              disabled={this.selectedIndex < 1}
              mode="ghost"
              onClick={() => {
                this.selectedIndex = 0
              }}
              size={this.size}
            >
              <ld-icon name="arrow-double-left" size={this.size} />
            </ld-button>
          </li>
          <li class="ld-pagination__arrow">
            <ld-button
              disabled={this.selectedIndex < 1}
              mode="ghost"
              onClick={() => {
                this.selectedIndex -= 1
              }}
              size={this.size}
            >
              <ld-icon name="arrow-left" size={this.size} />
            </ld-button>
          </li>
          {renderDots && (
            <li
              class={getClassNames([
                'ld-pagination__dots ld-pagination__dots--start',
                showStartDots && 'ld-pagination__dots--visible',
              ])}
            >
              ...
            </li>
          )}
          <li
            class="ld-pagination__slide-wrapper"
            style={{
              '--ld-pagination-slider-cols': `${
                this.itemsPerSlide + 2 < this.length
                  ? this.itemsPerSlide + 2
                  : this.length
              }`,
            }}
          >
            <ul
              class="ld-pagination__items"
              style={{
                '--ld-pagination-slide-index': `${slideIndex}`,
              }}
            >
              {this.length > 0 &&
                Array.from({ length: this.length }).map(this.renderItem)}
              <li
                class="ld-pagination__marker"
                style={{
                  '--ld-pagination-selected-index': `${this.selectedIndex}`,
                }}
              />
            </ul>
          </li>
          {renderDots && (
            <li
              class={getClassNames([
                'ld-pagination__dots ld-pagination__dots--end',
                showEndDots && 'ld-pagination__dots--visible',
              ])}
            >
              ...
            </li>
          )}
          <li class="ld-pagination__arrow">
            <ld-button
              disabled={this.selectedIndex >= this.length - 1}
              mode="ghost"
              size={this.size}
              onClick={() => {
                this.selectedIndex += 1
              }}
            >
              <ld-icon name="arrow-right" size={this.size} />
            </ld-button>
          </li>
          <li class="ld-pagination__arrow">
            <ld-button
              disabled={this.selectedIndex >= this.length - 1}
              mode="ghost"
              onClick={() => {
                this.selectedIndex = this.length - 1
              }}
              size={this.size}
            >
              <ld-icon name="arrow-double-right" size={this.size} />
            </ld-button>
          </li>
        </ul>
      </Host>
    )
  }
}
