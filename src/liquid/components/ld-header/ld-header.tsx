import { Component, Host, h, Prop, Element, Watch } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @slot end - Items on the right side of the header.
 * @slot logo - Custom logo.
 * @slot menu - Main menu.
 * @slot start - Items on the left side of the header.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part container - Actual header element that limits the width of the header content
 * @part logo - `ld-icon` element containing the default logo
 * @part site-name - `ld-typo` element containing the site name
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
    const offset = window.pageYOffset || document.documentElement.scrollTop

    if (offset > this.lastOffset && offset > this.currentHeight) {
      console.log('true')
      this.hidden = true
    } else {
      console.log('false')
      this.hidden = false
    }

    // For mobile or negative scrolling
    this.lastOffset = offset <= 0 ? 0 : offset
  }

  @Watch('hideOnScroll')
  connectedCallback() {
    if (this.hideOnScroll) {
      this.lastOffset = window.pageYOffset || document.documentElement.scrollTop
      window.addEventListener('scroll', this.updateScrollDirection, false)
    } else {
      this.disconnectedCallback()
    }
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.updateScrollDirection, false)
  }

  componentDidLoad() {
    const ldMenu = this.el.querySelector('ld-menu')

    if (ldMenu) {
      ldMenu.orientation = 'horizontal'
    }

    this.currentHeight = this.el.getBoundingClientRect().height

    this.el
      .querySelectorAll<HTMLLdButtonElement>('ld-header > ld-button')
      .forEach((ldButton) => {
        ldButton.size = 'sm'
        ldButton.brandColor = true

        if (ldButton.mode === 'ghost') {
          const textInButton = ldButton.textContent.trim()
          const iconInButton = ldButton.querySelector<HTMLElement>('.ld-icon')
          const innerButton = ldButton.shadowRoot.querySelector('button')

          if (iconInButton && !textInButton) {
            iconInButton.style.setProperty('--ld-icon-size-lg', '1.5rem')
            iconInButton.style.setProperty('--ld-icon-size-md', '1.5rem')
            iconInButton.style.setProperty('--ld-icon-size-sm', '1.5rem')
            innerButton.style.setProperty('--ld-button-padding-x-sm', '0')
            innerButton.style.setProperty('--ld-button-padding-y-sm', '0')
          }
        }
      })

    this.el.querySelectorAll('ld-header > .ld-button').forEach((cssButton) => {
      cssButton.classList.add('ld-button--brand-color')
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
              class="ld-header__logo"
              href={this.logoUrl}
              title={this.logoTitle}
            >
              <slot name="logo">
                <ld-icon name="m" part="logo" />
              </slot>
            </a>
          ) : (
            <div class="ld-header__logo">
              <slot name="logo">
                <ld-icon name="m" part="logo" title={this.logoTitle} />
              </slot>
            </div>
          )}
          <div class="ld-header__grow-wrapper">
            {this.siteName && (
              <ld-typo part="site-name" tag="div" variant="h5">
                {this.siteName}
              </ld-typo>
            )}
            <slot />
            <slot name="menu" />
          </div>
          <slot name="end" />
        </header>
      </Host>
    )
  }
}
