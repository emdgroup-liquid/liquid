import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { cloneAttributes } from '../../../utils/cloneAttributes'

@Component({
  tag: 'ld-switch-item',
  styleUrl: 'ld-switch-item.css',
  shadow: true,
})
export class LdSwitchItem implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLInputElement

  private attributesObserver: MutationObserver

  private input: HTMLInputElement
  private hiddenInput: HTMLInputElement

  /** Automatically focus the form control when the page is loaded. */
  @Prop() autofocus = false

  /** Indicates whether the radio button is selected. */
  @Prop({ mutable: true }) checked = false

  /** Disabled state of the radio. */
  @Prop() disabled: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Tab index of the input. */
  @Prop() ldTabindex: number | undefined

  /** Used to specify the name of the control. */
  @Prop() name: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the checkbox as required. */
  @Prop() required: boolean

  /** The input value. */
  @Prop() value!: string

  /** The label of the switch item */
  @Prop() label!: string

  @State() clonedAttributes

  /** Emitted when the input value changed and the element loses focus. */
  @Event() ldswitchitemchange: EventEmitter<string>

  /** Emitted when the input value changed. */
  @Event() ldswitchiteminput: EventEmitter<boolean>

  /** Sets focus on the radio button. */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  @Watch('disabled')
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
    this.ldswitchitemchange.emit(this.el.value)
  }

  private handleClick = (ev?: MouseEvent) => {
    if (
      this.disabled ||
      this.el.getAttribute('aria-disabled') === 'true' ||
      this.readonly
    ) {
      ev?.preventDefault()
      return
    }

    if (this.checked) return

    // Uncheck radios with same name.
    if (this.name) {
      // Attribute selector fails in test env, hance filtering with js below.
      Array.from(document.querySelectorAll('ld-switch-item'))
        .filter(
          (ldSwitchItem) => ldSwitchItem.getAttribute('name') === this.name
        )
        .forEach((ldSwitchItem) => {
          ldSwitchItem.checked = false
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
      this.ldswitchitemchange.emit(this.el.value)
    }
  }

  private handleInput = () => {
    this.ldswitchiteminput.emit(this.checked)
  }

  private focusAndSelect(dir: 'next' | 'prev') {
    const ldSwitchItems = Array.from(
      document.querySelectorAll('ld-switch-item')
    ).filter((ldSwitchItem) => ldSwitchItem.getAttribute('name') === this.name)

    ldSwitchItems.forEach((ldSwitchItem, index) => {
      if (ldSwitchItem === (this.el as unknown as HTMLLdSwitchItemElement)) {
        const targetLdSwitchItem =
          ldSwitchItems[index + (dir === 'next' ? 1 : -1)]
        if (targetLdSwitchItem) {
          targetLdSwitchItem.focusInner()
          targetLdSwitchItem.click()
        }
      }
    })
  }

  @Watch('label')
  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, ['label'])

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
  }

  componentDidLoad() {
    if (this.autofocus) {
      this.focusInner()
    }
  }

  disconnectedCallback() {
    this.attributesObserver?.disconnect()
  }

  render() {
    return (
      <Host part="root" class="ld-switch-item" onClick={this.handleClick}>
        <label>
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
            tabIndex={this.checked ? this.ldTabindex : -1}
          />
          <span class="ld-switch-item__faux">{this.label}</span>
        </label>
      </Host>
    )
  }
}
