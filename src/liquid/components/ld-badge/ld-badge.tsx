import { Component, Element, h, Host, Prop, State } from '@stencil/core'
import { HTMLStencilElement } from '@stencil/core/internal'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-badge',
  styleUrl: 'ld-badge.css',
  shadow: true,
})
export class LdBadge {
  @Element() el: HTMLStencilElement

  private observer: MutationObserver

  /** Defines badge custom color */
  @Prop() brandColor?: boolean

  /** Icon name. */
  @Prop() icon?: string

  /** The size of the badge, translated in rem */
  @Prop() size?: 'lg'

  @State() hasCustomIcon = false
  @State() hasText = false

  private updateState = () => {
    this.hasCustomIcon = !!this.el.querySelector('[slot="icon"]')
    this.hasText = !!this.el.textContent.trim()
  }

  componentWillLoad() {
    this.observer = new MutationObserver(this.updateState)
    this.observer.observe(this.el, {
      subtree: true,
      childList: true,
      attributes: false,
    })

    this.updateState()
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.observer) this.observer.disconnect()
  }

  render() {
    const cl = getClassNames([
      'ld-badge',
      this.size && `ld-badge--${this.size}`,
      this.hasText && 'ld-badge--with-text',
      this.brandColor && `ld-badge--brand-color`,
    ])

    return (
      <Host class={cl}>
        {(this.icon || this.hasCustomIcon) && (
          <ld-icon class="ld-badge__icon" part="icon" name={this.icon}>
            <slot name="icon"></slot>
          </ld-icon>
        )}
        <slot></slot>
      </Host>
    )
  }
}
