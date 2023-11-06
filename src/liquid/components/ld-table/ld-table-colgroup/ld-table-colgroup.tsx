import { Component, h, Prop } from "@stencil/core";

/**
 * @part colgroup - the actual colgroup element
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: "ld-table-colgroup",
  styleUrl: "ld-table-colgroup.shadow.css",
  shadow: true,
})
export class LdTableColgroup {
  /** Contains a non-negative integer value indicating the number of consecutive columns the colgroup element spans. */
  @Prop() span?: HTMLTableColElement["span"];

  render() {
    return (
      <colgroup class="ld-table-colgroup" span={this.span} part="colgroup">
        <slot />
      </colgroup>
    );
  }
}
