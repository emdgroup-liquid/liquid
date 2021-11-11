import { Component, Element, h, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part tag - Actual label element
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

  private handleClick = async (event: MouseEvent) => {
    const inputElement: HTMLElement = this.el.querySelector(
      'ld-input, ld-textarea, ld-toggle, ld-select, ld-button, ld-checkbox, ld-radio, input, textarea, button, select'
    )
    const clickedInsideInputElement =
      event.target === inputElement ||
      inputElement.contains(event.target as Node)

    if (inputElement && !clickedInsideInputElement) {
      if ('focusInner' in inputElement) {
        await ((inputElement as unknown) as InnerFocusable).focusInner()
      } else {
        inputElement.focus()
      }

      inputElement.click()
    }
  }

  render() {
    return (
      <label
        class={getClassNames([
          'ld-label',
          this.alignMessage && 'ld-label--align-message',
          this.position && `ld-label--${this.position}`,
          this.size && `ld-label--${this.size}`,
        ])}
        onClick={this.handleClick}
        part="tag"
        {...cloneAttributes(this.el)}
      >
        <slot></slot>
      </label>
    )
  }
}
