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

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part input - Actual input element
 */
@Component({
  tag: 'ld-checkbox',
  styleUrl: 'ld-checkbox.css',
  shadow: true,
})
export class LdCheckbox implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLInputElement

  private attributesObserver: MutationObserver

  private input: HTMLInputElement
  private hiddenInput: HTMLInputElement

  /** Automatically focus the form control when the page is loaded. */
  @Prop({ reflect: true }) autofocus: boolean

  /** Indicates whether the checkbox is checked. */
  @Prop({ mutable: true }) checked? = false

  /** Disabled state of the checkbox. */
  @Prop() disabled?: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /**
   * Set this property to `true` to indicate that the checkbox's value is neither true nor false.
   * The prop is removed automatically as soon as the checkbox is clicked (if not disabled).
   */
  @Prop({ mutable: true }) indeterminate?: boolean

  /** Set this property to `true` in order to mark the checkbox visually as invalid. */
  @Prop() invalid?: boolean

  /** Tab index of the input. */
  @Prop() ldTabindex?: number

  /** Display mode. */
  @Prop() mode?: 'highlight' | 'danger'

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the checkbox as required. */
  @Prop() required?: boolean

  /** Checkbox tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone?: 'dark'

  /** The input value. */
  @Prop() value?: string

  @State() clonedAttributes

  /** Emitted when the input value changed and the element loses focus. */
  @Event() ldchange: EventEmitter<boolean>

  /** Emitted when the input value changed. */
  @Event() ldinput: EventEmitter<boolean>

  /** Sets focus on the checkbox. */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  @Watch('checked')
  updateIndeterminate() {
    this.indeterminate = undefined
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
    this.hiddenInput.type = 'checkbox'
    this.hiddenInput.style.visibility = 'hidden'
    this.hiddenInput.style.position = 'absolute'
    this.hiddenInput.style.pointerEvents = 'none'
    this.el.appendChild(this.hiddenInput)
  }

  private handleChange = (ev: InputEvent) => {
    this.el.dispatchEvent(new InputEvent('change', ev))
    this.ldchange.emit(this.checked)
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.el.getAttribute('aria-disabled') === 'true') {
      ev.preventDefault()
      return
    }

    this.checked = !this.checked

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

    registerAutofocus(this.autofocus)
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.attributesObserver) this.attributesObserver.disconnect()
  }

  render() {
    const cl = [
      'ld-checkbox',
      this.mode && `ld-checkbox--${this.mode}`,
      this.tone && `ld-checkbox--${this.tone}`,
      this.invalid && 'ld-checkbox--invalid',
    ]

    return (
      <Host part="root" class={getClassNames(cl)} onClick={this.handleClick}>
        <input
          type="checkbox"
          {...this.clonedAttributes}
          checked={this.checked}
          disabled={this.disabled}
          indeterminate={this.indeterminate}
          onChange={this.handleChange}
          onInput={this.handleInput}
          part="input focusable"
          ref={(ref) => (this.input = ref)}
          tabIndex={this.ldTabindex}
          value={this.value}
        />
        {/* custom icon check */}
        <svg
          class="ld-checkbox__check"
          part="check"
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 14 14"
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
      </Host>
    )
  }
}
