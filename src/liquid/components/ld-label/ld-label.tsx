import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import LabelHTMLAttributes = JSXBase.LabelHTMLAttributes

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-label',
  styleUrl: 'ld-label.css',
  shadow: false,
})
export class LdLabel {
  @Element() el: HTMLLabelElement

  /** Relative position to labeled element. Default is top. */
  @Prop() position: 'left' | 'right'

  /** Size of the label. Default is small. */
  @Prop() size: 'm'

  render() {
    let cl = 'ld-label'
    if (this.position) cl += ` ld-label--${this.position}`
    if (this.size) cl += ` ld-label--${this.size}`

    return (
      <label
        class={cl}
        {...cloneAttributes<LabelHTMLAttributes<HTMLLabelElement>>(this.el)}
      >
        <slot></slot>
      </label>
    )
  }
}
