import Tether from 'tether'
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { focusableSelector, isInnerFocusable } from '../../utils/focus'
import { isElement, isSlot } from '../../utils/type-checking'

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

const mapPositionToAttachment = (position: Position) => {
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

const mapPositionToTargetAttachment = (position: Position) => {
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

const copySlottedNodes = (node: Node) => {
  // text node
  if (!isElement(node)) {
    return
  }

  node.querySelectorAll('slot').forEach((slot) => {
    slot.assignedNodes().forEach((childNode) => {
      copySlottedNodes(childNode)
      slot.parentElement.insertBefore(childNode, slot)
    })
    slot.remove()
  })
}

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part content - `span` element wrapping the default slot
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
  @Element() el: HTMLElement

  private contentRef!: HTMLSpanElement
  private delayTimeout?: NodeJS.Timeout
  private idDescriber = `ld-tooltip-${++tooltipCount}`
  private observer: MutationObserver
  private popper?: Tether
  private tooltipRef!: HTMLElement
  private triggerRef!: HTMLSpanElement
  private isObserverEnabled = true

  /** Show arrow */
  @Prop() arrow?: boolean

  /** Disable tooltip trigger */
  @Prop() disabled?: boolean

  /** Delay in ms until tooltip hides (only when trigger type is 'hover') */
  @Prop() hideDelay? = 0

  /** Position of the tooltip relative to the trigger element (also affects the arrow position) */
  @Prop() position?: Position = 'top center'

  /**
   * Do not apply code that triggers screenreaders when tooltip opens.
   * @internal
   */
  @Prop() preventScreenreader? = false

  /**
   * Use to right-click.
   * @internal
   */
  @Prop() rightClick? = false

  /** Delay in ms until tooltip shows (only when trigger type is 'hover') */
  @Prop() showDelay? = 0

  /** The tooltip size (effects tooltip padding only) */
  @Prop() size?: 'sm'

  /**
   * Render the tooltip without visual styling.
   * @internal
   */
  @Prop() unstyled?: HTMLLdTooltipPopperElement['unstyled']

  /** The rendered HTML tag for the tooltip trigger. */
  @Prop() tag? = 'button'

  /** Tether options object to be merged with the default options (optionally stringified). */
  @Prop() tetherOptions?: Partial<Tether.ITetherOptions> | string

  /** Event type that triggers the tooltip */
  @Prop() triggerType?: 'click' | 'hover' = 'hover'

  /** Emitted when the tooltip is opened. */
  @Event() ldtooltipopen: EventEmitter

  /** Emitted when the tooltip is closed. */
  @Event() ldtooltipclose: EventEmitter

  @State() hasDefaultTrigger = true
  @State() triggerTabIndex?: number
  @State() visible = false

  @Watch('disabled')
  updatePopper(newDisabled: boolean) {
    if (newDisabled) {
      this.hideTooltip()
    }
  }

  private syncContent = () => {
    this.isObserverEnabled = false

    // Grab the new content in the slot.
    const tooltipContent = this.contentRef.querySelector('slot').assignedNodes()

    // Delete old content in popper element. Using textContent
    // is faster than innerHTML as no HTML parsers needs to be
    // invoked. Instead, this immediately replaces all children
    // of the tooltip ref with a single #text node.
    this.tooltipRef.textContent = ''

    // Move original nodes to popper element,
    // including all event listeners!
    tooltipContent.forEach((node) => {
      copySlottedNodes(node)
      this.tooltipRef.appendChild(node)
    })

    // The timeout is required. Without the setTimeout,
    // there is a possibility that the observer could be
    // re-enabled immediately after the content synchronization
    // code has been executed, but before the DOM modifications
    // have been fully processed. This could result in the
    // observer detecting incomplete or inconsistent changes,
    // leading to unexpected behavior.
    setTimeout(() => {
      this.isObserverEnabled = true
    })
  }

  private initTooltip = async () => {
    const attachment = mapPositionToAttachment(this.position)
    const targetAttachment = mapPositionToTargetAttachment(this.position)

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
    await this.showTooltip()
  }

  /** Get the `ld-tooltip-popper` element. */
  @Method()
  async getTooltip() {
    return this.tooltipRef
  }

  /** Hide tooltip */
  @Method()
  async hideTooltip() {
    clearTimeout(this.delayTimeout)
    this.popper?.disable()
    this.visible = false
    this.ldtooltipclose.emit()
  }

  /** Show tooltip */
  @Method()
  async showTooltip() {
    if (this.disabled) return

    if (!this.popper) {
      await this.initTooltip()
      return
    }

    clearTimeout(this.delayTimeout)
    this.popper.enable()
    this.visible = true
    this.ldtooltipopen.emit()
  }

  /** @internal */
  @Method()
  async handleContextMenu(ev) {
    if (!this.rightClick || this.disabled) return

    ev.preventDefault()
    this.toggleTooltip()
  }

  private toggleTooltip = () => {
    if (!this.popper) {
      this.initTooltip()
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

  private handleClick = () => {
    if (this.rightClick || this.triggerType === 'hover' || this.disabled) {
      return
    }

    this.toggleTooltip()
  }

  // TODO: maybe this should listen only, if the tooltip was opened by click.
  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(ev: MouseEvent) {
    if (
      this.visible &&
      this.triggerType === 'click' &&
      ev.isTrusted &&
      !ev.composedPath().includes(this.el) &&
      !ev.composedPath().includes(this.tooltipRef)
    ) {
      this.hideTooltip()
    }
  }

  // This listener is required for tooltips which open via right click.
  // It makes sure that tooltips opened via right click get closed again
  // if another tooltip gets open via right click. Since a right click
  // is not a left click, the click outside handler, which otherwise would
  // close the tooltip, is not sufficient.
  @Listen('ldtooltipopen', {
    target: 'window',
  })
  handleContextMenuOutside(ev: CustomEvent) {
    if (
      this.visible &&
      !ev.composedPath().includes(this.el) &&
      !ev.composedPath().includes(this.tooltipRef)
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
  handleTouchOutside(ev) {
    this.handleClickOutside(ev)
  }

  @Listen('ldclosetooltip', {
    target: 'window',
    passive: true,
  })
  handleCloseTooltip(ev) {
    if (ev.composedPath().includes(this.tooltipRef)) {
      this.hideTooltip()
    }
  }

  private handleSlotChange = () => {
    if (!this.isObserverEnabled) return

    // Remove all content from the popper element except for the tether-element-marker.
    this.tooltipRef.childNodes.forEach((node) => {
      if (
        isElement(node) &&
        node.classList.contains('ld-tether-element-marker')
      ) {
        return
      }

      node.remove()
    })

    // Put all content from the slot in the popper element.
    this.syncContent()
  }

  private initObserver = () => {
    this.observer = new MutationObserver(this.handleSlotChange)
    this.observer.observe(this.el, {
      subtree: true,
      childList: true,
      attributes: false,
    })
  }

  private findFirstSlottedTrigger = () => {
    let triggerInSlot = this.el.querySelector('[slot="trigger"]')

    while (triggerInSlot && isSlot(triggerInSlot)) {
      triggerInSlot = triggerInSlot.assignedElements()[0]
    }

    return triggerInSlot as HTMLElement
  }

  componentWillLoad() {
    const triggerInSlot = this.findFirstSlottedTrigger()
    this.hasDefaultTrigger = !triggerInSlot

    if (
      triggerInSlot &&
      (triggerInSlot.matches(focusableSelector) ||
        isInnerFocusable(triggerInSlot))
    ) {
      this.triggerTabIndex = -1
    }

    this.el.addEventListener('focus', this.handleShowTrigger, true)
    this.el.addEventListener('blur', this.handleHideTrigger, true)
  }

  componentDidLoad() {
    setTimeout(() => {
      this.syncContent()
      this.initObserver()
    })
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.observer) this.observer.disconnect()
    /* istanbul ignore if */
    if (this.popper) this.popper.destroy()
    /* istanbul ignore if */
    if (this.tooltipRef) this.tooltipRef.remove()
  }

  render() {
    const TriggerTag = this.tag

    return (
      <Host>
        <TriggerTag
          aria-describedby={
            this.preventScreenreader ? undefined : this.idDescriber
          }
          class={getClassNames([
            'ld-tooltip__trigger',
            this.triggerType === 'click' && 'ld-tooltip__trigger--clickable',
          ])}
          onClick={this.handleClick}
          onContextMenu={this.handleContextMenu.bind(this)}
          onMouseEnter={this.handleShowTrigger}
          onMouseLeave={this.handleHideTrigger}
          part="trigger focusable"
          ref={(element) => {
            this.triggerRef = element
          }}
          tabIndex={this.triggerTabIndex}
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
        <span
          class="ld-tooltip__content"
          part="content"
          ref={(element: HTMLSpanElement) => (this.contentRef = element)}
        >
          <slot />
        </span>
        <ld-tooltip-popper
          aria-hidden={this.visible ? undefined : 'true'}
          arrow={this.arrow}
          hasDefaultTrigger={this.hasDefaultTrigger}
          id={this.preventScreenreader ? undefined : this.idDescriber}
          unstyled={this.unstyled}
          part="popper"
          ref={(element: HTMLElement) => {
            this.tooltipRef = element
          }}
          rightClick={this.rightClick}
          size={this.size}
          triggerType={this.triggerType}
        />
      </Host>
    )
  }
}
