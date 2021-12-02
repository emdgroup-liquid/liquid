import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { getClassNames } from '../../utils/getClassNames'

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

  /** Hint for form autofill feature. */
  @Prop({ mutable: true, reflect: true }) autocomplete?: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop() autofocus?: boolean

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Disabled state of the radio. */
  @Prop() disabled: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Set this property to `true` in order to mark the radio visually as invalid. */
  @Prop() invalid: boolean

  /** Value of the id attribute of the `<datalist>` of autocomplete options. */
  @Prop() list?: string

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** Used to specify the name of the control. */
  @Prop() name: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the checkbox as required. */
  @Prop() required: boolean

  /** radio tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone: 'dark'

  /** The input value. */
  @Prop() value: string

  /** Sets focus on the radio button. */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  @Watch('checked')
  @Watch('form')
  @Watch('name')
  @Watch('required')
  @Watch('value')
  updateHiddenInput() {
    const outerForm = this.el.closest('form')
    if (!this.hiddenInput && this.name && (outerForm || this.form)) {
      this.hiddenInput = document.createElement('input')
      this.el.appendChild(this.hiddenInput)
    }

    if (this.hiddenInput) {
      if (!this.name) {
        this.hiddenInput.remove()
        this.hiddenInput = undefined
        return
      }

      this.hiddenInput.name = this.name
      this.hiddenInput.checked = this.checked
      this.hiddenInput.required = this.required

      if (this.value) {
        this.hiddenInput.value = this.value
      } else {
        this.hiddenInput.removeAttribute('value')
      }

      if (this.form) {
        this.hiddenInput.setAttribute('form', this.form)
      } else if (this.hiddenInput.getAttribute('form')) {
        if (outerForm) {
          this.hiddenInput.removeAttribute('form')
        } else {
          this.hiddenInput.remove()
          this.hiddenInput = undefined
        }
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
    const outerForm = this.el.closest('form')

    if (outerForm && !this.autocomplete) {
      this.autocomplete = outerForm.getAttribute('autocomplete')
    }

    if (outerForm || this.form) {
      if (this.name) {
        this.hiddenInput = document.createElement('input')
        this.hiddenInput.required = this.required
        this.hiddenInput.type = 'radio'
        this.hiddenInput.style.visibility = 'hidden'
        this.hiddenInput.style.position = 'absolute'
        this.hiddenInput.style.pointerEvents = 'none'
        this.hiddenInput.checked = this.checked
        this.hiddenInput.name = this.name

        if (this.form) {
          this.hiddenInput.setAttribute('form', this.form)
        }

        if (this.value) {
          this.hiddenInput.value = this.value
        }

        this.el.appendChild(this.hiddenInput)
      }
    }
  }

  componentDidLoad() {
    if (this.autofocus) {
      this.focusInner()
    }
  }

  render() {
    const cl = [
      'ld-radio',
      this.mode && `ld-radio--${this.mode}`,
      this.tone && `ld-radio--${this.tone}`,
      this.invalid && 'ld-radio--invalid',
    ]

    return (
      <Host part="root" class={getClassNames(cl)} onClick={this.handleClick}>
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
