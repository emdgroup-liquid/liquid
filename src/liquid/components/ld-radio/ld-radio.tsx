import { Component, Element, h, Method, Prop } from '@stencil/core'
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
  shadow: true,
})
export class LdRadio implements InnerFocusable {
  @Element() el: HTMLInputElement

  private root: HTMLDivElement
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

  /** Sets focus on the radio button.*/
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

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.el.getAttribute('aria-disabled') === 'true') {
      ev.preventDefault()
      return
    }

    if (this.checked) return

    // Uncheck radios with same name.
    const name = this.el.getAttribute('name')
    if (name) {
      // Attribute selector fails in test env, hance filtering with js below.
      Array.from(document.querySelectorAll('ld-radio'))
        .filter((ldRadio) => ldRadio.getAttribute('name') === name)
        .forEach((ldRadio) => {
          ldRadio.removeAttribute('checked')
        })
    }

    this.checked =
      (ev.target as HTMLElement).closest('.ld-radio') === this.root
        ? true
        : this.input.checked
  }

  render() {
    let cl = 'ld-radio'
    if (this.mode) cl += ` ld-radio--${this.mode}`
    if (this.tone) cl += ` ld-radio--${this.tone}`
    if (this.invalid) cl += ' ld-radio--invalid'

    return (
      <div
        part="root"
        class={cl}
        onClick={this.handleClick}
        ref={(ref) => (this.root = ref)}
      >
        <input
          part="input focusable"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          ref={(ref) => (this.input = ref)}
          type="radio"
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
          disabled={this.disabled}
          checked={this.checked}
        />
        <div part="dot" class="ld-radio__dot"></div>
        <div class="ld-radio__box" part="box"></div>
      </div>
    )
  }
}
