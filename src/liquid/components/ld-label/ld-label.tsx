import { Component, Element, h, Prop, State } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { getClassNames } from '../../utils/getClassNames'

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
export class LdLabel implements ClonesAttributes {
  @Element() el: HTMLLabelElement

  private attributesObserver: MutationObserver

  /** Align input message with input position. */
  @Prop() alignMessage: boolean

  /** Relative position to labeled element. Default is top. */
  @Prop() position: 'left' | 'right'

  /** Size of the label. Default is small. */
  @Prop() size: 'm'

  @State() clonedAttributes

  private handleClick = async (event: MouseEvent) => {
    const inputElement: HTMLElement = this.el.querySelector(
      'ld-input, ld-textarea, ld-toggle, ld-select, ld-button, ld-checkbox, ld-radio, input, textarea, button, select'
    )
    const clickedInsideInputElement =
      event.target === inputElement ||
      inputElement.contains(event.target as Node)

    if (
      inputElement &&
      !clickedInsideInputElement &&
      !inputElement['disabled']
    ) {
      if ('focusInner' in inputElement) {
        await (inputElement as unknown as InnerFocusable).focusInner()
      } else {
        inputElement.focus()
      }

      inputElement.click()
    }
  }

  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, [
      'align-message',
      'position',
      'size',
    ])
  }

  disconnectedCallback() {
    this.attributesObserver?.disconnect()
  }

  render() {
    const cl = getClassNames([
      'ld-label',
      this.alignMessage && 'ld-label--align-message',
      this.position && `ld-label--${this.position}`,
      this.size && `ld-label--${this.size}`,
    ])

    return (
      <label
        {...this.clonedAttributes}
        class={cl}
        onClick={this.handleClick}
        part="tag"
      >
        <slot></slot>
      </label>
    )
  }
}
