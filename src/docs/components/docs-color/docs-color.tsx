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

  private getRelRGBPartsFromValue(value) {
    const regex = /rgba?\((\d+),\s?(\d+),\s?(\d+)(?:,\s?([\d.]+))?\)/
    const result = regex.exec(value)
    if (result) {
      const [, r, g, b, a] = result
      return {
        r: parseFloat(r) / 255,
        g: parseFloat(g) / 255,
        b: parseFloat(b) / 255,
        a: a ? parseFloat(a) : 1,
      }
    } else {
      return null
    }
  }

  private convertToHSL(color) {
    const { r, g, b, a } = this.getRelRGBPartsFromValue(color)
    const cmin = Math.min(r, g, b)
    const cmax = Math.max(r, g, b)
    const delta = cmax - cmin
    let h = 0
    let s = 0
    let l = 0

    // Calculate hue
    // No difference
    if (delta == 0) h = 0
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2
    // Blue is max
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)

    // Make negative hues positive behind 360°
    if (h < 0) h += 360

    // Calculate lightness
    l = (cmax + cmin) / 2

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return `hsl(${h}deg ${s}% ${l}%${a === 1 ? '' : ' / ' + a})`
  }

  componentDidLoad() {
    const color = getComputedStyle(this.bgRef).getPropertyValue(
      'background-color'
    )
    setTimeout(() => {
      this.val = this.convertToHSL(color)
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
