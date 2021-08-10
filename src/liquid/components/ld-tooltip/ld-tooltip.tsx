import Tether from 'tether'
import { Component, h, Host, Prop } from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import '../../components' // type definitions for type checks and intelliSense

type Position =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'middle left'
  | 'middle right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'

const mapPositionToAttachment = (position: Position) =>
  ({
    'top left': 'bottom left',
    'top center': 'bottom center',
    'top right': 'bottom right',
    'middle left': 'middle right',
    'middle right': 'middle left',
    'bottom left': 'top left',
    'bottom center': 'top center',
    'bottom right': 'top right',
  }[position])

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
  /** Disables tooltip onClick handler */
  @Prop() disabled = false

  /** Position of the tooltip relative to the trigger element (also affects the arrow position). */
  @Prop() position: Position = 'top center'

  /** Visibility of the arrow */
  @Prop() arrow = false

  private popper?: Tether
  private tooltipRef!: HTMLDivElement
  private triggerRef!: HTMLSpanElement
  private visible = false

  private initTooltip() {
    this.popper = new Tether({
      attachment: mapPositionToAttachment(this.position),
      classPrefix: 'ld-tether',
      constraints: [
        {
          to: 'window',
          pin: true,
        },
      ],
      element: this.tooltipRef,
      offset: this.arrow ? '16px 0' : '8px 0',
      target: this.triggerRef,
      targetAttachment: this.position,
    })
  }

  private toggleTooltip() {
    if (this.popper == undefined) {
      return
    }

    if (this.visible) {
      this.popper.disable()
    } else {
      this.popper.enable()
    }
    this.visible = !this.visible
  }

  private handleTriggerClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation()
      return
    }

    if (this.popper === undefined) {
      this.initTooltip()
    }

    this.toggleTooltip()
  }

  render() {
    return (
      <Host>
        <span
          class="ld-tooltip__trigger"
          onClick={this.handleTriggerClick.bind(this)}
          ref={(element) => {
            this.triggerRef = element
          }}
        >
          <slot name="trigger">
            <ld-icon name="alarm" size="sm" />
          </slot>
        </span>
        <div
          ref={(element) => {
            this.tooltipRef = element
          }}
          class={getClassNames([
            'ld-tooltip',
            this.arrow && 'ld-tooltip--with-arrow',
          ])}
        >
          <slot />
        </div>
      </Host>
    )
  }
}
