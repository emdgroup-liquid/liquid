import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import LabelHTMLAttributes = JSXBase.LabelHTMLAttributes

@Component({
  tag: 'ld-label',
  styleUrl: 'ld-label.css',
  shadow: false,
})
export class LdLabel {
  @Element() el: HTMLLabelElement

  render() {
    return (
      <label
        class="ld-label"
        {...cloneAttributes<LabelHTMLAttributes<HTMLLabelElement>>(this.el)}
      >
        <slot></slot>
      </label>
    )
  }
}
