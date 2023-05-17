import { Component, Prop, h, Host, Element, State } from '@stencil/core'
import chroma from 'chroma-js'

/** @internal **/
@Component({
  tag: 'docs-color',
  styleUrl: 'docs-color.css',
  shadow: false,
})
export class MyComponent {
  @Element() el: HTMLElement
  private bgRef: HTMLSpanElement
  private observer: MutationObserver

  /** CSS variable name */
  @Prop() var: string

  /** Is transparent color */
  @Prop() isTransparent = false

  @State() val: string
  @State() dark: boolean

  private getAlpha(color) {
    return parseFloat((color.rgba()[3] || 1).toFixed(2))
  }

  private isDark(color) {
    const isDarkMode = document.documentElement.classList.contains('ld-dark')
    const a = this.getAlpha(color)
    const lightness = color.get('hsl.l')
    const isDark = isDarkMode ? lightness <= 0.4 : lightness > 0.4
    console.info('a === 1 ? !isDark : false', a === 1 ? !isDark : false)
    return a === 1 ? !isDark : false
  }

  getHSLAFromColor(color) {
    const h = parseFloat(((color.get('hsl.h') || 0) * 1).toFixed(2))
    const s = parseFloat((color.get('hsl.s') * 100).toFixed(2))
    const l = parseFloat((color.get('hsl.l') * 100).toFixed(2))
    const a = this.getAlpha(color)
    return { h, s, l, a }
  }

  updateState() {
    if (!this.bgRef) return
    const color = chroma(
      getComputedStyle(this.bgRef).getPropertyValue('background-color')
    )
    const { h, s, l, a } = this.getHSLAFromColor(color)
    this.val = `hsl(${h}deg ${s}% ${l}%${a === 1 ? '' : ' / ' + a})`
    this.dark = this.isDark(color)
  }

  componentWillLoad() {
    this.observer = new MutationObserver(this.updateState.bind(this))
    this.observer.observe(document.documentElement, {
      subtree: false,
      childList: false,
      attributes: true,
    })

    this.updateState()
  }

  componentDidLoad() {
    setTimeout(() => {
      this.updateState()
    })
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect()
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
