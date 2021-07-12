import '../../components' // type definitions for type checks and intelliSense
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
} from '@stencil/core'
import { applyPropAliases } from '../../utils/applyPropAliases'

@Component({
  tag: 'ld-option',
  styleUrl: 'ld-option.css',
  shadow: false,
})
export class LdOption {
  @Element() el: HTMLElement

  private optionLabelRef!: HTMLElement

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
   * Prevents deselection of a selected option using a repeated mouse or keyboard interaction.
   */
  @Prop() preventDeselection = false

  /**
   * Disables the option.
   */
  @Prop() disabled = false

  /**
   * If true the option displays a checkbox, either checked or unchecked, instead of a simple check icon.
   */
  @Prop() checkbox = false

  /**
   * Emitted on either selection or de-selection of the option.
   */
  @Event() ldOptionSelect: EventEmitter<boolean>

  @State() title: string

  private handleClick() {
    if (this.disabled) {
      return
    }

    if (!this.selected || !this.preventDeselection) {
      this.selected = !this.selected
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
  }

  componentWillLoad() {
    applyPropAliases.apply(this)

    if (typeof this.value === 'undefined') {
      setTimeout(() => {
        this.value = this.el.innerText
      })
    }
  }

  componentDidLoad() {
    setTimeout(() => {
      this.title = this.optionLabelRef.innerText
    })
  }

  render() {
    return (
      <Host
        class="ld-option"
        role="option"
        aria-selected={this.selected ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : 'false'}
        onClick={this.handleClick.bind(this)}
        tabindex="-1"
      >
        {this.checkbox ? (
          <ld-checkbox
            role="presentation"
            class="ld-option__checkbox"
            checked={this.selected}
            disabled={this.disabled}
          ></ld-checkbox>
        ) : (
          <svg
            role={'presentation'}
            class="ld-option__check"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
          ref={(el) => (this.optionLabelRef = el as HTMLElement)}
          class="ld-option__label"
          title={this.title}
        >
          <slot></slot>
        </span>
      </Host>
    )
  }
}
