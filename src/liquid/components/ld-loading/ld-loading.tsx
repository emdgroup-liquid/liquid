import { Component, h, Host, Prop } from "@stencil/core";
import { getClassNames } from "../../utils/getClassNames";

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: "ld-loading",
  styleUrl: "ld-loading.css",
  shadow: true,
})
export class LdLoading {
  /** Used as svg title element content. */
  @Prop() label? = "Loading";

  /** Uses neutral colors. */
  @Prop() neutral?: boolean;

  /** Pauses all animations. */
  @Prop() paused?: boolean;

  render() {
    const cl = getClassNames([
      "ld-loading",
      this.neutral && "ld-loading--neutral",
      this.paused && "ld-loading--paused",
    ]);

    return (
      <Host class={cl}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <title>{this.label}</title>
          <circle cx="50" cy="50" r="50" />
          <g>
            <circle cx="50" cy="50" r="50" />
            <circle cx="50" cy="50" r="50" />
            <circle cx="50" cy="50" r="50" />
            {!this.paused && (
              // When zooming in safari CSS transforms get messed up.
              // That is why we need to use an SVG animation here.
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="0.9s"
                repeatCount="indefinite"
              />
            )}
          </g>
        </svg>
      </Host>
    );
  }
}
