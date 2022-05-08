import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Watch,
  State,
} from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

const BUFFER_SIZE = 20

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part arrow - all arrow items (`ld-button` elements)
 * @part more-indicator - list-items containing more-indicator
 * @part end - arrow to jump to the last item (`ld-button` element)
 * @part item - all pagination items containing a number (`ld-button` elements)
 * @part items - list containing all slidable items and the marker
 * @part list-wrapper - list-item containing the `ul` element with slidable items
 * @part marker - marker highlighting the selected item
 * @part next - arrow to go to the next item (`ld-button` element)
 * @part prev - arrow to go to the previous item (`ld-button` element)
 * @part start - arrow to jump to the first item (`ld-button` element)
 * @part sticky - all sticky items (`ld-button` elements)
 * @part mode - items display mode, 'dots' | 'numbers'(default)
 * @part onBrand - switches the colors to white
 * @part wrapper - list containing all pagination items
 * @part space - Space between column dot items, translated in rem (default 0.25rem)
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-pagination',
  styleUrl: 'ld-pagination.shadow.css',
  shadow: true,
})
export class LdPagination {
  /** Hide the buttons to navigate forward/backward. */
  @Prop() hidePrevNext = false

  /** Hide the buttons to navigate to the first/last item. */
  @Prop() hideStartEnd = false

  /** Label to communicate the type of an item. */
  @Prop() itemLabel = 'Page'

  /** The number of items/pages available for pagination (required to let the user jump to the last item/page). */
  @Prop({ mutable: true }) length = Infinity

  /** The currently selected item (an index of `-1` means nothing is selected). */
  @Prop({ mutable: true }) selectedIndex = 0

  /** Label text for the end button (replaces the icon). */
  @Prop() endLabel?: string

  /** Label text for the forward button (replaces the icon). */
  @Prop() nextLabel?: string

  /** Number of next/previous items visible. */
  @Prop() offset = 2

  /** Label text for the backward button (replaces the icon). */
  @Prop() prevLabel?: string

  /** Size of the pagination. */
  @Prop() size?: 'sm' | 'lg'

  /** Label text for the start button (replaces the icon). */
  @Prop() startLabel?: string

  /** Number of items permanently visible at the start/end. */
  @Prop() sticky = 0

  /** Items display mode, default as numbers */
  @Prop() mode?: 'numbers' | 'dots' = 'numbers'

  /** Switch colors for brand background */
  @Prop() brandColor?: boolean

  /** Space between column dot items, translated in rem (default 0.25rem) */
  @Prop() space?: number

  @State() maxSliderColumns = 0
  @State() renderMoreIndicators = false
  @State() renderSticky = false
  @State() slidableItems: number[] = []
  @State() sliderContent: number[] = []
  @State() visibleItemsInSlider = 0

  /** Dispatched, if the selected index changes. */
  @Event() ldchange: EventEmitter<number>

  @Watch('selectedIndex')
  handleSelectedIndex() {
    if (this.selectedIndex < 0) {
      this.selectedIndex = 0
    } else if (this.selectedIndex >= this.length) {
      this.selectedIndex = this.length - 1
    } else {
      this.ldchange.emit(this.selectedIndex)
    }
  }

  // pageNumber is 1-based
  private renderItem = (
    itemNumber: number,
    showFrom: number,
    showTo: number,
    mode: string
  ) => {
    const isDots = mode === 'dots'
    const isHidden =
      (this.renderMoreIndicators || isDots) &&
      (itemNumber < showFrom || itemNumber > showTo)
    const isSelected = itemNumber === this.selectedIndex + 1
    return (
      <li
        aria-hidden={isHidden ? 'true' : undefined}
        class={getClassNames([
          'ld-pagination__item',
          !isHidden && 'ld-pagination__item--visible',
          isSelected && 'ld-pagination__item--selected',
          isDots && 'ld-pagination__item--dots',
        ])}
        key={itemNumber}
        style={{ '--ld-pagination-item-pos': `${itemNumber - 1}` }}
      >
        <ld-button
          aria-current={isSelected ? 'true' : undefined}
          aria-label={isHidden ? undefined : `${this.itemLabel} ${itemNumber}`}
          ld-tabindex={isHidden ? -1 : undefined}
          mode="ghost"
          onClick={() => {
            this.selectedIndex = itemNumber - 1
          }}
          part="item focusable"
          size={this.size}
        >
          {isDots ? <span class="ld-pagination__dot"></span> : itemNumber}
        </ld-button>
      </li>
    )
  }

  private calculateSliderContent = () => {
    const directlyReachableFirstItems = this.maxSliderColumns + this.sticky - 1
    const directlyReachableLastItems =
      this.length - this.maxSliderColumns - this.sticky + 1

    this.sliderContent = this.slidableItems.filter(
      (itemNumber) =>
        (itemNumber > this.selectedIndex - BUFFER_SIZE &&
          itemNumber <= this.selectedIndex + BUFFER_SIZE) ||
        // render the first/last items in case the user can navigate there directly
        ((!this.hideStartEnd || this.sticky > 0) &&
          (itemNumber <= directlyReachableFirstItems ||
            itemNumber > directlyReachableLastItems))
    )
  }

  @Watch('length')
  @Watch('offset')
  @Watch('sticky')
  componentWillLoad() {
    this.visibleItemsInSlider = this.offset * 2 + 1
    const maxVisibleItems = this.sticky * 2 + this.visibleItemsInSlider
    this.maxSliderColumns = this.visibleItemsInSlider + 2
    this.renderSticky = this.sticky > 0 && this.mode !== 'dots'
    this.renderMoreIndicators =
      this.mode !== 'dots' && this.length > maxVisibleItems + 2
    this.slidableItems = Array.from({
      length: this.length === Infinity ? 9999 : this.length - this.sticky * 2,
    }).map((_, index) => index + this.sticky + 1)

    if (this.length < 1) {
      this.length = 1
    }

    if (this.selectedIndex < 0) {
      this.selectedIndex = 0
    } else if (this.selectedIndex >= this.length) {
      this.selectedIndex = this.length - 1
    }

    this.calculateSliderContent()
  }

  render() {
    const isDots = this.mode === 'dots'
    const styleDots =
      isDots && !isNaN(parseFloat(this.space + ''))
        ? { '--ld-pagination-items-space': `${this.space}rem` }
        : undefined
    // +1 because it must be the index right to the centered item
    const showStartMoreIndicator =
      this.renderMoreIndicators &&
      this.selectedIndex > this.sticky + this.offset + 1
    // -1 because it is 0-based and another -1 because it must be the index left to the centered item
    const showEndMoreIndicator =
      this.renderMoreIndicators &&
      this.selectedIndex < this.length - this.offset - this.sticky - 2
    const showFrom =
      // +1 because it is not 0-based
      Math.max(
        Math.min(
          this.selectedIndex -
            this.offset -
            // start hiding numbers
            (showStartMoreIndicator ? 0 : 1),
          this.length -
            this.visibleItemsInSlider -
            this.sticky -
            1 +
            (isDots ? -1 : 0)
        ),
        this.sticky
      ) + 1
    // +1 because it is not 0-based
    const showTo =
      Math.min(
        Math.max(
          this.selectedIndex + (showEndMoreIndicator ? 0 : 1),
          this.offset + this.sticky + 1 + (isDots ? 1 : 0)
        ) + this.offset,
        this.length - this.sticky
      ) + 1

    return (
      <Host role="navigation">
        <ul
          aria-label="Pagination"
          class={getClassNames([
            'ld-pagination',
            this.size && `ld-pagination--${this.size}`,
            isDots && `ld-pagination--dots`,
            this.brandColor && 'ld-pagination--brand-color',
          ])}
          part="wrapper"
          style={styleDots}
        >
          {!this.hideStartEnd && (
            <li
              class={getClassNames([
                'ld-pagination__arrow',
                isDots && `ld-pagination__arrow--left`,
              ])}
            >
              <ld-button
                aria-label={
                  this.startLabel
                    ? undefined
                    : `First ${this.itemLabel.toLocaleLowerCase()}`
                }
                disabled={this.selectedIndex < 1 ? true : undefined}
                mode="ghost"
                onClick={() => {
                  this.selectedIndex = 0
                }}
                part="arrow start focusable"
                size={this.size}
              >
                {this.startLabel ? (
                  this.startLabel
                ) : (
                  <ld-icon name="arrow-double-left" size={this.size} />
                )}
              </ld-button>
            </li>
          )}
          {!this.hidePrevNext && (
            <li
              class={getClassNames([
                'ld-pagination__arrow',
                isDots && `ld-pagination__arrow--left`,
              ])}
            >
              <ld-button
                aria-label={
                  this.prevLabel
                    ? undefined
                    : `Previous ${this.itemLabel.toLocaleLowerCase()}`
                }
                disabled={this.selectedIndex < 1}
                mode="ghost"
                onClick={() => {
                  this.selectedIndex -= 1
                }}
                part="arrow prev focusable"
                size={this.size}
              >
                {this.prevLabel ? (
                  this.prevLabel
                ) : (
                  <ld-icon name="arrow-left" size={this.size} />
                )}
              </ld-button>
            </li>
          )}
          {this.renderSticky &&
            Array.from({ length: Math.min(this.sticky, this.length) }).map(
              (_: unknown, index: number) => {
                return (
                  <li class="ld-pagination__sticky">
                    <ld-button
                      aria-label={`${this.itemLabel} ${index + 1}`}
                      mode="ghost"
                      onClick={() => {
                        this.selectedIndex = index
                      }}
                      part="sticky item focusable"
                      size={this.size}
                    >
                      {index + 1}
                    </ld-button>
                  </li>
                )
              }
            )}
          {this.renderMoreIndicators && (
            <li
              class={getClassNames([
                'ld-pagination__more-indicator',
                showStartMoreIndicator &&
                  'ld-pagination__more-indicator--visible',
              ])}
              part="more-indicator"
            >
              <span>. . .</span>
            </li>
          )}
          <li
            class={getClassNames([
              'ld-pagination__slide-wrapper',
              isDots && 'ld-pagination__slide-wrapper--dots',
            ])}
            part="slide-wrapper"
            style={{
              '--ld-pagination-slider-cols': `${Math.min(
                this.slidableItems.length,
                this.maxSliderColumns
              )}`,
            }}
          >
            <ul
              class="ld-pagination__items"
              part="items"
              style={{
                '--ld-pagination-slide-index': `${Math.max(
                  Math.min(
                    this.selectedIndex - this.offset - 1,
                    // -1 because of the "..." and another -1 because it is 0-based
                    this.length - this.visibleItemsInSlider - this.sticky - 2
                  ),
                  // marker position in case of length < sticky
                  Math.min(this.sticky, this.length),
                  0
                )}`,
              }}
            >
              {this.mode !== 'dots' && (
                <li
                  class="ld-pagination__marker"
                  key="marker"
                  onTransitionEnd={this.calculateSliderContent}
                  part="marker"
                  style={{
                    '--ld-pagination-selected-index': `${this.selectedIndex}`,
                  }}
                />
              )}
              {this.length > 0 &&
                this.sliderContent.map((itemNumber) =>
                  this.renderItem(itemNumber, showFrom, showTo, this.mode)
                )}
            </ul>
          </li>
          {this.renderMoreIndicators && (
            <li
              class={getClassNames([
                'ld-pagination__more-indicator ld-pagination__more-indicator--end',
                showEndMoreIndicator &&
                  'ld-pagination__more-indicator--visible',
              ])}
              part="more-indicator"
            >
              <span>. . .</span>
            </li>
          )}
          {this.renderSticky &&
            this.length < Infinity &&
            Array.from({ length: this.sticky })
              .map((_: unknown, index: number) => {
                const itemNumber = this.length - index

                if (itemNumber <= this.sticky) {
                  return null
                }

                return (
                  <li class="ld-pagination__sticky">
                    <ld-button
                      mode="ghost"
                      onClick={() => {
                        this.selectedIndex = itemNumber - 1
                      }}
                      part="sticky item focusable"
                      size={this.size}
                    >
                      {itemNumber}
                    </ld-button>
                  </li>
                )
              })
              .reverse()}
          {!this.hidePrevNext && (
            <li
              class={getClassNames([
                'ld-pagination__arrow',
                isDots && `ld-pagination__arrow--right`,
              ])}
            >
              <ld-button
                aria-label={
                  this.nextLabel
                    ? undefined
                    : `Next ${this.itemLabel.toLocaleLowerCase()}`
                }
                disabled={this.selectedIndex >= this.length - 1}
                mode="ghost"
                onClick={() => {
                  this.selectedIndex += 1
                }}
                part="arrow next focusable"
                size={this.size}
              >
                {this.nextLabel ? (
                  this.nextLabel
                ) : (
                  <ld-icon name="arrow-right" size={this.size} />
                )}
              </ld-button>
            </li>
          )}
          {this.length < Infinity && !this.hideStartEnd && (
            <li
              class={getClassNames([
                'ld-pagination__arrow',
                isDots && `ld-pagination__arrow--right`,
              ])}
            >
              <ld-button
                aria-label={
                  this.endLabel
                    ? undefined
                    : `Last ${this.itemLabel.toLocaleLowerCase()}`
                }
                disabled={this.selectedIndex >= this.length - 1}
                mode="ghost"
                onClick={() => {
                  this.selectedIndex = this.length - 1
                }}
                part="arrow end focusable"
                size={this.size}
              >
                {this.endLabel ? (
                  this.endLabel
                ) : (
                  <ld-icon name="arrow-double-right" size={this.size} />
                )}
              </ld-button>
            </li>
          )}
        </ul>
      </Host>
    )
  }
}
