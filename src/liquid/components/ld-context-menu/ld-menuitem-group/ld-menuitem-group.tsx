import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'ld-menuitem-group',
  styleUrl: 'ld-menuitem-group.css',
  shadow: true,
})
export class LdMenuitemGroup {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
