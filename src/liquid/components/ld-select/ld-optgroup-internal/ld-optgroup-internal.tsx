import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/** @internal **/
@Component({
  tag: 'ld-optgroup-internal',
  styleUrl: 'ld-optgroup-internal.shadow.css',
  shadow: true,
})
export class LdOptgroupInternal implements InnerFocusable {
  @Element() el: HTMLElement

  private optgroupRef: HTMLElement

  /** Disables the whole option group. */
  @Prop() disabled?: boolean

  /** Set to true on filtering via select input. */
  @Prop() filtered? = false

  /** The name of the group of options. */
  @Prop() label!: string

  /** Tab index of the option. */
  @Prop() ldTabindex? = -1

  /** Display mode. */
  @Prop() mode?: 'checkbox' | undefined

  /** Size of the option. */
  @Prop() size?: 'sm' | 'lg'

  @State() selected?: boolean | 'indeterminate' = false

  /**
   * @internal
   * Emitted on either selection or de-selection of the option.
   */
  @Event() ldoptgroupselect: EventEmitter<boolean | 'indeterminate'>

  /** Sets focus internally. */
  @Method()
  async focusInner() {
    this.optgroupRef.focus()
  }

  @Listen('ldoptionselect')
  handleOptionSelect() {
    if (this.mode !== 'checkbox') return

    const options = Array.from(
      this.el.children
    ) as HTMLLdOptionInternalElement[]
    const totalOptions = options.length
    const totalSelected = options.filter((o) => o.selected).length

    if (totalSelected === 0) {
      this.selected = false
      return
    }

    if (totalOptions === totalSelected) {
      this.selected = true
      return
    }

    this.selected = 'indeterminate'
  }

  @Listen('keydown', { passive: false })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      this.handleClick()
    }
  }

  private handleClick = () => {
    if (this.disabled) return
    if (this.mode !== 'checkbox') return

    const options = Array.from(
      this.el.children
    ) as HTMLLdOptionInternalElement[]
    const newSelectedState =
      this.selected === false || this.selected === 'indeterminate'
    options
      .filter((o) => o.selected !== newSelectedState)
      .forEach((o) => {
        o.selected = newSelectedState
      })
  }

  @Watch('selected')
  handleSelectedChange() {
    this.ldoptgroupselect.emit(this.selected)
  }

  componentWillLoad() {
    this.handleOptionSelect()
  }

  render() {
    return (
      <Host
        class={getClassNames([
          this.disabled && 'ld-optgroup-internal--disabled',
        ])}
      >
        <div
          class={getClassNames([
            'ld-optgroup-internal',
            this.size && `ld-optgroup-internal--${this.size}`,
            this.filtered && 'ld-optgroup-internal--filtered',
            this.selected === true && 'ld-optgroup-internal--selected',
            this.selected === 'indeterminate' &&
              'ld-optgroup-internal--indeterminate',
          ])}
          role="option"
          ref={(el) => (this.optgroupRef = el as HTMLElement)}
          aria-disabled={this.disabled ? 'true' : undefined}
          onClick={this.handleClick}
          tabIndex={this.ldTabindex}
          part="option focusable"
        >
          {this.mode === 'checkbox' && (
            <div
              class="ld-optgroup-internal__checkbox-wrapper"
              role="presentation"
              part="checkbox-wrapper"
            >
              <ld-checkbox
                class="ld-optgroup-internal__checkbox"
                checked={this.selected === true}
                indeterminate={this.selected === 'indeterminate'}
                disabled={this.disabled}
                part="checkbox"
              />
            </div>
          )}

          <span class="ld-optgroup-internal__label" part="label">
            {this.label}
          </span>
        </div>

        <div class="ld-optgroup-internal__slot-container" part="slot-container">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
