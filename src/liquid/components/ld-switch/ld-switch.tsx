import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { registerAutofocus } from '../../utils/focus'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part fieldset - Container wrapping the legent element and the slot
 * @part legend - The legend element
 */

@Component({
  tag: 'ld-switch',
  styleUrl: 'ld-switch.css',
  shadow: true,
})
export class LdSwitch implements InnerFocusable {
  @Element() el: HTMLElement

  /** Size of the switch. */
  @Prop() size?: 'sm' | 'md' | 'lg'

  /** Defines switch custom color */
  @Prop() brandColor?: boolean

  /** Defines a description of the contents of the switch component. */
  @Prop() legend?: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop({ reflect: true }) autofocus: boolean

  /** Disabled state of the switch. */
  @Prop() disabled: boolean

  /** Make each switch item take up as little space as its content requires. */
  @Prop() fitContent = false

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the switch as required. */
  @Prop() required: boolean

  /** Tab index of the input. */
  @Prop() ldTabindex: number | undefined

  @State() hasFocus = false

  /** Emitted with the value of the selected switch item. */
  @Event() ldswitchchange: EventEmitter<string>

  @Listen('ldswitchitemchange')
  handleLdSwitchItemChange(ev: CustomEvent<boolean>) {
    ev.stopImmediatePropagation()
    const currentLdSwitchItem = ev.target as HTMLLdSwitchItemElement
    this.ldswitchchange.emit(currentLdSwitchItem.value)
  }

  /** Sets focus on the radio button. */
  @Method()
  async focusInner() {
    const ldSwitchItems = Array.from(
      this.el.querySelectorAll('ld-switch-item')
    ).filter((ldSwitchItem) => !ldSwitchItem.disabled)

    const checkedItem = ldSwitchItems.find(
      (ldSwitchItem) => ldSwitchItem.checked
    )
    if (checkedItem) {
      checkedItem.focusInner()
    } else {
      ldSwitchItems[0].focusInner()
    }
  }

  private handleItemFocus = () => {
    this.hasFocus = true
  }

  private handleFocus = () => {
    this.focusInner()
  }

  private handleFocusout = () => {
    this.hasFocus = false
  }

  @Watch('ariaDisabled')
  @Watch('disabled')
  @Watch('form')
  @Watch('ldTabindex')
  @Watch('name')
  @Watch('readonly')
  @Watch('required')
  updateSwitchItemProps() {
    const ldSwitchItems = this.el.querySelectorAll('ld-switch-item')
    ldSwitchItems.forEach((ldSwitchItem) => {
      if (this.ariaDisabled) {
        ldSwitchItem.ariaDisabled = this.ariaDisabled
      }
      if (this.disabled) {
        ldSwitchItem.disabled = this.disabled
      }
      ldSwitchItem.form = this.form
      ldSwitchItem.ldTabindex = this.ldTabindex
      ldSwitchItem.name = this.name
      ldSwitchItem.readonly = this.readonly
      ldSwitchItem.required = this.required
    })
  }

  componentWillLoad() {
    this.updateSwitchItemProps()

    registerAutofocus(this.autofocus)
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-switch',
          this.brandColor && `ld-switch--brand-color`,
          this.fitContent && `ld-switch--fit-content`,
          this.size && `ld-switch--${this.size}`,
        ])}
        onLdswitchitemfocus={this.handleItemFocus}
        onFocus={this.handleFocus}
        onFocusout={this.handleFocusout}
        tabIndex={
          this.disabled || this.ariaDisabled
            ? this.ldTabindex
            : this.hasFocus
            ? -1
            : this.ldTabindex || 0
        }
      >
        <fieldset part="fieldset">
          {this.legend && <legend part="legend">{this.legend}</legend>}
          <slot></slot>
        </fieldset>
      </Host>
    )
  }
}
