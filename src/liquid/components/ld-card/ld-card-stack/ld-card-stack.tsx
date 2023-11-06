import { Component, h, Host, Prop } from "@stencil/core";
import { getClassNames } from "../../../utils/getClassNames";

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: "ld-card-stack",
  styleUrl: "ld-card-stack.css",
  shadow: true,
})
export class LdCardStack {
  /** The stack direction. */
  @Prop() direction?: "ltr" | "rtl" | "vertical";

  render() {
    return (
      <Host
        class={getClassNames([
          "ld-card-stack",
          `ld-card-stack--${this.direction}`,
        ])}
        role="list"
      >
        <slot></slot>
      </Host>
    );
  }
}
