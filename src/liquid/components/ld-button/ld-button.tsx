import { Component, Element, h, Method, Prop } from '@stencil/core'
import { cloneAttributes } from '../../utils/cloneAttributes'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part button - Actual button or anchor element
 * @part progress-bar - Progress bar
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

  private clickFakeButton(
    form: HTMLFormElement,
    buttonType: 'submit' | 'reset'
  ) {
    const btnFake = document.createElement('button')
    btnFake.type = buttonType
    btnFake.style.display = 'none'
    form.appendChild(btnFake)
    btnFake.click()
    btnFake.remove()
  }

  private handleClick = (event: MouseEvent) => {
    const ariaDisabled = this.button.getAttribute('aria-disabled')

    if (this.disabled || (ariaDisabled && ariaDisabled !== 'false')) {
      event.preventDefault()
      event.stopImmediatePropagation()
      return
    }

    if (!this.href) {
      const form = this.el.closest('form')
      if (form) {
        switch (this.el.getAttribute('type')) {
          case 'reset':
            this.clickFakeButton(form, 'reset')
            break
          case 'submit':
          default:
            this.clickFakeButton(form, 'submit')
        }
      }
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
        aria-busy={hasProgress ? 'true' : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-live="polite"
        class={cl}
        disabled={this.disabled}
        href={this.href}
        part="button focusable"
        ref={(el: HTMLAnchorElement | HTMLButtonElement) => (this.button = el)}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        target={this.target}
        {...cloneAttributes(this.el)}
      >
        <slot />
        {hasProgress && (
          <span
            class={clProgress}
            part="progress-bar"
            style={styleProgress}
          ></span>
        )}
      </Tag>
    )
  }
}
