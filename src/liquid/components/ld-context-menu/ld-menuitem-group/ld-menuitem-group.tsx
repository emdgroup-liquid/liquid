import { Component, Host, h, Prop } from '@stencil/core'

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
        <li class="ld-menuitem-group" role="none">
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
