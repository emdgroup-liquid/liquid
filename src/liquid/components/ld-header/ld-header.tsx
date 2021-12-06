import { Component, Host, h, Prop, Element } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @slot logo - (optional) Custom logo.
 * @slot menu - Main menu.
 * @slot buttons - (optional) Items on the right side of the header.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part buttons - Wrapper around the buttons slot
 * @part container - Actual header element that limits the width of the header content
 * @part logo - Logo
 * @part site-name - `ld-typo` element containing the site name
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-header',
  styleUrl: 'ld-header.css',
  shadow: true,
})
export class LdHeader {
  @Element() element: HTMLElement

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

  render() {
    const cl = getClassNames([
      'ld-header',
      this.hideOnScroll && 'ld-header--hide-on-scroll',
      this.sticky && 'ld-header--sticky',
    ])
    return (
      <Host class={cl} role="banner">
        <header part="container">
          <slot name="logo">
            {this.logoUrl ? (
              <a href={this.logoUrl} title={this.logoTitle}>
                <ld-icon part="logo" class="ld-header__logo" name="m" />
              </a>
            ) : (
              <ld-icon part="logo" class="ld-header__logo" name="m" />
            )}
          </slot>
          <ld-typo variant="h5" tag="div" part="site-name">
            {this.siteName}
          </ld-typo>
          <slot name="menu" />
          <div class="ld-header__buttons" part="buttons">
            <slot name="buttons" />
          </div>
        </header>
      </Host>
    )
  }
}
