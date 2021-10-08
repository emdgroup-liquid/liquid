import { Component, Element, h, Method, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-button',
  styleUrl: 'ld-button.css',
  shadow: true,
})
export class LdButton implements InnerFocusable {
  @Element() el: HTMLElement
  private button: HTMLAnchorElement | HTMLButtonElement

  /** Disabled state of the button. */
  @Prop() disabled: boolean

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

  /** Displays a progress bar at the bottom of the button. */
  @Prop() progress: 'pending' | number

  /**
   * Sets focus on the button
   */
  @Method()
  async focusInner() {
    if (this.button !== undefined) {
      this.button.focus()
    }
  }

  connectedCallback() {
    this.el.addEventListener('click', this.handleClick, {
      capture: true,
    })
  }

  disconnectedCallback() {
    this.el.removeEventListener('click', this.handleClick, {
      capture: true,
    })
  }

  private handleClick = (event: MouseEvent) => {
    console.log(event.target)
    const ariaDisabled = this.button.getAttribute('aria-disabled')

    if (this.disabled || (ariaDisabled && ariaDisabled !== 'false')) {
      event.preventDefault()
      event.stopImmediatePropagation()
      return
    }
  }

  componentWillLoad() {
    // TODO: manipulate css component, as well, as soon as icon has shadow DOM.
    this.el.querySelectorAll('ld-icon').forEach((icon) => {
      if (this.size !== undefined) {
        icon.setAttribute('size', this.size)
      } else {
        icon.removeAttribute('size')
      }
    })
  }

  render() {
    let cl = 'ld-button'
    if (this.size) cl += ` ld-button--${this.size}`
    if (this.mode) cl += ` ld-button--${this.mode}`
    if (this.alignText) cl += ` ld-button--align-text-${this.alignText}`
    if (this.justifyContent) cl += ` ld-button--justify-${this.justifyContent}`

    const Tag = this.href ? 'a' : 'button'

    const hasProgress = this.progress !== undefined

    const styleProgress = !isNaN(parseFloat(this.progress + ''))
      ? { '--ld-button-progress': this.progress + '' }
      : undefined
    const clProgress = `ld-button__progress${
      this.progress === 'pending' ? ' ld-button__progress--pending' : ''
    }`

    return (
      <Tag
        ref={(el: HTMLAnchorElement | HTMLButtonElement) => (this.button = el)}
        class={cl}
        disabled={this.disabled}
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-busy={hasProgress ? 'true' : undefined}
        aria-live="polite"
        href={this.href}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        target={this.target}
        {...cloneAttributes(this.el)}
      >
        <slot />
        {hasProgress && <span class={clProgress} style={styleProgress}></span>}
      </Tag>
    )
  }
}
