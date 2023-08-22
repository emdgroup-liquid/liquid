import { Component, h, Host, Prop, Element } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-optgroup',
  styleUrl: 'ld-optgroup.shadow.css',
  shadow: true,
})
export class LdOptgroup {
  @Element() el: HTMLElement

  /** The name of the group of options. */
  @Prop() label!: string

  /** Disables the whole option group. */
  @Prop() disabled?: boolean

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
