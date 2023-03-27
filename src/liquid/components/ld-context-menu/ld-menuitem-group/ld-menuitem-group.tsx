import { Component, Host, h, Prop } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
 * @part listitem - `li` element wrapping the `ul` element
 */
@Component({
  tag: 'ld-menuitem-group',
  styleUrl: 'ld-menuitem-group.css',
  shadow: true,
})
export class LdMenuitemGroup {
  /** Label for the menu item group. */
  @Prop() ariaLabel: HTMLUListElement['ariaLabel']

  render() {
    return (
      <Host>
        <li class="ld-menuitem-group" part="listitem" role="none">
          <ul
            class="ld-menuitem-group__list"
            aria-label={this.ariaLabel}
            role="group"
          >
            <slot></slot>
          </ul>
        </li>
      </Host>
    )
  }
}
