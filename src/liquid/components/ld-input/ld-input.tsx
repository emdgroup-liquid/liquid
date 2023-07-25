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
 * The `ld-input` component. You can use it in conjunction with the `ld-label`
 * and the `ld-input-message` component. See examples in the docs for a better
 * understanding on how they can be used together.
 *
 * @slot start - The purpose of this slot is to add icons or buttons
 * to the input, __justifying the item to the end of the component__.
 * Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component.
 * If you choose to place something different into the slot, you will probably
 * need to adjust some styles on the slotted item in order to make it fit right.
 * @slot end - The purpose of this slot is to add icons or buttons
 * to the input, __justifying the item to the start of the component__.
 * Styling for `ld-icon` and `ld-button` is provided within the `ld-input` component.
 * If you choose to place something different into the slot, you will probably
 * need to adjust some styles on the slotted item in order to make it fit right.
 * @virtualProp { FileList | undefined } files - Selected files for ld-input with type file (readonly).
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part input - Actual input/textarea element
 * @part placeholder - Placeholder rendered for input type "file"
 */
@Component({
  tag: 'ld-input',
  styleUrl: 'ld-input.css',
  shadow: true,
})
export class LdInput implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLInputElement | HTMLTextAreaElement

  private attributesObserver: MutationObserver

  private hiddenInput?: HTMLInputElement
  private input: HTMLInputElement | HTMLTextAreaElement

  /** Hint for expected file type in file upload controls. */
  @Prop() accept?: string

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** Hint for form autofill feature. */
  @Prop({ mutable: true, reflect: true }) autocomplete?: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop({ reflect: true }) autofocus: boolean

  /** Media capture input method in file upload controls. */
  @Prop() capture?: string

  /** The number of columns. */
  @Prop() cols?: number

  /** Name of form field to use for sending the element's directionality in form submission. */
  @Prop() dirname?: string

  /** Whether the form control is disabled. */
  @Prop() disabled?: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Set this property to `true` in order to mark the field visually as invalid. */
  @Prop() invalid?: boolean

  /** Tab index of the input. */
  @Prop() ldTabindex?: number

  /** Value of the id attribute of the `<datalist>` of autocomplete options. */
  @Prop() list?: string

  /** Maximum value. */
  @Prop() max?: string | number

  /** Maximum length (number of characters) of `value`. */
  @Prop() maxlength?: string | number

  /** Minimum value. */
  @Prop() min?: string | number

  /** Minimum length (number of characters) of `value`. */
  @Prop() minlength?: string | number

  /**
   * Uses textarea instead of input internally. Setting this attribute to true
   * disables the attribute type and both slots.
   */
  @Prop() multiline?: boolean

  /** Boolean. Whether to allow multiple values. */
  @Prop() multiple?: boolean

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** Pattern the `value` must match to be valid. */
  @Prop() pattern?: string

  /** The input placeholder. */
  @Prop() placeholder?: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** A value is required for the form to be submittable. */
  @Prop() required?: boolean

  /** Whether the multiline input is resizable, and if so, in which directions. */
  @Prop() resize?: 'none' | 'both' | 'horizontal' | 'vertical' = 'both'

  /** The number of rows. */
  @Prop() rows?: number

  /** Size of the input. */
  @Prop() size?: 'sm' | 'lg'

  /** Incremental values that are valid. */
  @Prop() step?: string

  /** Input tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone?: 'dark'

  /** The input type. */
  @Prop() type?: string

  /** The input value. */
  @Prop({ mutable: true }) value?: string

  @State() clonedAttributes

  /** Emitted when the input value changed and the element loses focus. */
  @Event() ldchange: EventEmitter<string>

  /** Emitted when the input value changed. */
  @Event() ldinput: EventEmitter<string>

  /**
   * Sets focus on the input
   */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  @Watch('dirname')
  @Watch('form')
  @Watch('name')
  @Watch('value')
  updateHiddenInput() {
    const outerForm = this.el.closest('form')
    if (!this.hiddenInput && this.name && (outerForm || this.form)) {
      this.createHiddenInput()
    }

    if (this.hiddenInput) {
      if (this.dirname) {
        this.hiddenInput.dirName = this.dirname
      }

      if (this.name) {
        this.hiddenInput.name = this.name
      } else if (this.hiddenInput.name) {
        this.hiddenInput.remove()
        this.hiddenInput = undefined
        return
      }

      if (this.form) {
        this.hiddenInput.setAttribute('form', this.form)
      } else if (this.hiddenInput.getAttribute('form')) {
        if (outerForm) {
          this.hiddenInput.removeAttribute('form')
        } else {
          this.hiddenInput.remove()
          this.hiddenInput = undefined
          return
        }
      }

      if (this.isInputTypeFile(this.input)) {
        // Clone input field in shadow dom to hidden input field.
        const clonedInput = this.input.cloneNode() as HTMLInputElement
        clonedInput.style.display = 'none'
        this.hiddenInput.replaceWith(clonedInput)
        this.hiddenInput = clonedInput
      } else {
        // Update value.
        if (this.value) {
          this.hiddenInput.value = this.value
        } else if (this.hiddenInput.value) {
          this.hiddenInput.removeAttribute('value')
        }
      }
    }
  }

  private createHiddenInput() {
    this.hiddenInput = document.createElement('input')
    this.hiddenInput.type = 'hidden'
    this.el.appendChild(this.hiddenInput)
  }

  @Watch('size')
  private updateIconAndButtonSize() {
    this.el.querySelectorAll('ld-button').forEach((button) => {
      if (this.size !== undefined) {
        button.setAttribute('size', this.size)
      } else {
        button.removeAttribute('size')
      }
    })
    this.el.querySelectorAll('.ld-button').forEach((button) => {
      if (this.size === 'sm') {
        button.classList.remove('ld-button--lg')
        button.classList.add('ld-button--sm')
      } else if (this.size === 'lg') {
        button.classList.remove('ld-button--sm')
        button.classList.add('ld-button--lg')
      } else {
        button.classList.remove('ld-button--sm', 'ld-button--lg')
      }
    })
    this.el.querySelectorAll('ld-icon').forEach((icon) => {
      if (this.size !== undefined) {
        icon.setAttribute('size', this.size)
      } else {
        icon.removeAttribute('size')
      }
    })
    this.el.querySelectorAll('.ld-icon').forEach((icon) => {
      if (this.size === 'sm') {
        icon.classList.remove('ld-icon--lg')
        icon.classList.add('ld-icon--sm')
      } else if (this.size === 'lg') {
        icon.classList.remove('ld-icon--sm')
        icon.classList.add('ld-icon--lg')
      } else {
        icon.classList.remove('ld-icon--sm', 'ld-icon--lg')
      }
    })
  }

  componentWillLoad() {
    // Add readonly prop files.
    Object.defineProperty(this.el, 'files', {
      get: () => {
        if (this.isInputTypeFile(this.input)) {
          return this.input.files
        }
        return undefined
      },
    })

    this.attributesObserver = cloneAttributes.call(this, [
      'multiline',
      'autocomplete',
      'value',
    ])

    const outerForm = this.el.closest('form')

    if (outerForm && !this.autocomplete) {
      this.autocomplete = outerForm.getAttribute('autocomplete')
    }

    if (this.name && (outerForm || this.form)) {
      this.createHiddenInput()
      this.hiddenInput.name = this.name

      if (this.dirname) {
        this.hiddenInput.dirName = this.dirname
      }

      if (this.form) {
        this.hiddenInput.setAttribute('form', this.form)
      }

      if (this.value) {
        this.hiddenInput.value = this.value
      }
    }

    this.updateIconAndButtonSize()

    registerAutofocus(this.autofocus)
  }

  private isInputTypeFile = (
    input: HTMLInputElement | HTMLTextAreaElement
  ): input is HTMLInputElement => {
    return (input as HTMLInputElement).type === 'file'
  }

  private handleChange = (ev: InputEvent) => {
    this.el.dispatchEvent(new InputEvent('change', ev))

    this.ldchange.emit(this.value)
  }

  private handleInput = () => {
    this.value = this.input.value

    this.ldinput.emit(this.value)
  }

  private handleClick = (ev: MouseEvent) => {
    const target = (
      'composedPath' in ev ? ev.composedPath()[0] : ev['target']
    ) as HTMLElement
    if (this.el.disabled || isAriaDisabled(this.el.ariaDisabled)) {
      ev.preventDefault()
      return
    }

    if (target.closest('ld-button')) return

    if (this.el.shadowRoot.activeElement !== this.input) {
      this.input.focus()
    }

    if (target === this.el) {
      this.input.dispatchEvent(new MouseEvent('click', { bubbles: false }))
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    const outerForm = this.el.closest('form')
    const formToSubmit = this.form
      ? document.querySelector<HTMLFormElement>(`#${this.form}`) ?? outerForm
      : outerForm

    if (
      isAriaDisabled(this.el.ariaDisabled) &&
      !['ArrowLeft', 'ArrowRight', 'Tab'].includes(ev.key)
    ) {
      ev.preventDefault()
    } else if (!this.multiline && ev.key === 'Enter' && formToSubmit) {
      formToSubmit.requestSubmit()
    }
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.attributesObserver) this.attributesObserver.disconnect()
  }

  render() {
    const cl = getClassNames([
      'ld-input',
      this.disabled && `ld-input--disabled`,
      this.size && `ld-input--${this.size}`,
      this.tone && `ld-input--${this.tone}`,
      this.invalid && 'ld-input--invalid',
      this.multiline && this.resize && `ld-input--resize-${this.resize}`,
    ])

    if (this.multiline) {
      const { type, ...clonedAttributesWithoutType } = this.clonedAttributes
      return (
        <Host class={cl} onClick={this.handleClick}>
          <textarea
            {...clonedAttributesWithoutType}
            onChange={this.handleChange}
            onInput={this.handleInput}
            part="input focusable"
            ref={(el) => (this.input = el)}
            tabIndex={this.ldTabindex}
            value={this.value}
          />
          {type === 'file' && (
            <span class="ld-input__placeholder" part="placeholder">
              {this.input?.value || this.placeholder}
            </span>
          )}
        </Host>
      )
    }

    return (
      <Host class={cl} onClick={this.handleClick}>
        <slot name="start"></slot>
        <input
          {...this.clonedAttributes}
          autocomplete={this.autocomplete}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
          part="input focusable"
          placeholder={this.placeholder}
          ref={(el) => (this.input = el)}
          tabIndex={this.ldTabindex}
          type={this.type}
          value={this.value || undefined} // the undefined fixes negative number input in input of type number
        />
        {this.type === 'file' && (
          <span class="ld-input__placeholder" part="placeholder">
            {this.input?.value || this.placeholder}
          </span>
        )}
        <slot name="end"></slot>
      </Host>
    )
  }
}
