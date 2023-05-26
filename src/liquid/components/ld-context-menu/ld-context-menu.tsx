import {
  Component,
  Element,
  h,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { isHtmlElement } from '../../utils/type-checking'
import { isInnerFocusable } from '../../utils/focus'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part menu - `ld-menu` element wrapping the default slot
 * @part tooltip - `ld-tooltip` element
 */
@Component({
  tag: 'ld-context-menu',
  styleUrl: 'ld-context-menu.shadow.css',
  shadow: true,
})
export class LdContextMenu {
  @Element() el: HTMLLdContextMenuElement
  private menuRef: HTMLLdMenuElement
  private tooltipRef: HTMLLdTooltipElement
  private triggerSlotRef: HTMLSlotElement

  /** Position of the context menu relative to the trigger element. */
  @Prop() position?: HTMLLdTooltipElement['position'] = 'bottom left'

  /** Size of the context menu. */
  @Prop() size?: 'sm' | 'lg'

  /** Tether options object to be merged with the default options (optionally stringified). */
  @Prop() tetherOptions?: Partial<Tether.ITetherOptions> | string

  @State() initialized = false

  private resetFocus = async () => {
    const [trigger] = this.triggerSlotRef.assignedElements()

    if (isInnerFocusable(trigger)) {
      await trigger.focusInner()
      return
    }

    if (isHtmlElement(trigger)) {
      trigger.focus()
    }
  }

  private handleKeyDown = async (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault()
        await this.tooltipRef.hideTooltip()
        break
      case 'Tab':
        event.preventDefault()
    }
  }

  private handleMenuOpen = async () => {
    const tooltip = await this.tooltipRef.getTooltip()
    const menuInTooltip = tooltip.querySelector('ld-menu')

    if (!this.initialized) {
      menuInTooltip.addEventListener('keydown', this.handleKeyDown)
      this.initialized = true
    }
    const firstMenuItem = await menuInTooltip.getFirstMenuItem()

    if (!firstMenuItem) {
      return
    }

    await firstMenuItem.focusInner()
  }

  /** Show context menu */
  @Method()
  async showContextMenu() {
    await this.tooltipRef.showTooltip()
  }

  /** Hide context menu */
  @Method()
  async hideContextMenu() {
    await this.tooltipRef.hideTooltip()
  }

  @Watch('size')
  private updateSize() {
    if (this.size) {
      this.menuRef.setAttribute('size', this.size)
    } else {
      this.menuRef.removeAttribute('size')
    }
  }

  componentDidLoad() {
    const style = this.el.getAttribute('style')

    this.updateSize()

    if (style) {
      this.menuRef.setAttribute('style', style)
      this.el.removeAttribute('style')
    }

    this.triggerSlotRef
      .assignedElements()
      .forEach((element) => (element.ariaHasPopup = 'menu'))
  }

  render() {
    return (
      <ld-tooltip
        onLdtooltipclose={this.resetFocus}
        onLdtooltipopen={this.handleMenuOpen}
        ref={(element: HTMLLdTooltipElement) => (this.tooltipRef = element)}
        part="tooltip"
        position={this.position}
        preventScreenreader
        tag="span"
        tetherOptions={this.tetherOptions}
        triggerType="click"
        unstyled
      >
        <slot
          name="trigger"
          ref={(element: HTMLSlotElement) => (this.triggerSlotRef = element)}
          slot="trigger"
        />
        <ld-menu
          part="menu"
          ref={(el: HTMLLdMenuElement) => (this.menuRef = el)}
        >
          <slot />
        </ld-menu>
      </ld-tooltip>
    )
  }
}
