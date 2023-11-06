import { Component, h } from "@stencil/core";

/**
 * @part thead - the actual thead element
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: "ld-table-head",
  styleUrl: "ld-table-head.shadow.css",
  shadow: true,
})
export class LdTableHead {
  render() {
    return (
      <thead class="ld-table-head" part="thead">
        <slot />
      </thead>
    );
  }
}
