import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Event,
  EventEmitter,
  Listen,
  State,
  Method,
} from '@stencil/core'
import { applyPropAliases } from '../../../utils/applyPropAliases'
import { getClassNames } from '../../../utils/getClassNames'

/** @internal **/
@Component({
  tag: 'ld-option-internal',
  styleUrl: 'ld-option-internal.css',
  shadow: true,
})
export class LdOptionInternal {
  @Element() el: HTMLElement

  private optionRef: HTMLElement

  /**
   * The content of this attribute represents the value to be submitted with the form,
   * should this option be selected. If this attribute is omitted, the value is taken
   * from the text content of the option element.
   */
  @Prop({ mutable: true, reflect: true }) value: string

  /**
   * If present, this boolean attribute indicates that the option is selected.
   */
  @Prop({ mutable: true, reflect: true }) selected = false

  /**
   * Disables the option.
   */
  @Prop() disabled = false

  /**
   * Prevents deselection of a selected options when the selected option
   * is clicked in single select mode.
   */
  @Prop() preventDeselection: boolean

  /**
   * Display mode.
   */
  @Prop() mode?: 'checkbox' | undefined

  /** Size of the select trigger button for applying according paddings. */
  @Prop() size?: 'sm' | 'lg'

  /**
   * Sets focus internally.
   */
  @Method()
  async focusOption() {
    this.optionRef.focus()
  }

  /**
   * Emitted on either selection or de-selection of the option.
   */
  @Event() ldOptionSelect: EventEmitter<boolean>

  @State() title: string

  @State() hasFocus: boolean
  @State() hasHover: boolean

  private handleClick() {
    if (this.disabled) return

    if (
      !this.preventDeselection ||
      !this.selected ||
      this.mode === 'checkbox'
    ) {
      this.selected = !this.selected
    }

    if (this.mode !== 'checkbox') {
      this.hasFocus = false
      this.hasHover = false
    }

    this.ldOptionSelect.emit(this.selected)
  }

  @Listen('keydown', { passive: false })
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      this.handleClick()
    }

    if (ev.key === 'Escape') {
      this.hasFocus = false
      this.hasHover = false
    }
  }

  componentWillLoad() {
    applyPropAliases.apply(this)

    if (typeof this.value === 'undefined') {
      window.requestAnimationFrame(() => {
        this.value = this.el.innerText
      })
    }
  }

  render() {
    return (
      <Host
        class={getClassNames([
          this.hasFocus && 'ld-option-internal--focus-within',
          this.hasHover && 'ld-option-internal--hover-within',
        ])}
      >
        <div
          class={getClassNames([
            'ld-option-internal',
            this.size && `ld-option-internal--${this.size}`,
          ])}
          role="option"
          ref={(el) => (this.optionRef = el as HTMLElement)}
          aria-selected={this.selected ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onClick={this.handleClick.bind(this)}
          onFocus={() => (this.hasFocus = true)}
          onBlur={() => (this.hasFocus = false)}
          onMouseOver={() => (this.hasHover = true)}
          onMouseOut={() => (this.hasHover = false)}
          tabindex="-1"
          part="option"
        >
          {this.mode === 'checkbox' ? (
            <div
              class="ld-option-internal__checkbox-wrapper"
              role="presentation"
              part="checkbox-wrapper"
            >
              <ld-checkbox
                class="ld-option-internal__checkbox"
                checked={this.selected}
                disabled={this.disabled}
                part="checkbox"
              ></ld-checkbox>
            </div>
          ) : (
            <svg
              role={'presentation'}
              class="ld-option-internal__check"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              part="check"
            >
              <path
                style={{ visibility: this.selected ? 'inherit' : 'hidden' }}
                d="M15 7L8.40795 13L5 9.63964"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}

          <span
            class="ld-option-internal__label"
            title={this.title}
            part="label"
          >
            <slot></slot>
          </span>
        </div>
      </Host>
    )
  }
}
