import { Component, h, Host, Prop } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-typography',
  styleUrl: 'docs-typography.css',
  shadow: false,
})
export class DocsTypography {
  /** Sets primary color on the M-Font and transforms it to uppercase. */
  @Prop() brand?: boolean

  /** CSS prop name */
  @Prop() prop = 'font'

  /** CSS variable value */
  @Prop() val: string

  /** CSS variable name */
  @Prop() var: string

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
          style={{
            [this.prop]: `var(${this.var})`,
            ...(this.brand
              ? {
                  textTransform: 'uppercase',
                  color: 'var(--ld-thm-primary)',
                }
              : {}),
          }}
        >
          Almost before we knew it, we had left the ground.
        </span>
      </Host>
    )
  }
}
