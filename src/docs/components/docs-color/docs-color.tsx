import { Component, Prop, h, Host, Element, State } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-color',
  styleUrl: 'docs-color.css',
  shadow: false,
})
export class MyComponent {
  @Element() el: HTMLElement
  private bgRef: HTMLSpanElement

  /** CSS variable name */
  @Prop() var: string

  /** Is transparent color */
  @Prop() isTransparent = false

  @State() val: string
  @State() dark: boolean

  private isDark(color) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )
    const r = color[1]
    const g = color[2]
    const b = color[3]
    const a = color[4]
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
    return hsp <= 127.5 * (a || 1)
  }

  componentDidLoad() {
    const color = getComputedStyle(this.bgRef).getPropertyValue(
      'background-color'
    )
    setTimeout(() => {
      this.val = color
      this.dark = this.isDark(color)
    })
  }

  render() {
    let cl = 'docs-color'
    if (this.dark) cl += ' docs-color--dark'
    if (this.isTransparent) {
      cl += ' docs-color--transparent'
    }

    return (
      <Host class={cl}>
        <span
          ref={(ref) => (this.bgRef = ref)}
          class="docs-color__var"
          style={{ background: `var(${this.var})` }}
        >
          <docs-copy-to-cb textToCopy={this.var} mode="ghost" />
          {this.var}
        </span>
        <span
          class="docs-color__val"
          style={{ background: `var(${this.var})` }}
        >
          <docs-copy-to-cb textToCopy={this.val} mode="ghost" />
          {this.val}
        </span>
      </Host>
    )
  }
}
