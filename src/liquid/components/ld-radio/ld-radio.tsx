import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { JSXBase } from '@stencil/core/internal'
import InputHTMLAttributes = JSXBase.InputHTMLAttributes
import { cloneAttributes } from '../../utils/cloneAttributes'

@Component({
  tag: 'ld-radio',
  styleUrl: 'ld-radio.css',
  shadow: false,
})
export class LdRadio {
  @Element() el: HTMLElement

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** radio tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** Disabled state of the radio. */
  @Prop() disabled = false

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the radio visually as invalid. */
  @Prop() invalid: false

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

  private handleClick(ev) {
    if (ev.target.getAttribute('aria-disabled')) {
      ev.preventDefault()
      return
    }
    this.checked = ev.target.checked
  }

  render() {
    let cl = 'ld-radio'
    if (this.mode) cl += ` ld-radio--${this.mode}`
    if (this.tone) cl += ` ld-radio--${this.tone}`
    if (this.invalid) cl += ' ld-radio--invalid'

    return (
      <Host class={cl}>
        <input
          onClick={this.handleClick.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          type="radio"
          disabled={this.disabled}
          checked={this.checked}
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
        />
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </Host>
    )
  }
}
