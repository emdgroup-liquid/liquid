import { Component, h, Host, Prop } from "@stencil/core";

/** @internal **/
@Component({
  tag: "docs-border-radius",
  styleUrl: "docs-border-radius.css",
  shadow: false,
})
export class DocsBorderRadius {
  /** CSS variable name */
  @Prop() var: string;

  /** CSS variable value */
  @Prop() val: string;

  render() {
    return (
      <Host class="docs-border-radius">
        <span class="docs-border-radius__var">
          <docs-copy-to-cb textToCopy={this.var} />
          {this.var}
        </span>
        <span
          class="docs-border-radius__vis"
          style={{ borderRadius: `var(${this.var})` }}
        ></span>
      </Host>
    );
  }
}
