import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, Host, h, Prop, State } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part size - sets the size of the text
 * @part disabled - sets the disabled state
 * @part iconStart - displays chevron icon as prefix
 * @part iconEnd - displays chevron icon as suffix
 */

@Component({
  tag: 'ld-link',
  styleUrl: 'ld-link.css',
  shadow: true,
})
export class LdLink implements ClonesAttributes {
  @Element() el: HTMLElement
  private anchor: HTMLAnchorElement
  private attributesObserver: MutationObserver

  /** Sets the size of the text */
  @Prop() size?: 'sm' | 'lg'

  /** Sets the disabled state */
  @Prop() disabled?: boolean

  /** Displays chevron icon as prefix */
  @Prop() iconStart?: boolean

  /** Displays chevron icon as suffix */
  @Prop() iconEnd?: boolean

  @State() clonedAttributes

  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, [
      'size',
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
    const ariaDisabled = this.anchor.getAttribute('aria-disabled')

    if (this.disabled || (ariaDisabled && ariaDisabled !== 'false')) {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      return
    }
  }

  render() {
    return (
      <Host>
        <a
          {...this.clonedAttributes}
          ref={(el: HTMLAnchorElement) => (this.anchor = el)}
          class={getClassNames([
            'ld-link',
            this.size && `ld-link--${this.size}`,
            this.disabled && `ld-link--disabled`,
          ])}
          aria-disabled={
            this.disabled || this.el.getAttribute('aria-disabled') === 'true'
              ? 'true'
              : undefined
          }
          disabled={this.disabled}
        >
          {this.iconStart && (
            <ld-icon
              class="ld-link__icon"
              name="arrow-right"
              size={this.size}
            />
          )}
          <slot></slot>
          {this.iconEnd && (
            <ld-icon
              class="ld-link__icon"
              name="arrow-right"
              size={this.size}
            />
          )}
        </a>
      </Host>
    )
  }
}
