import '../../components' // type definitions for type checking and intelliSense
import { Component, h, Prop, Element } from '@stencil/core'

@Component({
  tag: 'ld-button',
  styleUrl: 'ld-button.css',
  shadow: false,
})
export class LdButton {
  @Element() el: HTMLElement

  /** Disabled state of the button. */
  @Prop() disabled = false

  /** Size of the button. */
  @Prop() size?: 'sm' | 'lg'

  /** Highlight mode. */
  @Prop() mode?: 'highlight' | 'secondary' | 'ghost' | 'danger'

  /** Align text. */
  @Prop() alignText: 'left' | 'right'

  /** Justify content. */
  @Prop() justifyContent: 'start' | 'end' | 'between'

  /** Tag. */
  @Prop() tag = 'button'

  /** Attributes to be attached to rendered element child. */
  @Prop() attrs?: string

  componentDidRender() {
    if (this.attrs) {
      try {
        const parsedAttrs = JSON.parse(this.attrs)
        Object.keys(parsedAttrs).forEach((key) => {
          const value = parsedAttrs[key]
          this.el.children[0].setAttribute(key, value)
        })
      } catch (err) {
        throw new TypeError(`ld-button attrs prop invalid; got ${this.attrs}`)
      }
    }
  }

  render() {
    let cl = 'ld-button ld-theme-bg-primary'
    if (this.size) cl += ` ld-button--${this.size}`
    if (this.mode) cl += ` ld-button--${this.mode}`
    if (this.alignText) cl += ` ld-button--align-text-${this.alignText}`
    if (this.justifyContent) cl += ` ld-button--justify-${this.justifyContent}`

    const Tag = this.tag

    return (
      <Tag class={cl} disabled={this.disabled} aria-disabled={this.disabled}>
        <span class="ld-button__content">
          <slot />
        </span>
      </Tag>
    )
  }
}
