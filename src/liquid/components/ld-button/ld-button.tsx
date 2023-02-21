import { Component, Element, h, Method, Prop, State } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { cloneAttributes } from '../../utils/cloneAttributes'
import { registerAutofocus } from '../../utils/focus'

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
export class LdButton implements InnerFocusable, ClonesAttributes {
  @Element() el: HTMLElement
  private button: HTMLAnchorElement | HTMLButtonElement

  private attributesObserver: MutationObserver

  /** Align text. */
  @Prop({ mutable: true }) alignText?: 'left' | 'right'

  /** Automatically focus the form control when the page is loaded. */
  @Prop({ reflect: true }) autofocus: boolean

  // `onBrandColor` is not possible, as Stencil expects `on*` props to be events.
  /** Style the button so that it looks good on the current theme's primary color. */
  @Prop() brandColor?: boolean

  /** Disabled state of the button. */
  @Prop() disabled?: boolean

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Overrides the `action` attribute of the button's form owner. */
  @Prop() formaction?:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain'

  /** Overrides the `enctype` attribute of the button's form owner. */
  @Prop() formenctype?: string

  /** Overrides the `method` attribute of the button's form owner. */
  @Prop() formmethod?: 'get' | 'post'

  /** Overrides the `novalidate` attribute of the button's form owner. */
  @Prop() formnovalidate?: boolean

  /** Overrides the `target` attribute of the button's form owner. */
  @Prop() formtarget?: '_blank' | '_parent' | '_self' | '_top'

  /**
   * Transforms the button to an anchor element.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href)
   * for more information on the `href` attribute.
   */
  @Prop() href?: string

  /** Justify content. */
  @Prop({ mutable: true }) justifyContent?: 'start' | 'end' | 'between'

  /** Tab index of the button. */
  @Prop() ldTabindex: number | undefined

  /** Display mode. */
  @Prop() mode?:
    | 'highlight'
    | 'secondary'
    | 'ghost'
    | 'danger'
    | 'danger-secondary'

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** Displays a progress bar at the bottom of the button. */
  @Prop() progress?: 'pending' | number

  /** Size of the button. */
  @Prop() size?: 'sm' | 'lg'

  /**
   * The `target` attributed can be used in conjunction with the `href` attribute.
   * See [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target)
   * for more information on the `target` attribute.
   */
  @Prop() target?: '_blank' | '_self' | '_parent' | '_top'

  /** Specifies the default behavior of the button. */
  @Prop() type?: 'button' | 'reset' | 'submit' = 'submit'

  /** Defines the value associated with the button’s `name` when it’s submitted with the form data. */
  @Prop() value?: string

  @State() clonedAttributes
  @State() iconOnly = false

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
    this.attributesObserver?.disconnect()
  }

  private clickHiddenButton() {
    const button = document.createElement('button')

    button.style.pointerEvents = 'none'
    button.style.position = 'absolute'
    button.style.visibility = 'hidden'

    if (this.form) button.setAttribute('form', this.form)
    if (this.formaction !== undefined) button.formAction = this.formaction
    if (this.formenctype !== undefined) button.formEnctype = this.formenctype
    if (this.formmethod !== undefined) button.formMethod = this.formmethod
    if (this.formnovalidate !== undefined)
      button.formNoValidate = this.formnovalidate
    if (this.formtarget !== undefined) button.formTarget = this.formtarget
    if (this.name !== undefined) button.name = this.name
    if (this.type !== undefined) button.type = this.type
    if (this.value !== undefined) button.value = this.value

    this.el.parentNode.append(button)
    button.click()
    button.remove()
  }

  private handleClick = (ev: MouseEvent) => {
    const ariaDisabled = this.button.getAttribute('aria-disabled')

    if (this.disabled || (ariaDisabled && ariaDisabled !== 'false')) {
      ev.preventDefault()
      // Stopping propagation is important for clicks on child elements,
      // because otherwise event handlers attached to the ld-button
      // are still called (no matter if the event was prevented or not).
      ev.stopPropagation()
      return
    }

    if (!this.href && this.type !== 'button') {
      setTimeout(() => {
        if (!ev.defaultPrevented) {
          const form = this.el.closest('form')
          if (form || this.form) {
            this.clickHiddenButton()
          }
        }
      })
    }
  }

  componentWillLoad() {
    this.attributesObserver = cloneAttributes.call(this, [
      'align-text',
      'brand-color',
      'justify-content',
      'ld-tabindex',
      'mode',
      'progress',
      'size',
      this.type === 'submit' ? 'type' : undefined, // submit is default
    ])

    const textInButton = this.el.textContent.trim()

    if (!textInButton) {
      this.iconOnly = true
    }

    registerAutofocus(this.autofocus)
  }

  render() {
    const cl = getClassNames([
      'ld-button',
      this.alignText && `ld-button--align-text-${this.alignText}`,
      this.brandColor && `ld-button--brand-color`,
      this.iconOnly && `ld-button--icon-only`,
      this.justifyContent && `ld-button--justify-${this.justifyContent}`,
      this.mode && `ld-button--${this.mode}`,
      this.size && `ld-button--${this.size}`,
    ])

    const Tag = this.href ? 'a' : 'button'

    const hasProgress = this.progress !== undefined && this.progress !== null

    const styleProgress = !isNaN(parseFloat(this.progress + ''))
      ? { '--ld-button-progress': this.progress + '' }
      : undefined
    const clProgress = `ld-button__progress${
      this.progress === 'pending' ? ' ld-button__progress--pending' : ''
    }`

    return (
      <Tag
        {...this.clonedAttributes}
        href={this.href}
        target={this.target}
        aria-busy={hasProgress ? 'true' : undefined}
        aria-disabled={
          this.disabled || this.el.getAttribute('aria-disabled') === 'true'
            ? 'true'
            : undefined
        }
        aria-live="polite"
        class={cl}
        disabled={this.disabled}
        part="button focusable"
        ref={(el: HTMLAnchorElement | HTMLButtonElement) => (this.button = el)}
        rel={this.target === '_blank' ? 'noreferrer noopener' : undefined}
        tabIndex={this.ldTabindex}
        value={this.value}
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
