import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter,
  Watch,
  State,
} from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part arrow - all arrow items (`ld-button` elements)
 * @part dots - list-items containing dots
 * @part end - arrow to jump to the last item (`ld-button` element)
 * @part item - all pagination items containing a number (`ld-button` elements)
 * @part items - list containing all slidable items and the marker
 * @part list-wrapper - list-item containing the `ul` element with slidable items
 * @part marker - marker highlighting the selected item
 * @part next - arrow to go to the next item (`ld-button` element)
 * @part prev - arrow to go to the previous item (`ld-button` element)
 * @part start - arrow to jump to the first item (`ld-button` element)
 * @part sticky - all sticky items (`ld-button` elements)
 * @part wrapper - list containing all pagination items
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-pagination',
  styleUrl: 'ld-pagination.css',
  shadow: true,
})
export class LdPagination {
  @Element() element: HTMLElement

  /** Label to communicate the type of an item. */
  @Prop() itemLabel = 'Page'

  /** The maximum number of items. */
  @Prop({ mutable: true }) length = Infinity

  /** The currently selected item (an index of `-1` means nothing is selected). */
  @Prop({ mutable: true }) selectedIndex = 0

  /** Number of next/previous items visible. */
  @Prop() offset = 2

  /** Size of the pagination. */
  @Prop() size?: 'sm' | 'lg'

  /** Number of items permanently visible at the start/end. */
  @Prop() sticky = 0

  @State() maxSliderColumns = 0
  @State() renderDots = false
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
    showTo: number
  ) => {
    const isHidden =
      this.renderDots && (itemNumber < showFrom || itemNumber > showTo)
    const isSelected = itemNumber === this.selectedIndex + 1
    return (
      <li
        aria-hidden={isHidden ? 'true' : undefined}
        class={getClassNames([
          'ld-pagination__item',
          !isHidden && 'ld-pagination__item--visible',
          isSelected && 'ld-pagination__item--selected',
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
          part="item"
          size={this.size}
        >
          {itemNumber}
        </ld-button>
      </li>
    )
  }

  @Watch('selectedIndex')
  calculateSliderContent() {
    const newSliderContent = this.slidableItems.filter(
      (itemNumber) =>
        itemNumber > this.selectedIndex - 20 &&
        itemNumber < this.selectedIndex + 20
    )

    // Required because the rendering does not work properly and thus we
    // have to await the animation before updating the slider content.
    setTimeout(() => {
      this.sliderContent = newSliderContent
    }, 100)
  }

  @Watch('length')
  @Watch('offset')
  @Watch('sticky')
  componentWillLoad() {
    this.visibleItemsInSlider = this.offset * 2 + 1
    const maxVisibleItems = this.sticky * 2 + this.visibleItemsInSlider
    this.maxSliderColumns = this.visibleItemsInSlider + 2
    this.renderSticky = this.sticky > 0
    this.renderDots = this.length > maxVisibleItems + 2
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

    this.sliderContent = this.slidableItems.filter(
      (itemNumber) =>
        itemNumber > this.selectedIndex - 20 &&
        itemNumber < this.selectedIndex + 20
    )
  }

  render() {
    // +1 because it must be the index right to the centered item
    const showStartDots =
      this.renderDots && this.selectedIndex > this.sticky + this.offset + 1
    // -1 because it is 0-based and another -1 because it must be the index left to the centered item
    const showEndDots =
      this.renderDots &&
      this.selectedIndex < this.length - this.offset - this.sticky - 2
    const showFrom =
      // +1 because it is not 0-based
      Math.max(
        Math.min(
          this.selectedIndex -
            this.offset -
            // start hiding numbers
            (showStartDots ? 0 : 1),
          this.length - this.visibleItemsInSlider - this.sticky - 1
        ),
        this.sticky
      ) + 1
    // +1 because it is not 0-based
    const showTo =
      Math.min(
        Math.max(
          this.selectedIndex + (showEndDots ? 0 : 1),
          this.offset + this.sticky + 1
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
          ])}
          part="wrapper"
        >
          {this.sticky === 0 && (
            <li class="ld-pagination__arrow">
              <ld-button
                disabled={this.selectedIndex < 1 ? true : undefined}
                mode="ghost"
                onClick={() => {
                  this.selectedIndex = 0
                }}
                part="arrow start"
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
              part="arrow prev"
              size={this.size}
            >
              <ld-icon name="arrow-left" size={this.size} />
            </ld-button>
          </li>
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
                      part="sticky item"
                      size={this.size}
                    >
                      {index + 1}
                    </ld-button>
                  </li>
                )
              }
            )}
          {this.renderDots && (
            <li
              class={getClassNames([
                'ld-pagination__dots',
                showStartDots && 'ld-pagination__dots--visible',
              ])}
              part="dots"
            >
              <span>. . .</span>
            </li>
          )}
          <li
            class="ld-pagination__slide-wrapper"
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
              <li
                class="ld-pagination__marker"
                key="marker"
                part="marker"
                style={{
                  '--ld-pagination-selected-index': `${this.selectedIndex}`,
                }}
              />
              {this.length > 0 &&
                this.sliderContent.map((itemNumber) =>
                  this.renderItem(itemNumber, showFrom, showTo)
                )}
            </ul>
          </li>
          {this.renderDots && (
            <li
              class={getClassNames([
                'ld-pagination__dots ld-pagination__dots--end',
                showEndDots && 'ld-pagination__dots--visible',
              ])}
              part="dots"
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
                      part="sticky item"
                      size={this.size}
                    >
                      {itemNumber}
                    </ld-button>
                  </li>
                )
              })
              .reverse()}
          <li class="ld-pagination__arrow">
            <ld-button
              disabled={this.selectedIndex >= this.length - 1}
              mode="ghost"
              onClick={() => {
                this.selectedIndex += 1
              }}
              part="arrow next"
              size={this.size}
            >
              <ld-icon name="arrow-right" size={this.size} />
            </ld-button>
          </li>
          {this.sticky === 0 && this.length < Infinity && (
            <li class="ld-pagination__arrow">
              <ld-button
                disabled={this.selectedIndex >= this.length - 1}
                mode="ghost"
                onClick={() => {
                  this.selectedIndex = this.length - 1
                }}
                part="arrow end"
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
