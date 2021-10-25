import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-paragraph',
  styleUrl: 'ld-paragraph.css',
  shadow: true,
})
export class LdParagraph {
  @Element() el: HTMLParagraphElement

  /** Defines font size and line height. */
  @Prop() size: 'xs' | 'm' | 'l' | 's' | 'xl' = 'm'

  render() {
    let cl = `ld-paragraph`
    if (this.size && this.size !== 'm') cl += ` ld-paragraph--${this.size}`

    return (
      <p class={cl} {...cloneAttributes(this.el)}>
        <slot></slot>
      </p>
    )
  }
}
