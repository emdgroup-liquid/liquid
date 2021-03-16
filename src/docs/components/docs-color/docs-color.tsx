import { Component, Prop, h } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-color',
  styleUrl: 'docs-color.css',
  shadow: true,
})
export class MyComponent {
  /** CSS variable name */
  @Prop() var: string

  /** CSS variable description */
  @Prop() description: string

  render() {
    return (
      <div class="docs-color">
        <span
          class="docs-color__preview"
          style={{ background: `var(${this.var})` }}
        ></span>
        <span class="docs-color__description">{this.description}</span>
      </div>
    )
  }
}
