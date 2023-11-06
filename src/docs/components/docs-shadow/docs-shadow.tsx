import { Component, h, Host, Prop } from "@stencil/core";

/** @internal **/
@Component({
  tag: "docs-shadow",
  styleUrl: "docs-shadow.css",
  shadow: false,
})
export class DocsShadow {
  /** CSS variable name */
  @Prop() var: string;

  /** If set to true the component uses the drop-shadow filter variable instead of box-shadow */
  @Prop() filter: boolean;

  render() {
    const style = this.filter
      ? {
          filter: `var(${this.var})`,
        }
      : {
          boxShadow: `var(${this.var})`,
        };

    return (
      <Host class="docs-shadow">
        <span class="docs-shadow__var" style={style}>
          <docs-copy-to-cb textToCopy={this.var} />
          {this.var}
        </span>
      </Host>
    );
  }
}
