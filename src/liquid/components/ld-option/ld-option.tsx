import '../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop, Element } from '@stencil/core'
import { applyPropAliases } from '../../utils/applyPropAliases'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-option',
  styleUrl: 'ld-option.css',
  shadow: false,
})
export class LdOption {
  @Element() el: HTMLElement

  /**
   * The content of this attribute represents the value to be submitted with the form,
   * should this option be selected. If this attribute is omitted, the value is taken
   * from the text content of the option element.
   */
  @Prop() value: string

  /**
   * If present, this boolean attribute indicates that the option is selected.
   */
  @Prop() selected = false

  /**
   * Disables the option.
   */
  @Prop() disabled = false

  componentWillLoad() {
    applyPropAliases.apply(this)
  }

  render() {
    return (
      <Host
        class="ld-option"
        role="presentation"
        selected={this.selected}
        disabled={this.disabled}
        value={this.value}
      >
        <slot></slot>
      </Host>
    )
  }
}
