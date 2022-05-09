import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop, State } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */

@Component({
  tag: 'ld-link',
  styleUrl: 'ld-link.css',
  shadow: true,
})
export class LdLink implements ClonesAttributes {
  @Element() el: HTMLElement
  private attributesObserver: MutationObserver

  /**
   * The disabled attribute sets `aria-disabled="true"`
   * on the rendered anchor element.
   */
  @Prop() disabled?: boolean

  /** Displays chevron icon. */
  @Prop() chevron?: 'start' | 'end'

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  @State() clonedAttributes

  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, [
      'iconStart',
      'iconEnd',
    ])
  }

  connectedCallback() {
    this.el.addEventListener('click', this.handleClick, {
      capture: true,
    })
  }

  disconnectedCallback() {
    this.el.removeEventListener('click', this.handleClick, {
      capture: true,
    })
    this.attributesObserver?.disconnect()
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled || this.el.ariaDisabled) {
      ev.preventDefault()
      return
    }
  }

  render() {
    const cl = getClassNames([
      'ld-link',
      this.chevron && `ld-link--chevron-${this.chevron}`,
      this.disabled && `ld-link--disabled`,
    ])

    return (
      <a
        {...this.clonedAttributes}
        onClick={this.handleClick}
        class={cl}
        aria-disabled={
          this.disabled || this.el.ariaDisabled ? 'true' : undefined
        }
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        disabled={this.disabled}
      >
        <slot></slot>
      </a>
    )
  }
}
