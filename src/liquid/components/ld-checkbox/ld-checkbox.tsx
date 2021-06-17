import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Prop } from '@stencil/core'
import { JSXBase } from '@stencil/core/internal'
import InputHTMLAttributes = JSXBase.InputHTMLAttributes
import { cloneAttributes } from '../../utils/cloneAttributes'

@Component({
  tag: 'ld-checkbox',
  styleUrl: 'ld-checkbox.css',
  shadow: false,
})
export class LdCheckbox {
  @Element() el: HTMLElement

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** Checkbox tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** Disabled state of the checkbox. */
  @Prop() disabled = false

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the checkbox visually as invalid. */
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
    let cl = 'ld-checkbox'
    if (this.mode) cl += ` ld-checkbox--${this.mode}`
    if (this.tone) cl += ` ld-checkbox--${this.tone}`
    if (this.invalid) cl += ' ld-checkbox--invalid'

    return (
      <Host class={cl}>
        <input
          onClick={this.handleClick.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          type="checkbox"
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
          disabled={this.disabled}
          checked={this.checked}
        />
        <svg
          class="ld-checkbox__check"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L5.40795 10L2 6.63964"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div class="ld-checkbox__box"></div>
      </Host>
    )
  }
}
