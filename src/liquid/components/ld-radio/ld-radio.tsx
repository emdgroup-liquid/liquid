import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part input - Actual input element
 */
@Component({
  tag: 'ld-radio',
  styleUrl: 'ld-radio.css',
  shadow: true,
})
export class LdRadio implements InnerFocusable {
  @Element() el: HTMLInputElement

  private input: HTMLInputElement
  private hiddenInput: HTMLInputElement

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** Used to specify the name of the control. */
  @Prop() name: string

  /** The input value. */
  @Prop() value: string

  /** radio tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** Disabled state of the radio. */
  @Prop() disabled: boolean

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the radio visually as invalid. */
  @Prop() invalid: boolean

  /** Set this property to `true` in order to mark the checkbox as required. */
  @Prop() required: boolean

  /** Sets focus on the radio button. */
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
      this.hiddenInput.required = this.required

      if (this.name) {
        this.hiddenInput.name = this.name
      } else {
        this.hiddenInput.removeAttribute('name')
      }

      if (this.value) {
        this.hiddenInput.value = this.value
      } else {
        this.hiddenInput.removeAttribute('value')
      }
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        ev.preventDefault()
        this.focusAndSelect('prev')
        return
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        ev.preventDefault()
        this.focusAndSelect('next')
        return
      }
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

  private handleClick = (ev?: MouseEvent) => {
    if (this.disabled || this.el.getAttribute('aria-disabled') === 'true') {
      ev?.preventDefault()
      return
    }

    if (this.checked) return

    // Uncheck radios with same name.
    if (this.name) {
      // Attribute selector fails in test env, hance filtering with js below.
      Array.from(document.querySelectorAll('ld-radio'))
        .filter((ldRadio) => ldRadio.getAttribute('name') === this.name)
        .forEach((ldRadio) => {
          ldRadio.removeAttribute('checked')
        })
    }

    this.checked = true

    if (!ev.isTrusted) {
      // This happens, when a click event is dispatched on the host element
      // from the outside i.e. on click on a parent ld-label element.
      this.el.dispatchEvent(
        new Event('input', { bubbles: true, composed: true })
      )
    }
  }

  private focusAndSelect(dir: 'next' | 'prev') {
    const ldRadios = Array.from(document.querySelectorAll('ld-radio')).filter(
      (ldRadio) => ldRadio.getAttribute('name') === this.name
    )
    ldRadios.forEach((ldRadio, index) => {
      if (ldRadio === (this.el as unknown as HTMLLdRadioElement)) {
        const targetLdRadio = ldRadios[index + (dir === 'next' ? 1 : -1)]
        if (targetLdRadio) {
          targetLdRadio.focusInner()
          targetLdRadio.click()
        }
      }
    })
  }

  componentWillLoad() {
    if (this.el.closest('form')) {
      this.hiddenInput = document.createElement('input')
      this.hiddenInput.required = this.required
      this.hiddenInput.type = 'radio'
      this.hiddenInput.style.visibility = 'hidden'
      this.hiddenInput.style.position = 'absolute'
      this.hiddenInput.style.pointerEvents = 'none'
      this.hiddenInput.checked = this.checked

      if (this.value) {
        this.hiddenInput.value = this.value
      }

      if (this.name) {
        this.hiddenInput.name = this.name
      }

      this.el.appendChild(this.hiddenInput)
    }
  }

  render() {
    let cl = 'ld-radio'
    if (this.mode) cl += ` ld-radio--${this.mode}`
    if (this.tone) cl += ` ld-radio--${this.tone}`
    if (this.invalid) cl += ' ld-radio--invalid'

    return (
      <Host part="root" class={cl} onClick={this.handleClick}>
        <input
          part="input focusable"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          ref={(ref) => (this.input = ref)}
          type="radio"
          {...cloneAttributes(this.el)}
          disabled={this.disabled}
          checked={this.checked}
          tabIndex={
            this.checked
              ? parseInt(this.el.getAttribute('tabindex')) || undefined
              : -1
          }
        />
        <div part="dot" class="ld-radio__dot"></div>
        <div class="ld-radio__box" part="box"></div>
      </Host>
    )
  }
}
