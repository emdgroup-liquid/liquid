import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import ParagraphHTMLAttributes = JSXBase.HTMLAttributes

@Component({
  tag: 'ld-paragraph',
  styleUrl: 'ld-paragraph.css',
  shadow: false,
})
export class LdParagraph {
  @Element() el: HTMLParagraphElement

  /** Defines font size and line height. */
  @Prop() size: 'xs' | 'm' | 'l' | 's' | 'xl' = 'm'

  render() {
    let cl = `ld-paragraph`
    if (this.size && this.size !== 'm') cl += ` ld-paragraph--${this.size}`

    return (
      <p
        class={cl}
        {...cloneAttributes<ParagraphHTMLAttributes<HTMLParagraphElement>>(
          this.el
        )}
      >
        <slot></slot>
      </p>
    )
  }
}
