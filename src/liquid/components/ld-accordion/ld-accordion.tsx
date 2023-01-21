import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
} from '@stencil/core'
import { getClassNames } from '../../utils/getClassNames'
import { getScrollParent } from '../../utils/scroll'

/**
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-accordion',
  styleUrl: 'ld-accordion.shadow.css',
  shadow: true,
})
export class LdAccordion {
  @Element() el: HTMLElement

  private scrollIntoViewOnTransitionEnd = false

  // `onBrandColor` is not possible, as Stencil expects `on*` props to be events.
  /** Style the accordion so that it looks good on the primary color of the current theme. */
  @Prop() brandColor?: boolean

  /** Sets a small gap between each accordion section. */
  @Prop() detached = false

  /** Applies rounded corners. */
  @Prop() rounded = false

  /** When set to true, an open accordion element closes, if anthorer one opens. */
  @Prop() single = false

  /**
   * Use `'dark'` on white backgrounds. Default is a light tone.
   * Takes only effect in conjunction with neutral mode.
   */
  @Prop() tone?: 'dark'

  // The following event is not used within the ld-accordion component itself.
  // Its only purpose is to create a type definition on the ld-accordion component,
  // in order to be able to add an inline listener in TSX, for listening
  // on the event bubling up from ld-accordion-section components.
  /** Emitted on expansion and collapse of an accordion section element. */
  @Event() ldaccordionchange: EventEmitter<boolean>

  @Listen('ldaccordionchange', { passive: true })
  handleAccordionExpandChange(ev) {
    if (ev.target.tagName !== 'LD-ACCORDION-SECTION') return

    // In single mode, close sibling sections of open section.
    if (this.single && ev.target.expanded) {
      const siblings = [...ev.target.parentElement.children].filter(
        (section) => section !== ev.target
      )
      siblings.forEach((section) => {
        section.expanded = false
      })
    }

    if (ev.detail /* expanded */) {
      this.scrollIntoView(ev.target)
    }
  }

  private scrollIntoView = (section: HTMLLdAccordionSectionElement) => {
    const scrollParent = getScrollParent(section)

    const toggle = section.querySelector('ld-accordion-toggle')
    const panel = section.querySelector('ld-accordion-panel')

    // singleModeDelta is the height of the currently open panel, that needs
    // to be subtracted from the scroll amount in single mode.
    const allSections = Array.from(section.parentElement.children)
    const singleModeDelta =
      this.single && !this.scrollIntoViewOnTransitionEnd
        ? allSections
            .slice(
              0,
              allSections.findIndex((sec) => sec === section)
            )
            .find((sec) =>
              sec.classList.contains('ld-accordion-section--expanded')
            )?.children[1].scrollHeight || 0
        : 0

    const panelOffsetToScrollParent =
      scrollParent.scrollTop +
      panel.getBoundingClientRect().top -
      Math.max(0, scrollParent.getBoundingClientRect().top)

    const scrollPaddingTop =
      parseFloat(window.getComputedStyle(scrollParent)['scrollPaddingTop']) || 0

    // targetOffsetBottom is the distance from the scrollParent top to the
    // bottom of the section that is being expanded in its expanded state.
    const targetOffsetBottom =
      panelOffsetToScrollParent +
      Math.min(
        panel.scrollHeight,
        scrollParent.clientHeight - toggle.clientHeight - scrollPaddingTop
      ) -
      singleModeDelta

    // If an accordion section expands at the bottom end of the accordion
    // The scroll container may not have a sufficient height at that time
    // in order to be scrollable to the target offset. In this case we
    // postpone the scrolling to the transition end event.
    if (
      !this.scrollIntoViewOnTransitionEnd &&
      scrollParent.scrollHeight < targetOffsetBottom
    ) {
      this.scrollIntoViewOnTransitionEnd = true
      return
    }

    if (
      !this.el.closest('ld-accordion-panel') &&
      scrollParent.clientHeight + scrollParent.scrollTop < targetOffsetBottom
    ) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      scrollParent.scrollTo({
        top: targetOffsetBottom - scrollParent.clientHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
  }

  private focusToggle = (
    currentToggle: HTMLLdAccordionToggleElement,
    dir: 'prev' | 'next'
  ) => {
    const toggleToFocus = (
      dir === 'prev'
        ? currentToggle.parentElement.previousElementSibling
        : currentToggle.parentElement.nextElementSibling
    )?.querySelector('ld-accordion-toggle')
    if (toggleToFocus) {
      toggleToFocus.focusInner()
    }
  }

  private onKeydown = (ev) => {
    if (ev.target.tagName !== 'LD-ACCORDION-TOGGLE') {
      return
    }

    switch (ev.key) {
      case 'ArrowUp': {
        ev.preventDefault()
        this.focusToggle(ev.target, 'prev')
        return
      }
      case 'ArrowDown': {
        ev.preventDefault()
        this.focusToggle(ev.target, 'next')
        return
      }
    }
  }

  private onTransitionEnd = (ev: TransitionEvent) => {
    const target = ev.target as HTMLElement
    if (
      !this.scrollIntoViewOnTransitionEnd ||
      target.tagName !== 'LD-ACCORDION-PANEL' ||
      target.closest('ld-accordion') !== this.el ||
      !target.closest('ld-accordion-section').expanded
    ) {
      return
    }

    this.scrollIntoView(target.closest('ld-accordion-section'))
    this.scrollIntoViewOnTransitionEnd = false
  }

  render() {
    const cl = getClassNames([
      'ld-accordion',
      this.detached && 'ld-accordion--detached',
      this.brandColor && 'ld-accordion--brand-color',
      !this.brandColor && this.tone && `ld-accordion--${this.tone}`,
      this.rounded && 'ld-accordion--rounded',
    ])

    return (
      <Host
        class={cl}
        onKeydown={this.onKeydown}
        onTransitionEnd={this.onTransitionEnd}
      >
        <slot></slot>
      </Host>
    )
  }
}
