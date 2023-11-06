import { Component, Host, h } from "@stencil/core";

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: "ld-sr-only",
  styleUrl: "ld-sr-only.css",
  shadow: true,
})
export class LdSrOnly {
  render() {
    return (
      <Host class="ld-sr-only">
        <slot></slot>
      </Host>
    );
  }
}
