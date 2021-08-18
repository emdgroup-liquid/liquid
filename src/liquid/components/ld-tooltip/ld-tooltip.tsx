import Tether from 'tether'
import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import '../../components' // type definitions for type checks and intelliSense
import { applyPropAliases } from '../../utils/applyPropAliases'

type Position =
  | 'bottom center'
  | 'bottom left'
  | 'bottom right'
  | 'left bottom'
  | 'left middle'
  | 'left top'
  | 'right bottom'
  | 'right middle'
  | 'right top'
  | 'top center'
  | 'top left'
  | 'top right'

const mapPositionToAttachment = (position: Position) =>
  ({
    'bottom center': 'top center',
    'bottom left': 'top left',
    'bottom right': 'top right',
    'left bottom': 'bottom right',
    'left middle': 'middle right',
    'left top': 'top right',
    'right bottom': 'bottom left',
    'right middle': 'middle left',
    'right top': 'top left',
    'top center': 'bottom center',
    'top left': 'bottom left',
    'top right': 'bottom right',
  }[position])

const mapPositionToTargetAttachment = (position: Position) =>
  ({
    'left bottom': 'bottom left',
    'left middle': 'middle left',
    'left top': 'top left',
    'right bottom': 'bottom right',
    'right middle': 'middle right',
    'right top': 'top right',
  }[position] ?? position)

let tooltipCount = 0

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-tooltip',
  styleUrl: 'ld-tooltip.css',
  shadow: false,
})
export class LdTooltip {
  @Element() element: HTMLElement

  /** Show arrow */
  @Prop() arrow = false

  /** Delay in ms until tooltip hides (only when trigger type is 'hover') */
  @Prop() hideDelay = 0

  /** Delay in ms until tooltip shows (only when trigger type is 'hover') */
  @Prop() showDelay = 0

  /** Disable tooltip trigger */
  @Prop() disabled = false

  /** Position of the tooltip relative to the trigger element (also affects the arrow position) */
  @Prop() position: Position = 'top center'

  /** Event type that triggers the tooltip */
  @Prop() triggerType: 'click' | 'hover' = 'hover'

  @State() hasDefaultTrigger = true
  @State() visible = false

  private delayTimeout?: NodeJS.Timeout
  private id = `ld-tooltip-${++tooltipCount}`
  private popper?: Tether
  private tooltipRef!: HTMLDivElement
  private triggerRef!: HTMLSpanElement

  componentWillLoad() {
    applyPropAliases.call(this)
    this.hasDefaultTrigger = !this.element.querySelector('[slot="trigger"]')
  }

  private initTooltip = () => {
    const attachment = mapPositionToAttachment(this.position)
    const targetAttachment = mapPositionToTargetAttachment(this.position)

    this.popper = new Tether({
      attachment,
      classPrefix: 'ld-tether',
      constraints: [
        {
          attachment: 'together',
          to: 'window',
        },
      ],
      element: this.tooltipRef,
      target: this.triggerRef,
      targetAttachment,
    })
    this.visible = true
  }

  private hideTooltip = () => {
    this.popper.disable()
    this.visible = false
  }

  private showTooltip = () => {
    this.popper.enable()
    this.visible = true
  }

  private toggleTooltip = () => {
    if (this.popper == undefined) {
      return
    }

    if (this.visible) {
      this.hideTooltip()
    } else {
      this.showTooltip()
    }
  }

  private handleHideTrigger = (event: MouseEvent) => {
    if (this.triggerType === 'click' || this.disabled) {
      event.stopPropagation()
      return
    }

    clearTimeout(this.delayTimeout)

    if (this.popper) {
      this.delayTimeout = setTimeout(this.hideTooltip, this.hideDelay)
    }
  }

  private handleShowTrigger = (event: MouseEvent) => {
    if (this.triggerType === 'click' || this.disabled) {
      event.stopPropagation()
      return
    }

    clearTimeout(this.delayTimeout)

    if (this.popper === undefined) {
      this.delayTimeout = setTimeout(this.initTooltip, this.showDelay)
    } else {
      this.delayTimeout = setTimeout(this.showTooltip, this.showDelay)
    }
  }

  private handleToggleTrigger = (event: MouseEvent) => {
    if (this.triggerType === 'hover' || this.disabled) {
      event.stopPropagation()
      return
    }

    if (this.popper === undefined) {
      this.initTooltip()
    } else {
      this.toggleTooltip()
    }
  }

  // TODO: maybe this should listen only, if the tooltip was opened by click.
  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(event) {
    if (
      event.target.closest('ld-tooltip') !== this.element &&
      event.target.closest('.ld-tooltip') !== this.tooltipRef &&
      this.triggerType === 'click'
    ) {
      this.hideTooltip()
    }
  }

  // Mobile Safari in some cases does not react to click events on elements
  // which are not interactive. But it does to touch events.
  // TODO: maybe this should listen only, if the tooltip was opened by click.
  @Listen('touchend', {
    target: 'window',
    passive: true,
  })
  handleTouchOutside(event) {
    this.handleClickOutside(event)
  }

  render() {
    return (
      <Host>
        <button
          aria-describedby={this.id}
          class={getClassNames([
            'ld-tooltip__trigger',
            this.triggerType === 'click' && 'ld-tooltip__trigger--clickable',
          ])}
          onClick={this.handleToggleTrigger}
          onMouseEnter={this.handleShowTrigger}
          onFocus={this.handleShowTrigger}
          onMouseLeave={this.handleHideTrigger}
          onBlur={this.handleHideTrigger}
          ref={(element) => {
            this.triggerRef = element
          }}
          type="button"
        >
          <slot name="trigger">
            <ld-icon class="ld-tooltip__icon" name="info" size="sm" filled />
          </slot>
        </button>
        <div
          aria-hidden={this.visible ? 'false' : 'true'}
          class={getClassNames([
            'ld-tooltip',
            this.arrow && 'ld-tooltip--with-arrow',
            this.hasDefaultTrigger && 'ld-tooltip--with-default-trigger',
            this.triggerType === 'click' && 'ld-tooltip--interactive',
          ])}
          id={this.id}
          ref={(element) => {
            this.tooltipRef = element
          }}
          role="tooltip"
        >
          <slot />
        </div>
      </Host>
    )
  }
}
