import '../../components' // type definitions for type checks and intelliSense
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core'
import type {
  Instance as PopperInstance,
  StrictModifiers,
} from '@popperjs/core'
import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js'
import flip from '@popperjs/core/lib/modifiers/flip.js'
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
  private popperRef!: HTMLElement
  private popper: PopperInstance
  private observer: MutationObserver

  /** Multiselect mode. */
  @Prop() multiple = false

  /** Used as trigger button label in multiselect mode. */
  @Prop() label: string

  /** Used to specify the name of the control. */
  @Prop() name: string

  @State() expanded = false

  @State() selected: string[] = []

  @Watch('expanded')
  updateInert() {
    if (this.expanded) {
      unmakeInert(this.popperRef)
    } else {
      makeInert(this.popperRef)
    }
  }

  private initPopper() {
    this.popper = createPopper<StrictModifiers>(
      this.selectRef,
      this.popperRef,
      {
        modifiers: [preventOverflow, flip],
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
      this.selected = ((childrenArr as unknown[]) as LdOption[])
        .filter((child) => child.selected)
        .map((child) => child.value)
      if (!this.multiple && !this.selected.length) {
        this.selected = [childrenArr[0].textContent]
      }
    })
  }

  private togglePopper() {
    this.expanded = !this.expanded
  }

  private handleClick(ev) {
    ev.preventDefault()

    if (!this.popper) this.initPopper()

    const target = ev.target
    if (target.closest('.ld-select__btn-trigger')) {
      this.togglePopper()
    }
  }

  private handleSlotChange() {
    this.initOptions()
    this.updateInert()
  }

  private handleKeyDown(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'ArrowDown':
        // TODO: Move focus to the next option.
        ev.preventDefault()
        console.log('ArrowDown pressed')
        break
      case 'ArrowUp':
        // TODO: Move focus to the previous option.
        ev.preventDefault()
        console.log('ArrowUp pressed')
        break
      case 'Home':
        // TODO: Move focus to the first option.
        ev.preventDefault()
        console.log('Home pressed')
        break
      case 'End':
        // TODO: Move focus to the last option.
        ev.preventDefault()
        console.log('End pressed')
        break
      case ' ':
        // TODO: If expanded: Select focused option, close (if single select).
        // If not expanded: Toggle popper.
        ev.preventDefault()
        ev.stopImmediatePropagation()
        if (this.expanded) {
          console.log(
            'Space pressed. Select focused option, close (if single select)'
          )
        } else {
          this.togglePopper()
        }
        break
      case 'Enter':
        // TODO: If expanded: Select focused option, close (if single select).
        ev.preventDefault()
        console.log('Enter pressed')
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
    let popperCl = 'ld-select__popper'
    if (this.expanded) popperCl += ' ld-select__popper--expanded'

    return (
      <Host
        class="ld-select"
        onKeyDown={this.handleKeyDown.bind(this)}
        onClick={this.handleClick.bind(this)}
      >
        <div
          class="ld-select__select"
          ref={(el) => (this.selectRef = el as HTMLElement)}
        >
          <button
            class="ld-select__btn-trigger"
            aria-haspopup="listbox"
            aria-expanded={this.expanded ? 'true' : 'false'}
          >
            {this.multiple ? this.label : this.selected[0]}
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
