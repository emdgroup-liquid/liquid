import { Component, Host, h, Prop, Element, Watch } from '@stencil/core'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @internal
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the menu items slot
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-menu',
  styleUrl: 'ld-menu.css',
  shadow: true,
})
export class LdMenu {
  @Element() el: HTMLElement

  /** Orientation of the menu items. */
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical'

  /** Title of the menu. */
  @Prop() menuTitle?: string

  @Watch('orientation')
  componentWillLoad() {
    if (this.orientation === 'horizontal') {
      this.el
        .querySelectorAll<HTMLLdMenuItemElement>(':scope > ld-menu-item')
        .forEach((ldMenuItem) => {
          ldMenuItem.mode = 'tab'
        })
    }
  }

  render() {
    const cl = getClassNames(['ld-menu', `ld-menu--${this.orientation}`])

    return (
      <Host class={cl} role="navigation">
        {this.menuTitle && <p class="ld-menu__title">{this.menuTitle}</p>}
        <ul class="ld-menu__items" part="list">
          <slot />
        </ul>
      </Host>
    )
  }
}
