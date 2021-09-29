import { Component, Element, h, Host, Method, Prop } from '@stencil/core'
import { JSXBase } from '@stencil/core/internal'
import InputHTMLAttributes = JSXBase.InputHTMLAttributes
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-radio',
  styleUrl: 'ld-radio.css',
  shadow: false,
})
export class LdRadio implements InnerFocusable {
  @Element() el: HTMLElement
  private input: HTMLInputElement
  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** radio tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** Disabled state of the radio. */
  @Prop() disabled: boolean

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the radio visually as invalid. */
  @Prop() invalid: boolean

  /**
   * Sets focus on the radio button
   */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  private handleBlur = (ev: FocusEvent) => {
    setTimeout(() => {
      this.el.dispatchEvent(ev)
    })
  }

  private handleFocus = (ev: FocusEvent) => {
    setTimeout(() => {
      this.el.dispatchEvent(ev)
    })
  }

  private handleClick(ev: MouseEvent) {
    if (this.input.getAttribute('aria-disabled') === 'true') {
      ev.preventDefault()
      return
    }

    this.checked =
      ev.target === this.el ? !this.input.checked : this.input.checked
  }

  render() {
    let cl = 'ld-radio'
    if (this.mode) cl += ` ld-radio--${this.mode}`
    if (this.tone) cl += ` ld-radio--${this.tone}`
    if (this.invalid) cl += ' ld-radio--invalid'

    return (
      <Host class={cl} onClick={this.handleClick}>
        <input
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={(ref) => (this.input = ref)}
          type="radio"
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
          disabled={this.disabled}
          checked={this.checked}
        />
        <div class="ld-radio__dot"></div>
        <div class="ld-radio__box"></div>
      </Host>
    )
  }
}
