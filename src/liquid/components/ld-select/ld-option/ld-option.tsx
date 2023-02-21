import { Component, h, Host, Prop, Element } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-option',
  styleUrl: 'ld-option.shadow.css',
  shadow: true,
})
export class LdOption {
  @Element() el: HTMLElement

  /**
   * The content of this attribute represents the value to be submitted with the form,
   * should this option be selected. If this attribute is omitted, the value is taken
   * from the text content of the option element.
   */
  @Prop() value: string

  /** If present, this boolean attribute indicates that the option is selected. */
  @Prop() selected?: boolean

  /** Disables the option. */
  @Prop() disabled?: boolean

  /**
   * @internal
   * Set to true on filtering via select input.
   */
  @Prop() filtered? = false

  componentWillLoad() {
    // Setting selected via prop directly triggers the mutation observer to fire twice on attribute chage.
    // This is indeed only true for the selected attribute. The disabled attribute works fine when assigned directly.
    if (this.selected) {
      this.el.setAttribute('selected', '')
    }
  }

  render() {
    return (
      <Host class="ld-option">
        <slot></slot>
      </Host>
    )
  }
}
