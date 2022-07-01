import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part switch_item-container - Container wrapping the slot
 */

@Component({
  tag: 'ld-switch',
  styleUrl: 'ld-switch.css',
  shadow: true,
})
export class LdSwitch {
  @Element() el: HTMLElement

  /** Size of the switch. */
  @Prop() size?: 'sm' | 'md' | 'lg'

  /** Defines switch custom color */
  @Prop() brandColor?: boolean

  /** Defines a description of the contents of the switch component.*/
  @Prop() label!: string

  /** Automatically focus the form control when the page is loaded. */
  @Prop() autofocus = false

  /** Disabled state of the switch. */
  @Prop() disabled: boolean

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Used to specify the name of the control. */
  @Prop() name!: string

  /** The value is not editable. */
  @Prop() readonly?: boolean

  /** Set this property to `true` in order to mark the switch as required. */
  @Prop() required: boolean

  /**
   * Emitted with the value of the selected switch item.
   */
  @Event() ldswitchchange: EventEmitter<string>

  private handleLdSwitchItemChange = (ev: CustomEvent<undefined>) => {
    ev.stopImmediatePropagation()
    const currentLdSwitchItem = ev.target as HTMLLdSwitchItemElement
    this.ldswitchchange.emit(currentLdSwitchItem.value)
  }

  @Watch('name')
  @Watch('disabled')
  componentWillLoad() {
    const ldSwitchItems = this.el.querySelectorAll('ld-switch-item')
    const hasAnyChecked =
      ldSwitchItems.length > 0 &&
      Array.from(ldSwitchItems).some((ldSwitchItem) => ldSwitchItem.checked)

    ldSwitchItems.forEach((ldSwitchItem) => {
      if (this.name) {
        ldSwitchItem.setAttribute('name', this.name)
      }

      if (this.readonly) {
        ldSwitchItem.setAttribute('readonly', this.readonly.toString())
      }

      if (this.disabled) {
        ldSwitchItem.disabled = this.disabled
      }

      if (this.required) {
        ldSwitchItem.required = this.required
      }
    })

    if (ldSwitchItems.length > 0 && !hasAnyChecked) {
      ldSwitchItems[0].checked = true
    }
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-switch',
          this.size && `ld-switch--${this.size}`,
          this.brandColor && `ld-switch--brand-color`,
        ])}
        onLdswitchitemchange={this.handleLdSwitchItemChange}
      >
        <fieldset part="fieldset">
          <legend>{this.label}</legend>
          <div class="ld-switch_item-container" part="switch_item-container">
            <slot></slot>
          </div>
        </fieldset>
      </Host>
    )
  }
}
