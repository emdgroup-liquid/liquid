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
import type {
  Instance as PopperInstance,
  StrictModifiers,
} from '@popperjs/core'
import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js'
import flip from '@popperjs/core/lib/modifiers/flip.js'
// import offset from '@popperjs/core/lib/modifiers/offset.js'
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
  private popper: PopperInstance
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

  private updatePopper() {
    // offset.options = { offset: [0, -21] }
    this.popper.update()
    this.updatePopperWidth()
  }

  private initPopper() {
    this.popper = createPopper<StrictModifiers>(
      this.selectRef,
      this.popperRef,
      {
        modifiers: [preventOverflow, flip /*, offset*/],
        placement: 'bottom-start',
      }
    )
    this.popperRef.classList.add('ld-select__popper--initialized')
  }

  private initOptions() {
    const children = this.popperRef.children
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
    console.info('toggle popper')
    this.expanded = !this.expanded

    if (this.expanded) {
      this.updatePopper()
    } else {
      this.triggerRef.focus()
    }
  }

  private handleSlotChange() {
    this.initOptions()
    this.updateInert()
  }

  @Listen('resize', { target: 'window', passive: true })
  handleWindowResize() {
    this.updatePopperWidth()
  }

  @Listen('ldOptionSelect', { passive: true })
  handleSelect(ev: CustomEvent<boolean>) {
    if (!this.multiple) {
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

  private handleKeyDown(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'ArrowDown': {
        // Move focus to the next option.
        ev.preventDefault()
        if (this.expanded) {
          if (document.activeElement.nextElementSibling) {
            ;(document.activeElement.nextElementSibling as HTMLElement)?.focus()
          } else {
            if (this.popperRef.dataset.popperPlacement.includes('top')) {
              this.triggerRef.focus()
            } else if (document.activeElement === this.triggerRef) {
              this.popperRef.querySelector('ld-option')?.focus()
            }
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
            }
            if (!optionToFocus) {
              optionToFocus = this.triggerRef
            }
            optionToFocus.focus()
          })
        }
        break
      }
      case 'ArrowUp':
        // Move focus to the previous option.
        ev.preventDefault()
        if (this.expanded) {
          if (document.activeElement.previousElementSibling) {
            ;(document.activeElement
              .previousElementSibling as HTMLElement)?.focus()
          } else {
            if (this.popperRef.dataset.popperPlacement.includes('top')) {
              if (document.activeElement === this.triggerRef) {
                const options = this.popperRef.querySelectorAll('ld-option')
                options[options.length - 1]?.focus()
              }
            } else {
              this.triggerRef.focus()
            }
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
            }
            if (!optionToFocus) {
              optionToFocus = this.triggerRef
            }
            optionToFocus.focus()
          })
        }
        break
      case 'Home':
        // Move focus to the first option.
        if (this.expanded) {
          ev.preventDefault()
          if (this.popperRef.dataset.popperPlacement.includes('top')) {
            this.popperRef.querySelector('ld-option')?.focus()
          } else {
            this.triggerRef.focus()
          }
        }
        break
      case 'End':
        // Move focus to the last option.
        if (this.expanded) {
          ev.preventDefault()
          if (this.popperRef.dataset.popperPlacement.includes('top')) {
            this.triggerRef.focus()
          } else {
            const options = this.popperRef.querySelectorAll('ld-option')
            options[options.length - 1]?.focus()
          }
        }
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
    if (ev.target.closest('ld-select') !== this.el) {
      this.expanded = false
    }
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

    return (
      <Host class={cl} onKeyDown={this.handleKeyDown.bind(this)}>
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
            {this.multiple
              ? this.placeholder
              : ((this.selected[0] as unknown) as HTMLElement)?.textContent ||
                this.placeholder}
          </button>
        </div>
        <ul
          role="listbox"
          class={popperCl}
          ref={(el) => (this.popperRef = el as HTMLElement)}
        >
          <slot></slot>
        </ul>
      </Host>
    )
  }
}
