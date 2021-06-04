import { Component, Prop, h, Host, Element, State } from '@stencil/core'

/** @internal **/
@Component({
  tag: 'docs-color',
  styleUrl: 'docs-color.css',
  shadow: false,
})
export class MyComponent {
  @Element() el: HTMLElement

  /** CSS variable name */
  @Prop() var: string

  @State() dark: boolean

  private isDark(color) {
    let r, g, b
    if (color.match(/^rgb/)) {
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      )
      r = color[1]
      g = color[2]
      b = color[3]
    } else {
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))
      r = color >> 16
      g = (color >> 8) & 255
      b = color & 255
    }
    const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
    return hsp <= 127.5
  }

  componentDidRender() {
    const color = getComputedStyle(this.el).getPropertyValue('background-color')
    console.info(this.var, color)
    this.dark = this.isDark(color)
  }

  render() {
    let cl = 'docs-color'
    if (this.dark) cl += ' docs-color--dark'

    return (
      <Host class={cl} style={{ background: `var(${this.var})` }}>
        <span class="docs-color__var">{this.var}</span>
      </Host>
    )
  }
}
