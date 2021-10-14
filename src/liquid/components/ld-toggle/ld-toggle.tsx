import { Component, Element, h, Host, Method, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part input - Actual input element
 * @part knob - Toggle knob
 * @part icon-wrapper - Both wrappers of icons
 * @part icon-wrapper-start - Wrapper of the start icon
 * @part icon-wrapper-end - Wrapper of the end icon
 */
@Component({
  tag: 'ld-toggle',
  styleUrl: 'ld-toggle.css',
  shadow: true,
})
export class LdToggle implements InnerFocusable {
  @Element() element: HTMLElement
  private input: HTMLInputElement
  private hasIcons: boolean

  /** Size of the toggle. */
  @Prop() size?: 'sm' | 'lg'

  /** Disabled state of the toggle. */
  @Prop() disabled: boolean

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the toggle as required. */
  @Prop() required: false

  /**
   * Sets focus on the toggle
   */
  @Method()
  async focusInner() {
    if (this.input !== undefined) {
      this.input.focus()
    }
  }

  componentWillLoad() {
    this.hasIcons =
      !!this.element.querySelector('[slot="icon-start"]') ||
      !!this.element.querySelector('[slot="icon-end"]')
  }

  private handleBlur = (ev: FocusEvent) => {
    setTimeout(() => {
      this.element.dispatchEvent(ev)
    })
  }

  private handleFocus = (event: FocusEvent) => {
    setTimeout(() => {
      this.element.dispatchEvent(event)
    })
  }

  private handleClick = (event: MouseEvent) => {
    if (this.ariaDisabled) {
      event.preventDefault()
      return
    }

    this.checked = !this.checked
  }

  render() {
    return (
      <Host
        class={getClassNames([
          'ld-toggle',
          this.size === 'lg' && 'ld-toggle--lg',
          this.hasIcons && 'ld-toggle--with-icons',
        ])}
        onClick={this.handleClick}
      >
        <input
          aria-disabled={this.ariaDisabled}
          checked={this.checked}
          disabled={this.disabled}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          part="input focusable"
          ref={(ref) => (this.input = ref)}
          required={this.required}
          type="checkbox"
        />
        <span class="ld-toggle__knob" part="knob" />
        {this.hasIcons && (
          <div
            class="ld-toggle__icon-start"
            part="icon-wrapper icon-wrapper-start"
          >
            <slot name="icon-start" />
          </div>
        )}
        {this.hasIcons && (
          <div class="ld-toggle__icon-end" part="icon-wrapper icon-wrapper-end">
            <slot name="icon-end" />
          </div>
        )}
      </Host>
    )
  }
}
