import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import LabelHTMLAttributes = JSXBase.LabelHTMLAttributes
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-label',
  styleUrl: 'ld-label.css',
  shadow: true,
})
export class LdLabel {
  @Element() el: HTMLLabelElement

  /** Align input message with input position. */
  @Prop() alignMessage: boolean

  /** Relative position to labeled element. Default is top. */
  @Prop() position: 'left' | 'right'

  /** Size of the label. Default is small. */
  @Prop() size: 'm'

  render() {
    return (
      <label
        class={getClassNames([
          'ld-label',
          this.alignMessage && 'ld-label--align-message',
          this.position && `ld-label--${this.position}`,
          this.size && `ld-label--${this.size}`,
        ])}
        {...cloneAttributes<LabelHTMLAttributes<HTMLLabelElement>>(this.el)}
      >
        <slot></slot>
      </label>
    )
  }
}
