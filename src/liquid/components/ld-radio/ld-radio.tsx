import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { getClassNames } from '../../utils/getClassNames'
import { registerAutofocus } from '../../utils/focus'
import { isAriaDisabled } from '../../utils/ariaDisabled'

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
export class LdRadio implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLInputElement

  private attributesObserver: MutationObserver

  private input: HTMLInputElement
  private hiddenInput: HTMLInputElement

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop({ reflect: true }) autofocus: boolean

  /** Indicates whether the radio button is selected. */
  @Prop({ mutable: true }) checked? = false

  /** Disabled state of the radio. */
  @Prop() disabled?: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /**
   * @internal
   * States that this radio button or another radio button with the same name is checked.
   */
  @Prop() groupChecked? = false

  /** Set this property to `true` in order to mark the radio visually as invalid. */
  @Prop() invalid?: boolean

  /** Tab index of the input. */
  @Prop() ldTabindex?: number

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** Used to specify the name of the control. */
  @Prop() name!: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the radio button as required. */
  @Prop() required?: boolean

  /** radio tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone?: 'dark'

  /** The input value. */
  @Prop() value?: string

  @State() clonedAttributes

  /** Emitted when the input value changed and the element loses focus. */
  @Event() ldchange: EventEmitter<boolean>

  /** Emitted when the input value changed. */
  @Event() ldinput: EventEmitter<boolean>

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
  @Watch('value')
  updateHiddenInput() {
    const outerForm = this.el.closest('form')
    if (!this.hiddenInput && this.name && (outerForm || this.form)) {
      this.createHiddenInput()
    }

    if (this.hiddenInput) {
      if (!this.name) {
        this.hiddenInput.remove()
        this.hiddenInput = undefined
        return
      }

      this.hiddenInput.name = this.name
      this.hiddenInput.checked = this.checked

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

  private createHiddenInput() {
    this.hiddenInput = document.createElement('input')
    this.hiddenInput.type = 'radio'
    this.hiddenInput.style.visibility = 'hidden'
    this.hiddenInput.style.position = 'absolute'
    this.hiddenInput.style.pointerEvents = 'none'
    this.el.appendChild(this.hiddenInput)
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

  private handleChange = (event: InputEvent) => {
    this.el.dispatchEvent(new InputEvent('change', event))
    this.ldchange.emit(this.checked)
  }

  private handleClick = (ev?: MouseEvent) => {
    if (this.disabled || isAriaDisabled(this.el.ariaDisabled)) {
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
          ldRadio.checked = false
          ldRadio.groupChecked = true
        })
    }

    this.checked = true

    if (!ev.isTrusted) {
      // This happens, when a click event is dispatched on the host element
      // from the outside i.e. on click on a parent ld-label element.
      this.el.dispatchEvent(
        new InputEvent('input', { bubbles: true, composed: true })
      )
      this.handleInput()
      this.el.dispatchEvent(new InputEvent('change', { bubbles: true }))
      this.ldchange.emit(this.checked)
    }
  }

  private handleInput = () => {
    this.ldinput.emit(this.checked)
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
    this.attributesObserver = cloneAttributes.call(this, ['tone', 'mode'])

    const outerForm = this.el.closest('form')

    if (this.name && (outerForm || this.form)) {
      this.createHiddenInput()
      this.hiddenInput.checked = this.checked
      this.hiddenInput.name = this.name

      if (this.form) {
        this.hiddenInput.setAttribute('form', this.form)
      }

      if (this.value) {
        this.hiddenInput.value = this.value
      }
    }

    if (this.checked) {
      Array.from(document.querySelectorAll('ld-radio'))
        .filter((ldRadio) => ldRadio.getAttribute('name') === this.name)
        .forEach((ldRadio) => {
          ldRadio.groupChecked = true
        })
    }

    registerAutofocus(this.autofocus)
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.attributesObserver) this.attributesObserver.disconnect()
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
          type="radio"
          {...this.clonedAttributes}
          part="input focusable"
          onChange={this.handleChange}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
          ref={(ref) => (this.input = ref)}
          disabled={this.disabled}
          checked={this.checked}
          tabIndex={
            this.disabled || this.checked || !this.groupChecked
              ? this.ldTabindex
              : -1
          }
          value={this.value}
        />
        <div part="dot" class="ld-radio__dot"></div>
        <div class="ld-radio__box" part="box"></div>
      </Host>
    )
  }
}
