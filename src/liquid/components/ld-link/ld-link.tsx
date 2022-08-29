import { Component, Element, h, Method, Prop, State } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @part anchor - the link anchor
 * @virtualProp href - the URL that the hyperlink points to
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */

@Component({
  tag: 'ld-link',
  styleUrl: 'ld-link.css',
  shadow: true,
})
export class LdLink implements ClonesAttributes, InnerFocusable {
  @Element() el: HTMLElement
  private anchor: HTMLAnchorElement
  private attributesObserver: MutationObserver

  /** Displays chevron icon. */
  @Prop() chevron?: 'start' | 'end'

  /**
   * The disabled attribute sets `aria-disabled="true"`
   * on the rendered anchor element.
   */
  @Prop() disabled?: boolean

  /** Tab index of the input. */
  @Prop() ldTabindex: number | undefined

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  @State() clonedAttributes

  /** Sets focus on the anchor. */
  @Method()
  async focusInner() {
    this.anchor.focus()
  }

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
        ref={(ref) => (this.anchor = ref)}
        target={this.target}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        disabled={this.disabled}
        part="anchor focusable"
        tabIndex={this.ldTabindex}
      >
        <slot></slot>
      </a>
    )
  }
}
