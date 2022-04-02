import '../../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core'
import { getClassNames } from '../../../utils/getClassNames'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-accordion-toggle',
  styleUrl: 'ld-accordion-toggle.shadow.css',
  shadow: true,
})
export class LdAccordionToggle implements InnerFocusable {
  @Element() el: HTMLElement

  private btnRef: HTMLButtonElement

  /** Disables the toggle. */
  @Prop() disabled?: boolean

  /**
   * Tag to be used for the toggle label in split mode.
   * This prop is especially usefull, if you want to place
   * your own focusable element inside the toggle label element.
   */
  @Prop() labelTag: 'button' | 'div' = 'button'

  /** Tab index of the toggle. */
  @Prop() ldTabindex: number | undefined

  /**
   * Split the toggle in two parts with the second part containing
   * the caret icon and being responsible for expanding / collapsing
   * the accordion panel.
   */
  @Prop() split?: boolean

  /** Used as aria-label value on the toggle trigger element. */
  @Prop() toggleLabel = 'Toggle'

  @State() expanded: boolean
  @State() hasCustomIcon = false

  /** Focuses the toggle */
  @Method()
  async focusInner() {
    this.btnRef.focus({ preventScroll: true })
  }

  /**
   * @internal
   * Updates expanded state.
   */
  @Method()
  async setExpanded(expanded: boolean) {
    this.expanded = expanded
  }

  /** Emitted on click of the accordion toggle trigger. */
  @Event() ldaccordiontoggleclick: EventEmitter<undefined>

  /** Emitted on click of the accordion toggle label. */
  @Event() ldaccordionlabelclick: EventEmitter<undefined>

  private handleToggleClick = (ev: MouseEvent) => {
    ev.preventDefault()

    if (this.disabled) return

    this.ldaccordiontoggleclick.emit()
  }

  private handleLabelClick = (ev: MouseEvent) => {
    ev.preventDefault()

    if (this.disabled) return

    this.ldaccordionlabelclick.emit()
  }

  componentWillLoad() {
    this.hasCustomIcon = !!this.el.querySelector('[slot="icon"]')
  }

  render() {
    const cl = getClassNames([
      'ld-accordion-toggle',
      this.expanded && 'ld-accordion-toggle--expanded',
      this.split && 'ld-accordion-toggle--split',
    ])

    const toggleTriggerContent = (
      <div class="ld-accordion-toggle__trigger-content" part="trigger-content">
        <slot name="icon"></slot>
        {!this.hasCustomIcon && (
          <ld-icon
            name="arrow-down"
            size="sm"
            part="trigger-icon"
            aria-hidden="true"
            class="ld-accordion-toggle__trigger-icon"
          />
        )}
      </div>
    )

    const toggleTrigger = this.split ? (
      <button
        part="trigger focusable"
        class="ld-accordion-toggle__trigger"
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-expanded={this.expanded ? 'true' : undefined}
        aria-label={this.toggleLabel}
        onClick={this.handleToggleClick}
        ref={(el) => (this.btnRef = el as HTMLButtonElement)}
      >
        {toggleTriggerContent}
      </button>
    ) : (
      <div part="trigger" class="ld-accordion-toggle__trigger">
        {toggleTriggerContent}
      </div>
    )

    const ToggleLabelTag = this.labelTag
    const toggleLabel = this.split ? (
      <ToggleLabelTag
        part={`label${this.labelTag === 'button' ? ' focusable' : ''}`}
        aria-disabled={this.disabled ? 'true' : undefined}
        class="ld-accordion-toggle__label"
        onClick={this.handleLabelClick}
      >
        <div class="ld-accordion-toggle__label-content" part="label-content">
          <slot />
        </div>
      </ToggleLabelTag>
    ) : (
      <div part="label" class="ld-accordion-toggle__label">
        <div class="ld-accordion-toggle__label-content" part="label-content">
          <slot />
        </div>
      </div>
    )

    const toggleContent = (
      <div part="content" class="ld-accordion-toggle__content">
        {toggleLabel}
        {toggleTrigger}
      </div>
    )

    const toggle = this.split ? (
      <div part="toggle" class="ld-accordion-toggle__button">
        {toggleContent}
      </div>
    ) : (
      <button
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-expanded={this.expanded ? 'true' : undefined}
        class="ld-accordion-toggle__button"
        onClick={this.handleToggleClick}
        part="toggle focusable"
        ref={(el) => (this.btnRef = el as HTMLButtonElement)}
        tabindex={this.ldTabindex}
      >
        {toggleContent}
      </button>
    )

    return <Host class={cl}>{toggle}</Host>
  }
}
