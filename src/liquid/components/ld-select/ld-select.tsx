import '../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import Tether from 'tether'
import { makeInert, unmakeInert } from '../../utils/makeInert'
import { LdOption } from '../ld-option/ld-option'

/**
 * @slot select - the select trigger slot
 * @slot popper - the select popper slot
 */
@Component({
  tag: 'ld-select',
  styleUrl: 'ld-select.css',
  shadow: false,
})
export class LdSelect {
  @Element() el: HTMLElement

  private selectRef!: HTMLElement
  private triggerRef!: HTMLElement
  private popperRef!: HTMLElement
  private scrollContainerRef!: HTMLElement
  private popper: Tether
  private observer: MutationObserver

  /** Multiselect mode. */
  @Prop() multiple = false

  /**
   * Used as trigger button label in multiselect mode
   * and in single select mode if nothing is selected.
   */
  @Prop() placeholder: string

  /** Used to specify the name of the control. */
  @Prop() name: string

  @State() expanded = false

  @State() selected: LdOption[] = []

  @State() themeCl: string

  @Watch('expanded')
  updateInert() {
    if (this.expanded) {
      unmakeInert(this.popperRef)
    } else {
      makeInert(this.popperRef)
    }
  }

  private updatePopperWidth() {
    this.popperRef.style.setProperty(
      'width',
      `${this.selectRef.getBoundingClientRect().width}px`
    )
  }

  private updatePopperTheme() {
    const themeEl = this.el.closest('[class*="ld-theme-"]')
    if (!themeEl) return

    this.themeCl = Array.from(themeEl.classList).find(
      (cl) => cl.indexOf('ld-theme-') === 0
    )
  }

  private updatePopper() {
    this.popper.position()
    this.updatePopperWidth()
    this.updatePopperTheme()
  }

  private initPopper() {
    this.popper = new Tether({
      element: this.popperRef,
      target: this.selectRef,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      constraints: [
        {
          to: 'window',
          // attachment: 'together none', // Enables flipping on scroll.
          pin: true,
        },
      ],
    })

    this.popperRef.classList.add('ld-select__popper--initialized')
  }

  private initOptions() {
    const children = this.scrollContainerRef.children
    if (!children.length) {
      throw new TypeError(
        `ld-select requires at least one ld-option element as a child, but found none.`
      )
    }

    const childrenArr = Array.from(children)
    childrenArr.forEach((child) => {
      const tag = child.tagName.toLowerCase()
      if (tag !== 'ld-option') {
        throw new TypeError(
          `ld-select accepts only ld-option elements as children, but found a "${tag}" element.`
        )
      }
    })

    setTimeout(() => {
      this.selected = ((childrenArr as unknown[]) as LdOption[]).filter(
        (child) => child.selected
      )
    })
  }

  private togglePopper() {
    this.expanded = !this.expanded

    if (this.expanded) {
      this.popper.enable()
      this.updatePopper()
    } else {
      this.popper.disable()
      this.triggerRef.focus()
    }
  }

  private handleSlotChange() {
    this.initOptions()
    this.updateInert()
  }

  private clearSelection() {
    Array.from(this.popperRef.querySelectorAll('ld-option')).forEach(
      (option) => {
        option.selected = false
      }
    )
    this.selected = []
  }

  @Listen('resize', { target: 'window', passive: true })
  handleWindowResize() {
    this.updatePopperWidth()
  }

  @Listen('ldOptionSelect', { target: 'window', passive: true })
  handleSelect(ev: CustomEvent<boolean>) {
    if (
      (ev.target as HTMLElement).closest('[role="listbox"]') !== this.popperRef
    ) {
      return
    }

    if (!this.multiple) {
      // Deselect currently selected option, if it's not the target option.
      Array.from(this.popperRef.querySelectorAll('ld-option')).forEach(
        (option) => {
          if (option !== (ev.target as HTMLElement).closest('ld-option')) {
            option.selected = false
          }
        }
      )
      this.togglePopper()
    }
    this.initOptions()
  }

  private expandAndFocus() {
    this.handleTriggerClick()
    setTimeout(() => {
      // If selected in single select mode, focus selected
      let optionToFocus
      if (!this.multiple) {
        optionToFocus = this.popperRef.querySelector(
          'ld-option[aria-selected="true"]'
        )
      }
      if (!optionToFocus) {
        optionToFocus = this.triggerRef
      }
      optionToFocus.focus()
    })
  }

  private handleHome(ev) {
    // Move focus to the first option.
    if (this.expanded) {
      ev.preventDefault()
      if (
        this.popperRef.classList.contains('tether-target-attached-top') ||
        this.popperRef.classList.contains('tether-pinned-bottom')
      ) {
        this.popperRef.querySelector('ld-option')?.focus()
      } else {
        this.triggerRef.focus()
      }
    }
  }

  private handleEnd(ev) {
    // Move focus to the last option.
    if (this.expanded) {
      ev.preventDefault()
      if (
        this.popperRef.classList.contains('tether-target-attached-top') ||
        this.popperRef.classList.contains('tether-pinned-bottom')
      ) {
        this.triggerRef.focus()
      } else {
        const options = this.popperRef.querySelectorAll('ld-option')
        options[options.length - 1]?.focus()
      }
    }
  }

  @Listen('keydown', { passive: false, target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (
      document.activeElement.closest('[role="listbox"]') !== this.popperRef &&
      document.activeElement.closest('ld-select') !== this.el
    ) {
      return
    }

    switch (ev.key) {
      case 'ArrowDown': {
        // Move focus to the next option.
        ev.preventDefault()
        if (this.expanded) {
          if (ev.metaKey) {
            this.handleEnd(ev)
            return
          }

          if (
            document.activeElement.nextElementSibling &&
            document.activeElement.nextElementSibling.classList.contains(
              'ld-option'
            )
          ) {
            ;(document.activeElement.nextElementSibling as HTMLElement)?.focus()
          } else {
            if (
              this.popperRef.classList.contains('tether-target-attached-top') ||
              this.popperRef.classList.contains('tether-pinned-bottom')
            ) {
              this.triggerRef.focus()
            } else if (document.activeElement === this.triggerRef) {
              this.popperRef.querySelector('ld-option')?.focus()
            }
          }
        } else {
          this.expandAndFocus()
        }
        break
      }
      case 'ArrowUp':
        // Move focus to the previous option.
        ev.preventDefault()
        if (this.expanded) {
          if (ev.metaKey) {
            this.handleHome(ev)
            return
          }

          if (
            document.activeElement.previousElementSibling &&
            document.activeElement.previousElementSibling.classList.contains(
              'ld-option'
            )
          ) {
            ;(document.activeElement
              .previousElementSibling as HTMLElement)?.focus()
          } else {
            if (
              this.popperRef.classList.contains('tether-target-attached-top') ||
              this.popperRef.classList.contains('tether-pinned-bottom')
            ) {
              if (document.activeElement === this.triggerRef) {
                const options = this.popperRef.querySelectorAll('ld-option')
                options[options.length - 1]?.focus()
              }
            } else {
              this.triggerRef.focus()
            }
          }
        } else {
          this.expandAndFocus()
        }
        break
      case 'Home':
        this.handleHome(ev)
        break
      case 'End':
        this.handleEnd(ev)
        break
      case ' ':
        // If expanded: Select focused option, close (if single select).
        // If not expanded: Toggle popper.
        ev.preventDefault()
        ev.stopImmediatePropagation()
        if (this.expanded) {
          if (document.activeElement === this.triggerRef) {
            this.handleTriggerClick()
          }
        } else {
          this.handleTriggerClick()
          setTimeout(() => {
            // If selected in single select mode, focus selected
            let optionToFocus
            if (!this.multiple) {
              optionToFocus = this.popperRef.querySelector(
                'ld-option[aria-selected="true"]'
              )
              if (!optionToFocus) {
                optionToFocus = this.popperRef.querySelector('ld-option')
              }
            } else {
              optionToFocus = this.triggerRef
            }
            if (optionToFocus) optionToFocus.focus()
          })
        }
        break
      case 'Enter':
        // If expanded and trigger element is focused: Toggle popper.
        ev.preventDefault()
        if (this.expanded && document.activeElement === this.triggerRef) {
          this.togglePopper()
        }
        break
      case 'Escape':
        // If expanded: Toggle popper.
        if (this.expanded) {
          ev.preventDefault()
          ev.stopImmediatePropagation()
          this.togglePopper()
        }
        break
      case 'Tab': // Also covers Shift+Tab
        // If expanded: Prevent default.
        if (this.expanded) {
          ev.preventDefault()
          ev.stopImmediatePropagation()
        }
        break
      case '-':
        // Clear selection.
        ev.preventDefault()
        ev.stopImmediatePropagation()
        this.clearSelection()
        this.triggerRef.focus()
        break
    }

    // TODO: implement type-ahead
    // Type a character: focus moves to the next item with a name that starts with the typed character.
    // Type multiple characters in rapid succession: focus moves to the next item with a name that starts
    // with the string of characters typed.
  }

  @Listen('click', {
    target: 'window',
    passive: true,
  })
  handleClickOutside(ev) {
    if (
      ev.target.closest('ld-select') !== this.el &&
      ev.target.closest('[role="listbox"]') !== this.popperRef
    ) {
      this.expanded = false
    }
  }

  // Mobile Safari in some cases does not react to click events on elements
  // which are not interactive. But it does to touch events.
  @Listen('touchend', {
    target: 'window',
    passive: true,
  })
  handleTouchOutside(ev) {
    this.handleClickOutside(ev)
  }

  private handleTriggerClick(ev?: Event) {
    if (!this.popper) this.initPopper()

    if (ev) ev.preventDefault()
    this.togglePopper()
  }

  componentDidLoad() {
    this.initOptions()
    this.updateInert()

    this.observer = new MutationObserver(this.handleSlotChange.bind(this))
    this.observer.observe(this.popperRef, {
      subtree: true,
      childList: true,
    })
  }

  disconnectedCallback() {
    if (this.popper) this.popper.destroy()
    if (this.observer) this.observer.disconnect()
  }

  render() {
    let cl = 'ld-select'
    if (this.expanded) cl += ' ld-select--expanded'

    let popperCl = 'ld-select__popper'
    if (this.expanded) popperCl += ' ld-select__popper--expanded'
    if (this.themeCl) popperCl += ` ${this.themeCl}`

    let triggerIconCl = 'ld-select__btn-trigger-icon'
    if (this.expanded) triggerIconCl += ' ld-select__btn-trigger-icon--rotated'

    const triggerText = this.multiple
      ? this.placeholder
      : ((this.selected[0] as unknown) as HTMLElement)?.textContent ||
        this.placeholder

    return (
      <Host class={cl}>
        <div
          class="ld-select__select"
          ref={(el) => (this.selectRef = el as HTMLElement)}
        >
          <button
            onClick={this.handleTriggerClick.bind(this)}
            class="ld-select__btn-trigger"
            aria-haspopup="listbox"
            aria-expanded={this.expanded ? 'true' : 'false'}
            ref={(el) => (this.triggerRef = el as HTMLElement)}
          >
            <span class="ld-select__btn-trigger-text" title={triggerText}>
              {triggerText}
            </span>
            <svg
              class={triggerIconCl}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M3 6l5 4 5-4"
              />
            </svg>
          </button>
        </div>
        <div
          role="listbox"
          class={popperCl}
          ref={(el) => (this.popperRef = el as HTMLElement)}
        >
          <div
            ref={(el) => (this.scrollContainerRef = el as HTMLElement)}
            class="ld-select__scroll-container"
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    )
  }
}
