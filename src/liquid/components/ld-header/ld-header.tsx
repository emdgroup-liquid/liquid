import { Component, Host, h, Prop, Element, Watch } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @slot end - Items on the right side of the header.
 * @slot logo - Custom logo.
 * @slot start - Items on the left side of the header.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part container - Actual header element that limits the width of the header content
 * @part logo - The default logo
 * @part logo-wrapper - The element wrapping the logo slot (div or anchor, if linked)
 * @part site-name - `ld-typo` element containing the site name
 * @part spacer - Element adding the space between the default slot and the end slot
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-header',
  styleUrl: 'ld-header.css',
  shadow: true,
})
export class LdHeader {
  @Element() el: HTMLElement
  private lastOffset?: number
  private currentHeight?: number

  /** Hides header. */
  @Prop({ mutable: true }) hidden = false

  /** Hide the header when the user scrolls down and show it again, when the user scrolls up. */
  @Prop() hideOnScroll = false

  /** Title attribute of the logo link. */
  @Prop() logoTitle?: string

  /** URL that the logo links to. */
  @Prop() logoUrl?: string

  /** Make the header sticky. */
  @Prop() sticky = false

  /** Name shown on the right side of the logo. */
  @Prop() siteName?: string

  private updateScrollDirection = () => {
    const offset = window.pageYOffset ?? document.documentElement.scrollTop

    if (window.innerHeight + offset >= document.body.offsetHeight) {
      this.hidden = false
    } else if (offset > this.lastOffset && offset > this.currentHeight) {
      this.hidden = true
    } else {
      this.hidden = false
    }

    // For mobile or negative scrolling
    this.lastOffset = offset < 0 ? 0 : offset
  }

  @Watch('hideOnScroll')
  connectedCallback() {
    if (this.hideOnScroll) {
      this.lastOffset = window.pageYOffset || document.documentElement.scrollTop
      window.addEventListener('scroll', this.updateScrollDirection, {
        passive: true,
      })
    } else {
      this.disconnectedCallback()
    }
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.updateScrollDirection)
  }

  componentDidLoad() {
    this.currentHeight = this.el.getBoundingClientRect().height

    this.el
      .querySelectorAll<HTMLLdButtonElement>('ld-header > ld-button')
      .forEach((ldButton) => {
        ldButton.size = 'sm'
        ldButton.brandColor = true
      })

    this.el
      .querySelectorAll<HTMLElement>('ld-header > .ld-button')
      .forEach((cssButton) => {
        cssButton.classList.add('ld-button--brand-color')
        cssButton.classList.add('ld-button--sm')
        cssButton.classList.remove('ld-button--lg')
      })
  }

  render() {
    const cl = getClassNames([
      'ld-header',
      this.hidden && 'ld-header--hidden',
      this.sticky && 'ld-header--sticky',
    ])

    return (
      <Host class={cl} role="banner">
        <header class="ld-header__container" part="container">
          <slot name="start" />
          {this.logoUrl ? (
            <a
              aria-label={this.logoTitle}
              class="ld-header__logo-wrapper"
              href={this.logoUrl}
              part="logo-wrapper"
            >
              <slot name="logo">
                <ld-icon
                  aria-label={
                    this.logoTitle
                      ? undefined
                      : 'Merck KGaA, Darmstadt, Germany'
                  }
                  class="ld-header__logo"
                  name="initial-m"
                  part="logo"
                />
              </slot>
            </a>
          ) : (
            <div
              aria-label={this.logoTitle}
              class="ld-header__logo-wrapper"
              part="logo-wrapper"
            >
              <slot name="logo">
                <ld-icon
                  aria-label={
                    this.logoTitle
                      ? undefined
                      : 'Merck KGaA, Darmstadt, Germany'
                  }
                  class="ld-header__logo"
                  name="initial-m"
                  part="logo"
                />
              </slot>
            </div>
          )}
          {this.siteName && (
            <ld-typo
              class="ld-header_site-name"
              part="site-name"
              tag="div"
              variant="h5"
            >
              {this.siteName}
            </ld-typo>
          )}
          <slot />
          <div class="ld-header__grow" part="spacer" />
          <slot name="end" />
        </header>
      </Host>
    )
  }
}
