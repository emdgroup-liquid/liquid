import '../../../components' // type definitions for type checks and intelliSense
import { Component, h, Host, Prop } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-shadow',
  styleUrl: 'docs-shadow.css',
  shadow: false,
})
export class DocsShadow {
  /** CSS variable name */
  @Prop() var: string

  render() {
    return (
      <Host class="docs-shadow">
        <span
          class="docs-shadow__var"
          style={{ boxShadow: `var(${this.var})` }}
        >
          <docs-copy-to-cb textToCopy={this.var} />
          {this.var}
        </span>
      </Host>
    )
  }
}
