import Tether from 'tether'
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'

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
 * @part icon - Default icon when no trigger is supplied
 * @part trigger - Trigger button
 * @part popper - Popper element (can only be styled as long as tooltip is not initialized)
 */
@Component({
  tag: 'ld-tooltip',
  styleUrl: 'ld-tooltip.shadow.css',
  shadow: true,
})
export class LdTooltip {
  @Element() element: HTMLElement

  private delayTimeout?: NodeJS.Timeout
  private idDescriber = `ld-tooltip-${++tooltipCount}`
  private popper?: Tether
  private tooltipRef!: HTMLElement
  private triggerRef!: HTMLSpanElement

  /** Show arrow */
  @Prop() arrow: boolean

  /** Disable tooltip trigger */
  @Prop() disabled: boolean

  /** Delay in ms until tooltip hides (only when trigger type is 'hover') */
  @Prop() hideDelay = 0

  /** Position of the tooltip relative to the trigger element (also affects the arrow position) */
  @Prop() position: Position = 'top center'

  /** Delay in ms until tooltip shows (only when trigger type is 'hover') */
  @Prop() showDelay = 0

  /** The tooltip size (effects tooltip padding only) */
  @Prop() size?: 'sm'

  /** The rendered HTML tag for the tooltip trigger. */
  @Prop() tag = 'button'

  /** Tether options object to be merged with the default options (optionally stringified). */
  @Prop() tetherOptions?: Partial<Tether.ITetherOptions> | string

  /** Event type that triggers the tooltip */
  @Prop() triggerType: 'click' | 'hover' = 'hover'

  @State() hasDefaultTrigger = true
  @State() visible = false

  @Watch('disabled')
  updatePopper(newDisabled: boolean) {
    if (newDisabled) {
      this.hideTooltip()
    }
  }

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

  private initTooltip = async () => {
    const attachment = this.mapPositionToAttachment(this.position)
    const targetAttachment = this.mapPositionToTargetAttachment(this.position)
    const tooltipContent = this.tooltipRef.querySelector('slot').assignedNodes()

    tooltipContent.forEach((node) => {
      this.tooltipRef.appendChild(node)
    })

    const customTetherOptions: Partial<Tether.ITetherOptions> =
      typeof this.tetherOptions === 'string'
        ? JSON.parse(this.tetherOptions)
        : this.tetherOptions
    const tetherOptions: Tether.ITetherOptions = {
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
      ...customTetherOptions,
    }

    this.popper = new Tether(tetherOptions)
    // Fixes a tether positioning bug
    this.popper.enable()
    this.popper.enable()
    this.popper.enable()
    this.popper.enable()
    this.visible = true
  }

  /** Hide tooltip */
  @Method()
  async hideTooltip() {
    clearTimeout(this.delayTimeout)
    this.popper?.disable()
    this.visible = false
  }

  /** Show tooltip */
  @Method()
  async showTooltip() {
    if (this.disabled) return

    clearTimeout(this.delayTimeout)
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

  private handleHideTrigger = () => {
    if (this.triggerType === 'click' || this.disabled) {
      return
    }

    clearTimeout(this.delayTimeout)

    if (this.popper) {
      this.delayTimeout = setTimeout(() => {
        this.hideTooltip()
      }, this.hideDelay)
    }
  }

  private handleShowTrigger = () => {
    if (this.triggerType === 'click' || this.disabled) {
      return
    }

    clearTimeout(this.delayTimeout)

    if (this.popper === undefined) {
      this.delayTimeout = setTimeout(this.initTooltip, this.showDelay)
    } else {
      this.delayTimeout = setTimeout(
        this.showTooltip.bind(this),
        this.showDelay
      )
    }
  }

  private handleToggleTrigger = () => {
    if (this.triggerType === 'hover' || this.disabled) {
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
    this.hasDefaultTrigger = !this.element.querySelector('[slot="trigger"]')
  }

  render() {
    const TriggerTag = this.tag

    return (
      <Host>
        <TriggerTag
          aria-describedby={this.idDescriber}
          class={getClassNames([
            'ld-tooltip__trigger',
            this.triggerType === 'click' && 'ld-tooltip__trigger--clickable',
          ])}
          onClick={this.handleToggleTrigger}
          onMouseEnter={this.handleShowTrigger}
          onFocus={this.handleShowTrigger}
          onMouseLeave={this.handleHideTrigger}
          onBlur={this.handleHideTrigger}
          part="trigger focusable"
          ref={(element) => {
            this.triggerRef = element
          }}
          type="button"
        >
          <ld-sr-only>Info</ld-sr-only>
          <slot name="trigger">
            <svg
              class="ld-tooltip__icon"
              fill="none"
              part="icon"
              viewBox="0 0 24 24"
            >
              <path
                clip-rule="evenodd"
                d="M12 23C18.0751 23 23 18.0751 23 12C23 5.9249 18.0751 1 12 1C5.9249 1 1 5.9249 1 12C1 18.0751 5.9249 23 12 23Z"
                fill-rule="evenodd"
                fill="currentColor"
              />
              <path
                clip-rule="evenodd"
                d="M11.9996 8.6477C12.9254 8.6477 13.6758 7.8973 13.6758 6.9715C13.6758 6.0458 12.9254 5.2953 11.9996 5.2953C11.0739 5.2953 10.3235 6.0458 10.3235 6.9715C10.3235 7.8973 11.0739 8.6477 11.9996 8.6477ZM10.8453 17.8038C11.1932 18.1517 11.6736 18.3256 12.2865 18.3256H13.4545C13.6864 18.3256 13.8023 18.2263 13.8023 18.0275V12.2873C13.8023 11.6744 13.6284 11.1939 13.2805 10.8461C12.9326 10.4982 12.4522 10.3242 11.8393 10.3242H10.6713C10.4394 10.3242 10.3235 10.4236 10.3235 10.6224V16.3626C10.3235 16.9755 10.4974 17.456 10.8453 17.8038Z"
                fill-rule="evenodd"
                // TODO: replace color with icon-specific custom property and use ld-icon
                fill="var(--ld-col-wht)"
              />
            </svg>
          </slot>
        </TriggerTag>
        <ld-tooltip-popper
          aria-hidden={this.visible ? undefined : 'true'}
          arrow={this.arrow}
          hasDefaultTrigger={this.hasDefaultTrigger}
          id={this.idDescriber}
          part="popper"
          size={this.size}
          ref={(element: HTMLElement) => {
            this.tooltipRef = element
          }}
          triggerType={this.triggerType}
        >
          <slot />
        </ld-tooltip-popper>
      </Host>
    )
  }
}
