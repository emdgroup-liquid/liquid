import { Component, Host, h, Prop, Element, Watch } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part container - Actual header element that limits the width of the header content
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

  /** Make the header sticky. */
  @Prop() sticky = false

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

    this.el
      .querySelectorAll<HTMLElement>('ld-header > .ld-button')
      .forEach((cssButton) => {
        cssButton.classList.add('ld-button--brand-color')
        cssButton.classList.add('ld-button--sm')
        cssButton.classList.remove('ld-button--lg')

        if (cssButton.classList.contains('ld-button--ghost')) {
          const textInButton = cssButton.textContent.trim()
          const iconInButton = cssButton.querySelector<HTMLElement>('.ld-icon')

          if (iconInButton && !textInButton) {
            iconInButton.style.setProperty('--ld-icon-size-lg', '1.5rem')
            iconInButton.style.setProperty('--ld-icon-size-md', '1.5rem')
            iconInButton.style.setProperty('--ld-icon-size-sm', '1.5rem')
            cssButton.style.setProperty('--ld-button-padding-x-sm', '0')
            cssButton.style.setProperty('--ld-button-padding-y-sm', '0')
          }
        }
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
          <slot />
        </header>
      </Host>
    )
  }
}
