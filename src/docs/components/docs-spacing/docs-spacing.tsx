import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-spacing',
  styleUrl: 'docs-spacing.css',
  shadow: false,
})
export class DocsSpacing {
  /** CSS variable name */
  @Prop() var: string

  /** CSS variable value */
  @Prop() val: string

  render() {
    return (
      <Host class="docs-spacing">
        <span class="docs-spacing__var">
          <docs-copy-to-cb textToCopy={this.var} />
          {this.var}
        </span>
        <span class="docs-spacing__val">{this.val}</span>
        <span
          class="docs-spacing__vis"
          style={{ width: `var(${this.var})`, height: `var(${this.var})` }}
        ></span>
      </Host>
    )
  }
}
