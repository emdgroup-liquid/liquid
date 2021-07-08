import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import TextareaHTMLAttributes = JSXBase.TextareaHTMLAttributes
import InputHTMLAttributes = JSXBase.InputHTMLAttributes

/**
 * The `ld-input` component. You can use it in conjunction with the `ld-label`
 * and the `ld-input-message` component. See examples in the docs for a better
 * understanding on how they can be used together.
 *
 * @slot start - The purpose of this slot is to add icons or buttons
 * to the input, __justifying the item to the end of the component__.
 * Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component.
 * If you choose to place something different into the slot, you will probably
 * need to adjust some styles on the slotted item in order to make it fit right.
 * @slot end - The purpose of this slot is to add icons or buttons
 * to the input, __justifying the item to the start of the component__.
 * Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component.
 * If you choose to place something different into the slot, you will probably
 * need to adjust some styles on the slotted item in order to make it fit right.
 */
@Component({
  tag: 'ld-input',
  styleUrl: 'ld-input.css',
  shadow: false,
})
export class LdInput {
  @Element() el: HTMLInputElement

  private input!: HTMLInputElement | HTMLTextAreaElement

  /** Input tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) value: string

  /** Set this property to `true` in order to mark the field visually as invalid. */
  @Prop() invalid: false

  /** The input placeholder. */
  @Prop() placeholder: string

  /** The input type. */
  @Prop() type: string

  /**
   * Uses textarea instead of input internally. Setting this attribute to true
   * disables the attribute type and both slots.
   */
  @Prop() multiline: boolean

  private handleBlur(ev) {
    setTimeout(() => {
      this.el.dispatchEvent(ev)
    })
  }

  private handleFocus(ev) {
    setTimeout(() => {
      this.el.dispatchEvent(ev)
    })
  }

  private handleInput() {
    if (!(this.input.getAttribute('aria-disabled') === 'true')) {
      this.value = this.input.value
      return
    }
    this.input.value = this.value || ''
  }

  private handleClick(ev) {
    if (ev.target.closest('.ld-button')) return
    if (ev.target.tagname === 'INPUT') return
    this.input.focus()
  }

  render() {
    let cl = 'ld-input'
    if (this.tone) cl += ` ld-input--${this.tone}`
    if (this.invalid) cl += ' ld-input--invalid'

    if (this.multiline) {
      return (
        <Host class={cl} onClick={this.handleClick.bind(this)}>
          <textarea
            ref={(el) => (this.input = el as HTMLTextAreaElement)}
            onInput={this.handleInput.bind(this)}
            placeholder={this.placeholder}
            onBlur={this.handleBlur.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            {...cloneAttributes<TextareaHTMLAttributes<HTMLInputElement>>(
              this.el
            )}
            value={this.value}
          />
          {this.type === 'file' && (
            <span class="ld-input__placeholder">
              {this.input?.value || this.placeholder}
            </span>
          )}
        </Host>
      )
    }

    return (
      <Host class={cl} onClick={this.handleClick.bind(this)}>
        <slot name="start"></slot>
        <input
          ref={(el) => (this.input = el as HTMLInputElement)}
          onInput={this.handleInput.bind(this)}
          placeholder={this.placeholder}
          type={this.type}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
          value={this.value}
        />
        {this.type === 'file' && (
          <span class="ld-input__placeholder">
            {this.input?.value || this.placeholder}
          </span>
        )}
        <slot name="end"></slot>
      </Host>
    )
  }
}
