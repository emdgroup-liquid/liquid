import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Prop } from '@stencil/core'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-toggle',
  styleUrl: 'ld-toggle.css',
  shadow: false,
})
export class LdToggle {
  @Element() element: HTMLElement

  /** Display mode. */
  @Prop() mode?: 'small' | 'large'

  /** Disabled state of the toggle. */
  @Prop() disabled = false

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /** The input value. */
  @Prop({ mutable: true, reflect: true }) checked: boolean

  /** Set this property to `true` in order to mark the toggle visually as invalid. */
  @Prop() invalid: false

  private handleBlur(event) {
    // Q: why timeout? is an explicit dispatch of events necessary? can't we somehow forward all events by default?
    setTimeout(() => {
      this.element.dispatchEvent(event)
    })
  }

  private handleFocus(event) {
    setTimeout(() => {
      this.element.dispatchEvent(event)
    })
  }

  private handleClick(event) {
    // Q: why not dispatch like the other handlers? why aria-* instead of simply disabled?
    if (event.target.getAttribute('aria-disabled') === 'true') {
      event.preventDefault()
      return
    }
    this.checked = event.target.getAttribute('aria-checked') !== 'true'
  }

  // TODO: memoized functions possible? simplify syntax, move to utils
  private getClassNames = () => {
    const classNames = [
      'ld-toggle',
      this.mode === 'large' ? 'ld-toggle--large' : 'ld-toggle--small',
    ]

    if (this.invalid) classNames.push('ld-toggle--invalid')

    return classNames.join(' ')
  }

  render() {
    return (
      <button
        aria-checked={this.checked ? 'true' : 'false'}
        aria-disabled={this.ariaDisabled}
        class={this.getClassNames()}
        onClick={this.handleClick.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        type="button"
        disabled={this.disabled}
      >
        <span class="ld-toggle__knob" />
      </button>
    )
  }
}
