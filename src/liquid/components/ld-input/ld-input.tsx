import {
  Component,
  Element,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { getClassNames } from '../../utils/getClassNames'

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

  /** Hint for form autofill feature. */
  @Prop({ mutable: true, reflect: true }) autocomplete?: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop() autofocus?: boolean

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

  /** Value of the id attribute of the `<datalist>` of autocomplete options. */
  @Prop() list?: string

  /** Maximum value. */
  @Prop() max?: string

  /** Maximum length (number of characters) of `value`. */
  @Prop() maxlength?: string

  /** Minimum value. */
  @Prop() min?: string

  /** Minimum length (number of characters) of `value`. */
  @Prop() minlength?: string

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

  /** The number of rows. */
  @Prop() rows?: number

  /** Size of the input. */
  @Prop() size?: 'sm' | 'lg'

  /** Incremental values that are valid. */
  @Prop() step?: string

  /** Input tone. Use `'dark'` on white backgrounds. Default is a light tone. */
  @Prop() tone?: 'dark'

  /** The input type. */
  @Prop() type: string

  /** The input value. */
  @Prop({ mutable: true }) value?: string

  @State() clonedAttributes

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

      if (this.value) {
        this.hiddenInput.value = this.value
      } else if (this.hiddenInput.value) {
        this.hiddenInput.removeAttribute('value')
      }
    }
  }

  private createHiddenInput() {
    this.hiddenInput = document.createElement('input')
    this.hiddenInput.type = 'hidden'
    this.el.appendChild(this.hiddenInput)
  }

  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, [
      'multiline',
      'autocomplete',
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

  componentDidLoad() {
    if (this.autofocus) {
      this.focusInner()
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

  private handleInput() {
    if (!(this.input.getAttribute('aria-disabled') === 'true')) {
      this.value = this.input.value
      return
    }
    this.input.value = this.value ?? ''
  }

  private handleClick = (ev: MouseEvent) => {
    const target = ev.target as HTMLElement
    if (
      this.el.hasAttribute('disabled') ||
      this.el.getAttribute('aria-disabled') === 'true'
    ) {
      ev.preventDefault()
      return
    }

    if (target.closest('ld-button')) return

    if (target === this.el) {
      this.input.focus()
      this.input.dispatchEvent(new Event('click', { bubbles: false }))
    } else {
      this.input.focus()
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    const outerForm = this.el.closest('form')
    const formToSubmit = this.form
      ? document.querySelector<HTMLFormElement>(`#${this.form}`) ?? outerForm
      : outerForm

    if (
      this.el.getAttribute('aria-disabled') === 'true' &&
      !['ArrowLeft', 'ArrowRight', 'Tab'].includes(ev.key)
    ) {
      ev.preventDefault()
    } else if (!this.multiline && ev.key === 'Enter' && formToSubmit) {
      formToSubmit.requestSubmit()
    }
  }

  disconnectedCallback() {
    this.attributesObserver?.disconnect()
  }

  render() {
    const cl = getClassNames([
      'ld-input',
      this.size && `ld-input--${this.size}`,
      this.tone && `ld-input--${this.tone}`,
      this.invalid && 'ld-input--invalid',
    ])

    if (this.multiline) {
      const { type, ...clonedAttributesWithoutType } = this.clonedAttributes
      return (
        <Host class={cl} onClick={this.handleClick}>
          <textarea
            {...clonedAttributesWithoutType}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onInput={this.handleInput.bind(this)}
            part="input focusable"
            ref={(el) => (this.input = el)}
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
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onInput={this.handleInput.bind(this)}
          onKeyDown={this.handleKeyDown}
          part="input focusable"
          ref={(el) => (this.input = el)}
          value={this.value}
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
