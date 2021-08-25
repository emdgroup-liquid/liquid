import Tether from 'tether'
import { Component, Element, h, Host, Listen, Prop, State } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import '../../components' // type definitions for type checks and intelliSense
import { applyPropAliases } from '../../utils/applyPropAliases'

export type Position =
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

  private mapPositionToAttachment = (position: Position) => {
    return {
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
    }[position]
  }

  private mapPositionToTargetAttachment = (position: Position) => {
    return (
      {
        'left bottom': 'bottom left',
        'left middle': 'middle left',
        'left top': 'top left',
        'right bottom': 'bottom right',
        'right middle': 'middle right',
        'right top': 'top right',
      }[position] ?? position
    )
  }

  private initTooltip = () => {
    const attachment = this.mapPositionToAttachment(this.position)
    const targetAttachment = this.mapPositionToTargetAttachment(this.position)

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
      this.popper &&
      this.triggerType === 'click' &&
      event.target.closest('ld-tooltip') !== this.element &&
      event.target.closest('.ld-tooltip') !== this.tooltipRef
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

  componentWillLoad() {
    applyPropAliases.call(this)
    this.hasDefaultTrigger = !this.element.querySelector('[slot="trigger"]')
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
            <svg
              class="ld-tooltip__icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.9249 18.0751 1 12 1C5.9249 1 1 5.9249 1 12C1 18.0751 5.9249 23 12 23Z"
                fill="currentcolor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.9996 8.6477C12.9254 8.6477 13.6758 7.8973 13.6758 6.9715C13.6758 6.0458 12.9254 5.2953 11.9996 5.2953C11.0739 5.2953 10.3235 6.0458 10.3235 6.9715C10.3235 7.8973 11.0739 8.6477 11.9996 8.6477ZM10.8453 17.8038C11.1932 18.1517 11.6736 18.3256 12.2865 18.3256H13.4545C13.6864 18.3256 13.8023 18.2263 13.8023 18.0275V12.2873C13.8023 11.6744 13.6284 11.1939 13.2805 10.8461C12.9326 10.4982 12.4522 10.3242 11.8393 10.3242H10.6713C10.4394 10.3242 10.3235 10.4236 10.3235 10.6224V16.3626C10.3235 16.9755 10.4974 17.456 10.8453 17.8038Z"
                fill="white"
              />
            </svg>
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
