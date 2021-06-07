import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-typography',
  styleUrl: 'docs-typography.css',
  shadow: false,
})
export class DocsTypography {
  /** CSS variable name */
  @Prop() var: string

  /** CSS variable value */
  @Prop() val: string

  /** CSS prop name */
  @Prop() prop = 'font'

  render() {
    return (
      <Host class="docs-typography">
        <span class="docs-typography__var">
          <docs-copy-to-cb textToCopy={this.var} />
          {this.var}
        </span>
        <span class="docs-typography__val">{this.val}</span>
        <span
          class="docs-typography__vis"
          style={{ [this.prop]: `var(${this.var})` }}
        >
          Almost before we knew it, we had left the ground.
        </span>
      </Host>
    )
  }
}
