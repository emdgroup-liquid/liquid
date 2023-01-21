import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/** @internal **/
@Component({
  tag: 'ld-select-popper',
  styleUrl: 'ld-select-popper.shadow.css',
  shadow: true,
})
export class LdSelectPopper {
  @Element() el: HTMLElement

  /** A watcher is applied to the CSS class in order to be able to react to tether changes. */
  @Prop({ reflect: true }) class: string

  /** Popper is visually detached from the select trigger element (there's a gap between the two). */
  @Prop() detached: boolean

  /** Indicates if select element is expanded. */
  @Prop() expanded = false

  /** Set this property to `true` in order to enable an input field for filtering options. */
  @Prop() filter: boolean

  /** The filter input placeholder. */
  @Prop() filterPlaceholder: string

  /** Attaches CSS class to the select popper element. */
  @Prop() popperClass?: string

  /** Size of the select trigger button (required for applying the correct shadow height). */
  @Prop() size?: 'sm' | 'lg'

  /** Since the select popper is located outside the select element, the theme needs to be applied as a prop. */
  @Prop() theme: string

  @State() isPinned = false
  @State() shadowHeight = '100%'

  /**
   * @internal
   * Emitted on filter change with the filter input value.
   */
  @Event() ldselectfilterchange: EventEmitter<string>

  private handleFilterInput = (ev) => {
    this.ldselectfilterchange.emit(ev.target.value)
  }

  @Watch('class')
  updatePinnedState() {
    this.isPinned = this.el.classList.contains('ld-tether-pinned')
  }

  @Watch('theme')
  updatePopperTheme(newValue: string, oldValue: string) {
    this.el.classList.remove(`ld-theme-${oldValue}`)
    if (newValue) this.el.classList.add(`ld-theme-${newValue}`)
  }

  /**
   * Focuses the tab
   */
  @Method()
  async updateShadowHeight(height: string) {
    this.shadowHeight = height
  }

  componentWillLoad() {
    this.popperClass && this.el.classList.add(this.popperClass)
  }

  render() {
    return (
      <Host
        style={{
          zIndex: this.isPinned ? '2147483647' : '2147483646',
          display: this.expanded ? 'block' : 'none',
        }}
      >
        <div
          class={getClassNames([
            'ld-select-popper',
            this.detached && 'ld-select-popper--detached',
            this.expanded && 'ld-select-popper--expanded',
            this.filter && 'ld-select-popper--filter',
            this.isPinned && 'ld-select-popper--pinned',
            this.size && `ld-select-popper--${this.size}`,
          ])}
          part="popper"
        >
          {this.filter && (
            <input
              aria-haspopup="listbox"
              type="text"
              placeholder={this.filterPlaceholder}
              class="ld-select-popper__filter-input"
              part="filter-input focusable"
              onInput={this.handleFilterInput}
            />
          )}
          <div
            class="ld-select-popper__scroll-container"
            part="popper-scroll-container"
          >
            <slot></slot>
            <div
              class="ld-select-popper__shadow"
              style={{ height: this.isPinned ? '100%' : this.shadowHeight }}
              part="shadow"
            ></div>
          </div>
        </div>
      </Host>
    )
  }
}
