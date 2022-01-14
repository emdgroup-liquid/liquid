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
  private offsetItems = 2
  private stickyItems = 3

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

  // pageNumber is 1-based
  private renderItem = (pageNumber: number) => {
    const renderDots = this.offsetItems * 2 + 1 + 2 < this.length
    // 1-based
    const showFrom =
      (this.length - this.selectedIndex > this.offsetItems + 1
        ? this.selectedIndex > this.offsetItems * 2 + 1 - this.offsetItems
          ? this.selectedIndex - this.offsetItems
          : 0
        : this.length - (this.offsetItems * 2 + 1) - 1) + 1
    // 1-based
    const showTo =
      (this.selectedIndex > this.offsetItems
        ? this.selectedIndex < this.length - this.offsetItems * 2
          ? this.selectedIndex + this.offsetItems
          : this.length - 1
        : this.offsetItems * 2 + 1) + 1

    return (
      <li
        class={getClassNames([
          'ld-pagination__item',
          renderDots &&
            pageNumber < showFrom &&
            'ld-pagination__item--hidden-start',
          renderDots &&
            pageNumber > showTo &&
            'ld-pagination__item--hidden-end',
          pageNumber === this.selectedIndex + 1 &&
            'ld-pagination__item--selected',
        ])}
        aria-label={`${this.itemLabel} ${pageNumber}`}
      >
        <ld-button
          mode="ghost"
          onClick={() => {
            this.selectedIndex = pageNumber - 1
          }}
          size={this.size}
        >
          {pageNumber}
        </ld-button>
      </li>
    )
  }

  render() {
    const renderSticky =
      this.stickyItems > 0 &&
      this.length > this.stickyItems * 2 + this.offsetItems * 2 + 1
    const renderDots = this.offsetItems * 2 + 1 + 2 < this.length
    const showStartDots =
      renderDots && this.selectedIndex > this.offsetItems + 1
    const showEndDots =
      renderDots && this.selectedIndex < this.length - this.offsetItems - 2
    // const maxSlideIndex = this.length - this.offsetItems * 3 - 1
    // const slideIndex = showStartDots
    //   ? (showEndDots
    //       ? this.selectedIndex - this.offsetItems - 1
    //       : maxSlideIndex) * -1
    //   : 0
    const bufferLength = this.offsetItems * 2 + 1

    return (
      <Host role="navigation">
        <ul
          class={getClassNames([
            'ld-pagination',
            this.size && `ld-pagination--${this.size}`,
            `ld-pagination--${this.mode ?? 'default'}`,
          ])}
        >
          {this.stickyItems === 0 && (
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
          )}
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
          {renderSticky &&
            Array.from({ length: this.stickyItems }).map(
              (_: unknown, index: number) => (
                <li
                  class={getClassNames([
                    'ld-pagination__sticky ld-pagination__sticky--start',
                  ])}
                >
                  <ld-button
                    mode="ghost"
                    onClick={() => {
                      this.selectedIndex = index
                    }}
                    size={this.size}
                  >
                    {index + 1}
                  </ld-button>
                </li>
              )
            )}
          {renderDots && (
            <li
              class={getClassNames([
                'ld-pagination__dots ld-pagination__dots--start',
                showStartDots && 'ld-pagination__dots--visible',
              ])}
            >
              . . .
            </li>
          )}
          <li
            class="ld-pagination__slide-wrapper"
            style={{
              '--ld-pagination-slider-cols': `${
                this.offsetItems * 2 + 1 + 2 < this.length
                  ? this.offsetItems * 2 + 1 + 2
                  : this.length
              }`,
            }}
          >
            <ul
              class="ld-pagination__items"
              style={{
                '--ld-pagination-slide-index': `${
                  (this.selectedIndex - this.offsetItems) * -1
                }`,
              }}
            >
              {this.length > 0 &&
                Array.from({ length: bufferLength })
                  .map((_: unknown, index: number) =>
                    this.selectedIndex <= this.stickyItems - 1
                      ? index + this.stickyItems + 1
                      : this.selectedIndex >= this.length - this.stickyItems
                      ? this.length -
                        this.stickyItems -
                        (bufferLength - index) +
                        1
                      : index + this.selectedIndex - this.offsetItems
                  )
                  .map(this.renderItem)}
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
              . . .
            </li>
          )}
          {renderSticky &&
            Array.from({ length: this.stickyItems })
              .map((_: unknown, index: number) => (
                <li
                  class={getClassNames([
                    'ld-pagination__sticky ld-pagination__sticky--start',
                  ])}
                >
                  <ld-button
                    mode="ghost"
                    onClick={() => {
                      this.selectedIndex = this.length - index - 1
                    }}
                    size={this.size}
                  >
                    {this.length - index}
                  </ld-button>
                </li>
              ))
              .reverse()}
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
          {this.stickyItems === 0 && (
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
          )}
        </ul>
      </Host>
    )
  }
}
