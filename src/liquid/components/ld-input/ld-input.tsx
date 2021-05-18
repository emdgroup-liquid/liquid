import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import InputHTMLAttributes = JSXBase.InputHTMLAttributes

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
  @Prop({ mutable: true }) value: string

  /** Set this property to `true` in order to mark the field visually as invalid. */
  @Prop() invalid: false

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
    this.value = this.input.value
  }

  render() {
    let cl = 'ld-input'
    cl += ` ld-input--${this.mode}`
    if (this.invalid) cl += ' ld-input--invalid'

    return (
      <input
        ref={(el) => (this.input = el as HTMLInputElement)}
        class={cl}
        onInput={this.handleInput.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
        value={this.value}
      />
    )
  }
}
