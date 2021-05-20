import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import InputHTMLAttributes = JSXBase.InputHTMLAttributes

/**
 * The `ld-input` component. You can use it in conjunction with the `ld-label`
 * and the `ld-input-message` component. See examples in the docs for a better
 * understanding on how they can be used together.
 *
 * @slot item-start - The purpose of this slot is to add icons or buttons
 * to the input, __justifying the item to the end of the component__.
 * Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component.
 * If you choose to place something different into the slot, you will probably
 * need to adjust some styles on the slotted item in order to make it fit right.
 * @slot item-end - The purpose of this slot is to add icons or buttons
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

  private input!: HTMLInputElement

  /** Input mode. Use `'dark'` on white backgrounds, use `'light'` on other backgrounds. */
  @Prop() mode: 'light' | 'dark' = 'dark'

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) value: string

  /** Set this property to `true` in order to mark the field visually as invalid. */
  @Prop() invalid: false

  /** The input placeholder. */
  @Prop() placeholder: string

  /** The input type. */
  @Prop() type: string

  private handleBlur(ev) {
    this.el.classList.add('ld-input--dirty')
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
    if (this.input.getAttribute('aria-disabled')) {
      this.input.value = this.value || ''
      return
    }
    this.value = this.input.value
  }

  private handleClick(ev) {
    if (ev.target.closest('.ld-button')) return
    this.input.focus()
  }

  render() {
    let cl = 'ld-input'
    cl += ` ld-input--${this.mode}`
    if (this.invalid) cl += ' ld-input--invalid'

    return (
      <Host class={cl} onClick={this.handleClick.bind(this)}>
        <slot name="item-start"></slot>
        <input
          ref={(el) => (this.input = el as HTMLInputElement)}
          onInput={this.handleInput.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
          value={this.value}
        />
        <slot name="item-end"></slot>
      </Host>
    )
  }
}
