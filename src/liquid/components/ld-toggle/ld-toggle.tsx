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
import { getClassNames } from '../../utils/getClassNames'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { registerAutofocus } from '../../utils/focus'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part input - Actual input element
 * @part knob - Toggle knob
 * @part icon-wrapper - Both wrappers of icons
 * @part icon-wrapper-start - Wrapper of the start icon
 * @part icon-wrapper-end - Wrapper of the end icon
 */
@Component({
  tag: 'ld-toggle',
  styleUrl: 'ld-toggle.css',
  shadow: true,
})
export class LdToggle implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLElement

  private attributesObserver: MutationObserver

  private input: HTMLInputElement
  private hiddenInput: HTMLInputElement
  private hasIcons: boolean

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop({ reflect: true }) autofocus: boolean

  /** Indicates whether the toggle is "on". */
  @Prop({ mutable: true }) checked? = false

  /** Disabled state of the checkbox. */
  @Prop() disabled?: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Set this property to `true` in order to mark the checkbox visually as invalid. */
  @Prop() invalid?: boolean

  /** Tab index of the input. */
  @Prop() ldTabindex?: number

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the checkbox as required. */
  @Prop() required?: boolean

  /** Size of the toggle. */
  @Prop() size?: 'sm' | 'lg'

  /** The input value. */
  @Prop() value?: string

  @State() clonedAttributes

  /** Emitted when the input value changed and the element loses focus. */
  @Event() ldchange: EventEmitter<boolean>

  /** Emitted when the input value changed. */
  @Event() ldinput: EventEmitter<boolean>

  /** Sets focus on the toggle. */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  @Watch('checked')
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

  private handleChange = (event: InputEvent) => {
    this.el.dispatchEvent(new InputEvent('change', event))
    this.ldchange.emit(this.checked)
  }

  private handleClick = (event: MouseEvent) => {
    if (this.ariaDisabled) {
      event.preventDefault()
      return
    }

    this.checked = !this.checked

    if (!event.isTrusted) {
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
    this.attributesObserver = cloneAttributes.call(this, ['size'])

    this.hasIcons =
      !!this.el.querySelector('[slot="icon-start"]') ||
      !!this.el.querySelector('[slot="icon-end"]')

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
    this.attributesObserver?.disconnect()
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-toggle',
          this.size === 'lg' && 'ld-toggle--lg',
          this.hasIcons && 'ld-toggle--with-icons',
        ])}
        onClick={this.handleClick}
      >
        <input
          {...this.clonedAttributes}
          aria-disabled={this.ariaDisabled}
          checked={this.checked}
          disabled={this.disabled}
          onChange={this.handleChange}
          onInput={this.handleInput}
          part="input focusable"
          ref={(ref) => (this.input = ref)}
          required={this.required}
          tabIndex={this.ldTabindex}
          type="checkbox"
          value={this.value}
        />
        <span class="ld-toggle__knob" part="knob" />
        {this.hasIcons && (
          <div
            class="ld-toggle__icon-start"
            part="icon-wrapper icon-wrapper-start"
          >
            <slot name="icon-start" />
          </div>
        )}
        {this.hasIcons && (
          <div class="ld-toggle__icon-end" part="icon-wrapper icon-wrapper-end">
            <slot name="icon-end" />
          </div>
        )}
      </Host>
    )
  }
}
