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

  /** Indicates that all options are filtered (used in creatable mode) */
  @Prop() allOptionsFiltered?: boolean

  /** A watcher is applied to the CSS class in order to be able to react to tether changes. */
  @Prop({ reflect: true }) class?: string

  /**
   * Creatable mode can be enabled when the filter prop is set to true.
   * This mode allows the user to create new options using the filter input field.
   */
  @Prop() creatable?: boolean

  /** The "create" input label (creatable mode). */
  @Prop() createInputLabel!: string

  /** The "create" button label (creatable mode). */
  @Prop() createButtonLabel!: string

  /** Popper is visually detached from the select trigger element (there's a gap between the two). */
  @Prop() detached?: boolean

  /** Indicates if select element is expanded. */
  @Prop() expanded? = false

  /** Set this property to `true` in order to enable an input field for filtering options. */
  @Prop() filter?: boolean

  /** The filter input value matches an option (do not allow to create the option). */
  @Prop() filterMatchesOption?: boolean

  /** The filter input placeholder. */
  @Prop() filterPlaceholder!: string

  /** Attaches CSS class to the select popper element. */
  @Prop() popperClass?: string

  /** Size of the select trigger button (required for applying the correct shadow height). */
  @Prop() size?: 'sm' | 'lg'

  /** Since the select popper is located outside the select element, the theme needs to be applied as a prop. */
  @Prop() theme?: string

  @State() isPinned = false
  @State() shadowHeight = '100%'
  @State() filterInputValue = ''
  @State() canCreate = false

  /**
   * @internal
   * Emitted on filter change with the filter input value.
   */
  @Event() ldselectfilterchange: EventEmitter<string>

  /**
   * @internal
   * Emitted on create button click in filter input field.
   */
  @Event() ldselectfiltercreate: EventEmitter<string>

  private handleFilterInput = (ev) => {
    this.filterInputValue = ev.target.value
    this.ldselectfilterchange.emit(ev.target.value)
  }

  private handleCreate = (ev) => {
    ev.preventDefault()
    this.ldselectfiltercreate.emit(this.filterInputValue)
    this.filterInputValue = ''
  }

  @Watch('creatable')
  @Watch('filterMatchesOption')
  @Watch('filterInputValue')
  updateCanCreate() {
    this.canCreate = Boolean(
      this.creatable && !this.filterMatchesOption && this.filterInputValue
    )
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

  @Watch('expanded')
  updateFilter(newExpanded: boolean) {
    if (!newExpanded) {
      this.resetFilter()
    }
  }

  /** Updates shadow height */
  @Method()
  async updateShadowHeight(height: string) {
    this.shadowHeight = height
  }

  /** Focuses the tab */
  @Method()
  async resetFilter() {
    this.filterInputValue = ''
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
            this.allOptionsFiltered && 'ld-select-popper--all-filtered',
            this.isPinned && 'ld-select-popper--pinned',
            this.size && `ld-select-popper--${this.size}`,
          ])}
          part="popper"
        >
          {this.filter && (
            <div class="ld-select-popper__filter-container">
              <input
                aria-haspopup={this.allOptionsFiltered ? undefined : 'listbox'}
                aria-label={this.canCreate ? this.createInputLabel : undefined}
                type="text"
                placeholder={this.filterPlaceholder}
                class="ld-select-popper__filter-input"
                part="filter-input focusable"
                onInput={this.handleFilterInput}
              />
              {this.canCreate && (
                <ld-button
                  onClick={this.handleCreate}
                  size="sm"
                  class="ld-select-popper__create-button"
                  aria-label={this.createButtonLabel}
                >
                  <ld-icon
                    class="ld-select-popper__create-icon"
                    role="presentation"
                    size="sm"
                  >
                    <svg viewBox="-1 -1 24 24" fill="none">
                      <path
                        d="M2.5 11h17M11 19.5v-17"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </ld-icon>
                </ld-button>
              )}
            </div>
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
