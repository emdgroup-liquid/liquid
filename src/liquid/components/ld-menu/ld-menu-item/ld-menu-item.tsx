import { Component, h, Prop, Element } from '@stencil/core'
// import { cloneAttributes } from 'src/liquid/utils/cloneAttributes'
import { getClassNames } from 'src/liquid/utils/getClassNames'

/**
 * @internal
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the menu items slot
 */
@Component({
  assetsDirs: ['assets'],
  tag: 'ld-menu-item',
  styleUrl: 'ld-menu-item.css',
  shadow: true,
})
export class LdMenuItem {
  @Element() el: HTMLElement

  /** URL that the menu item points to. */
  @Prop() href?: string

  /** URL that the menu item points to. */
  @Prop() linkTitle?: string

  /** Orientation of the menu items. */
  @Prop() mode: 'tab' | 'list' = 'list'

  /** Is this the currently selected menu item? */
  @Prop() selected?: boolean

  render() {
    const cl = getClassNames([
      'ld-menu-item',
      `ld-menu-item--${this.mode}`,
      this.selected && 'ld-menu-item--selected',
    ])

    return (
      <li>
        <a
          class={cl}
          part="link"
          title={this.linkTitle}
          href={this.href}
          // {...cloneAttributes.call(this, ['link-title'])}
        >
          <slot />
        </a>
      </li>
    )
  }
}
