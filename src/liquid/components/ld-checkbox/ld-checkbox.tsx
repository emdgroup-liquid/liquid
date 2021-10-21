import { Component, Element, h, Method, Prop, Watch } from '@stencil/core'
import { JSXBase } from '@stencil/core/internal'
import InputHTMLAttributes = JSXBase.InputHTMLAttributes
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-checkbox',
  styleUrl: 'ld-checkbox.css',
  shadow: true,
})
export class LdCheckbox implements InnerFocusable {
  @Element() el: HTMLInputElement

  private root: HTMLDivElement
  private input: HTMLInputElement
  private hiddenInput: HTMLInputElement

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** Used to specify the name of the control. */
  @Prop() name: string

  /** The input value. */
  @Prop() value: string

  /** Checkbox tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** Disabled state of the checkbox. */
  @Prop() disabled: boolean

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the checkbox visually as invalid. */
  @Prop() invalid: boolean

  /** Set this property to `true` in order to mark the checkbox as required. */
  @Prop() required: boolean

  /**
   * Sets focus on the checkbox
   */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  @Watch('checked')
  @Watch('name')
  @Watch('required')
  @Watch('value')
  updateHiddenInput() {
    if (this.hiddenInput) {
      this.hiddenInput.checked = this.checked
      this.hiddenInput.name = this.checked && this.name ? this.name : ''
      this.hiddenInput.required = this.required
      this.hiddenInput.value = this.value ?? (this.checked ? 'on' : '')
    }
  }

  componentWillLoad() {
    if (this.el.closest('form')) {
      this.hiddenInput = document.createElement('input')
      this.hiddenInput.required = this.required
      this.hiddenInput.type = 'hidden'

      if (this.value || this.checked) {
        this.hiddenInput.value = this.value ?? 'on'
      }
      if (this.checked) {
        this.hiddenInput.checked = true

        if (this.name) {
          this.hiddenInput.name = this.name
        }
      }

      this.el.appendChild(this.hiddenInput)
    }
  }

  private handleBlur(ev) {
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

    this.checked =
      (ev.target as HTMLElement).closest('.ld-checkbox') === this.root
        ? !this.checked
        : this.input.checked
  }

  render() {
    let cl = 'ld-checkbox'
    if (this.mode) cl += ` ld-checkbox--${this.mode}`
    if (this.tone) cl += ` ld-checkbox--${this.tone}`
    if (this.invalid) cl += ' ld-checkbox--invalid'

    return (
      <div
        part="root"
        class={cl}
        onClick={this.handleClick}
        ref={(ref) => (this.root = ref)}
      >
        <input
          part="input focusable"
          onBlur={this.handleBlur.bind(this)}
          onFocus={this.handleFocus}
          ref={(ref) => (this.input = ref)}
          type="checkbox"
          {...cloneAttributes<InputHTMLAttributes<HTMLInputElement>>(this.el)}
          disabled={this.disabled}
          checked={this.checked}
        />
        <svg
          class="ld-checkbox__check"
          part="check"
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
        <div class="ld-checkbox__box" part="box"></div>
      </div>
    )
  }
}
