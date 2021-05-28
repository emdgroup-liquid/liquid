import '../../components' // type definitions for type checking and intelliSense
import { Component, h, Host, Prop, Element } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { JSXBase } from '@stencil/core/internal'
import ButtonHTMLAttributes = JSXBase.ButtonHTMLAttributes
import AnchorHTMLAttributes = JSXBase.AnchorHTMLAttributes
import { applyPropAliases } from '../../utils/applyPropAliases'

@Component({
  tag: 'ld-button',
  styleUrl: 'ld-button.css',
  shadow: false,
})
export class LdButton {
  @Element() el: HTMLElement

  private button!: HTMLElement

  /** Disabled state of the button. */
  @Prop() disabled = false

  /** Size of the button. */
  @Prop() size?: 'sm' | 'lg'

  /** Display mode. */
  @Prop() mode?:
    | 'highlight'
    | 'secondary'
    | 'ghost'
    | 'danger'
    | 'on-brand-color'
    | 'secondary-on-brand-color'

  /** Align text. */
  @Prop({ mutable: true }) alignText: 'left' | 'right'

  /** Justify content. */
  @Prop({ mutable: true }) justifyContent: 'start' | 'end' | 'between'

  /**
   * Transforms the button to an anchor element.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href)
   * for more information on the `href` attribute.
   */
  @Prop() href?: string

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  private handleClick(ev) {
    if (this.button.getAttribute('aria-disabled')) {
      ev.preventDefault()
      ev.stopImmediatePropagation()
    }
  }

  componentWillLoad() {
    applyPropAliases.apply(this)
  }

  render() {
    let cl = 'ld-button'
    if (this.size) cl += ` ld-button--${this.size}`
    if (this.mode) cl += ` ld-button--${this.mode}`
    if (this.alignText) cl += ` ld-button--align-text-${this.alignText}`
    if (this.justifyContent) cl += ` ld-button--justify-${this.justifyContent}`

    const Tag = this.href ? 'a' : 'button'

    return (
      <Host>
        <Tag
          ref={(el) => (this.button = el as HTMLElement)}
          onClick={this.handleClick.bind(this)}
          class={cl}
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : undefined}
          href={this.href}
          target={this.target}
          rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
          {...(this.href
            ? cloneAttributes<ButtonHTMLAttributes<HTMLButtonElement>>(this.el)
            : cloneAttributes<AnchorHTMLAttributes<HTMLAnchorElement>>(
                this.el
              ))}
        >
          <slot />
        </Tag>
      </Host>
    )
  }
}
