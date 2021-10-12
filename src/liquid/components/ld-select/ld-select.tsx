import '../../components' // type definitions for type checks and intelliSense
import {
  Component,
  Element,
  h,
  Host,
  Event,
  Listen,
  Prop,
  State,
  Watch,
  EventEmitter,
} from '@stencil/core'
import Tether from 'tether'
import { LdSelectPopper } from './ld-select-popper/ld-select-popper'
import { LdOptionInternal } from './ld-option-internal/ld-option-internal'
import { applyPropAliases } from '../../utils/applyPropAliases'

/**
 * @slot - the default slot contains the select options
 * @slot icon - replaces caret with custom trigger button icon
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 */
@Component({
  tag: 'ld-select',
  styleUrl: 'ld-select.css',
  shadow: true,
})
export class LdSelect {
  @Element() el: HTMLElement

  private selectRef!: HTMLElement
  private triggerRef!: HTMLElement
  private selectionListRef!: HTMLElement
  private slotContainerRef!: HTMLElement
  private internalOptionsContainerRef!: HTMLElement
  private listboxRef!: HTMLElement
  private btnClearRef: HTMLButtonElement
  private popper: Tether
  private observer: MutationObserver

  /**
   * Used as trigger button label in multiselect mode
   * and in single select mode if nothing is selected.
   */
  @Prop() placeholder: string

  /** Used to specify the name of the control. */
  @Prop() name: string

  /** Multiselect mode. */
  @Prop() multiple: boolean

  /** Disabled state of the component. */
  @Prop() disabled: boolean

  /** Set this property to `true` in order to mark the select visually as invalid. */
  @Prop() invalid: boolean

  /**
   * Prevents a state with no options selected after
   * initial selection in single select mode.
   */
  @Prop() preventDeselection: boolean

  // prettier-ignore
  /**
   * Display mode.
   */
  @Prop() mode?:
    // default
    | 'detached' // = default  + small gap between trigger button and popper
    | 'inline' //   = detached + minumum trigger button width
    | 'ghost' //    = inline   + transparent background and borders

  /** Size of the select trigger button. */
  @Prop() size?: 'sm' | 'lg'

  /**
   * Constrains the height of the trigger button by replacing overflowing selection
   * with a "+X more" indicator.
   */
  @Prop({ mutable: true }) maxRows?: number

  /** Attached as CSS class to the select popper element. */
  @Prop() popperClass?: string

  /**
   * Stringified tether options object to be merged with the default options.
   */
  @Prop({ mutable: true }) tetherOptions = '{}'

  @State() initialized = false

  @State() expanded = false

  @State() selected: { value: string; text: string }[] = []

  @State() theme: string

  @State() ariaDisabled = false

  @State() typeAheadQuery: string

  @State() typeAheadTimeout: number

  @State() internalOptionsHTML: string

  @State() hasMore = false

  @State() hasCustomIcon = false

  @Watch('selected')
  emitEvents(
    newSelection: { value: string; text: string }[],
    oldSelection: { value: string; text: string }[]
  ) {
    if (!this.initialized) return

    const newValues = newSelection.map((option) => option.value)
    const oldValues = oldSelection.map((option) => option.value)
    if (JSON.stringify(newValues) === JSON.stringify(oldValues)) return

    this.updateTriggerMoreIndicator(true)

    this.input.emit(newValues)
    this.change.emit(newValues)
  }

  @Watch('typeAheadQuery')
  handleTypeAhead(newQuery?: string) {
    if (!newQuery) return

    const options = (Array.from(
      this.listboxRef.querySelectorAll('ld-option-internal')
    ) as unknown) as LdOptionInternal[]
    const values = options.map((option) => option.value)
    let index = values.findIndex(
      (value) => value.toLowerCase().indexOf(newQuery.toLowerCase()) === 0
    )
    if (index > -1) {
      options[index].focusOption()
      return
    }

    index = 0
    for (let i = 0; i < values.length; i++) {
      if (newQuery.toLowerCase() < values[i].toLowerCase()) {
        index = i + 1
        break
      }
    }

    if (index > 0) {
      options[index - 1].focusOption()
    }
  }

  /**
   * Emitted with an array of selected values when an alteration to the selection is committed by the user.
   */
  @Event() change: EventEmitter<string[]>

  /**
   * Emitted with an array of selected values when an alteration to the selection is committed by the user.
   */
  @Event() input: EventEmitter<string[]>

  /**
   * Emitted with an array of selected values when the select component gets focus.
   */
  @Event({ bubbles: false, cancelable: false, composed: true })
  focus: EventEmitter<string[]>

  /**
   * Emitted with an array of selected values when the select component looses focus.
   */
  @Event({ bubbles: false, cancelable: false, composed: true })
  blur: EventEmitter<string[]>

  /**
   * Emitted with an array of selected values when the select component looses focus.
   */
  @Event({ bubbles: true, cancelable: false, composed: true })
  focusout: EventEmitter<string[]>

  private isOverflowing() {
    return (
      this.selectionListRef.scrollHeight > this.selectionListRef.clientHeight
    )
  }

  private updateTriggerMoreIndicator(refresh = false) {
    if (!this.multiple) return

    if (!this.maxRows) {
      return
    }

    if (refresh) this.hasMore = false

    window.requestAnimationFrame(() => {
      if (!this.selectionListRef) return

      const selectionListItems = Array.from(
        this.selectionListRef.querySelectorAll(
          '.ld-select__selection-list-item'
        )
      )

      if (!this.hasMore) {
        // reset
        this.selectionListRef
          .querySelector('.ld-select__selection-list-more')
          ?.remove()
        selectionListItems.forEach((el) => {
          el.classList.remove('ld-select__selection-list-item--overflowing')
        })
      }

      // If overflowing, hide overflowing and show "+X" indicator
      if (this.isOverflowing()) {
        let moreItem
        if (!this.hasMore) {
          moreItem = document.createElement('li')
          moreItem.classList.add('ld-select__selection-list-more')
          this.selectionListRef.prepend(moreItem)
        } else {
          moreItem = this.selectionListRef.querySelector(
            '.ld-select__selection-list-more'
          )
        }
        this.hasMore = true

        const maxOffset = this.maxRows * 1.75 * 16

        let overflowingTotal = 0
        selectionListItems.forEach((el) => {
          const overflowing = overflowingTotal
            ? true
            : (el as HTMLElement).offsetTop >= maxOffset
          el.classList[overflowing ? 'add' : 'remove'](
            'ld-select__selection-list-item--overflowing'
          )
          if (overflowing) overflowingTotal++
        })

        const hideLastVisibleIfMoreIndicatorOverflowing = () => {
          moreItem = this.selectionListRef.querySelector(
            '.ld-select__selection-list-more'
          )
          moreItem.innerText = `+${overflowingTotal}`
          if (moreItem.offsetTop < maxOffset) {
            return
          }

          const notOverflowing = Array.from(
            this.selectionListRef.querySelectorAll(
              '.ld-select__selection-list-item:not(.ld-select__selection-list-item--overflowing)'
            )
          )
          const [lastNotOverflowing] = notOverflowing.slice(-1)
          if (lastNotOverflowing) {
            lastNotOverflowing.classList.add(
              'ld-select__selection-list-item--overflowing'
            )
            overflowingTotal++
            moreItem.innerText = `+${overflowingTotal}`

            window.requestAnimationFrame(() => {
              hideLastVisibleIfMoreIndicatorOverflowing()
            })
          }
        }
        hideLastVisibleIfMoreIndicatorOverflowing()
      }
    })
  }

  private updatePopperWidth() {
    this.listboxRef.style.setProperty(
      'width',
      `${this.selectRef.getBoundingClientRect().width}px`
    )
  }

  private updatePopperShadowHeight() {
    const ldPopper = (this.listboxRef as unknown) as LdSelectPopper
    ldPopper.updateShadowHeight(
      `calc(100% + ${this.triggerRef.getBoundingClientRect().height}px)`
    )
  }

  private updatePopperTheme() {
    const themeEl = this.el.closest('[class*="ld-theme-"]')
    if (!themeEl) return

    setTimeout(() => {
      // Array.from(themeEl.classList).find doesn't work in JSDom for some reason.
      this.theme = themeEl.classList
        .toString()
        .split(' ')
        .find((cl) => cl.indexOf('ld-theme-') === 0)
        ?.split('ld-theme-')[1]
    })
  }

  private updatePopper() {
    this.popper.position()
    this.updatePopperWidth()
    this.updatePopperShadowHeight()
    this.updatePopperTheme()
  }

  private initPopper() {
    let customTetherOptions = {}
    customTetherOptions = JSON.parse(this.tetherOptions)

    this.popper = new Tether({
      classPrefix: 'ld-tether',
      element: this.listboxRef,
      target: this.selectRef,
      attachment: 'top left',
      targetAttachment: 'bottom left',
      offset: this.mode ? '-4px 0' : '0 0',
      constraints: [
        {
          to: 'window',
          pin: true,
        },
      ],
      ...customTetherOptions,
    })

    this.listboxRef.classList.add('ld-select__popper--initialized')
  }

  private initOptions() {
    const initialized = this.initialized
    let children
    if (!initialized) {
      children = this.el.querySelectorAll('ld-option')
    } else {
      children = this.internalOptionsContainerRef.querySelectorAll(
        'ld-option-internal'
      )
    }

    if (!children.length) {
      throw new TypeError(
        'ld-select requires at least one ld-option element as a child, but found none.'
      )
    }

    const childrenArr = Array.from(children) as HTMLElement[]

    setTimeout(() => {
      if (!initialized) {
        this.internalOptionsHTML = this.el.innerHTML['replaceAll'](
          /<ld-option/g,
          `<ld-option-internal${this.multiple ? ' mode="checkbox"' : ''}${
            this.size ? ' size="' + this.size + '"' : ''
          }${this.preventDeselection ? ' prevent-deselection' : ''}`
        )
          .replaceAll(/<\/ld-option/g, '</ld-option-internal')
          .replaceAll(
            /<ld-icon (.|\n|\r)*slot="icon"(.|\n|\r)*>(.|\n|\r)*<\/ld-icon>/g,
            ''
          )
      }
      this.selected = childrenArr
        .filter((child) => {
          return ((child as unknown) as LdOptionInternal).selected
        })
        .map((child) => ({
          value: child.getAttribute('value'),
          text: child.innerText,
        }))
      this.updateTriggerMoreIndicator(true)
    })
  }

  private handleSlotChange() {
    this.initialized = false

    const oldValues = [...this.selected]
    this.initOptions()

    setTimeout(() => {
      this.initialized = true
      const newValues = [...this.selected]
      this.emitEvents(newValues, oldValues)
    })
  }

  private initObserver() {
    if (this.observer) this.observer.disconnect()
    this.observer = new MutationObserver(this.handleSlotChange.bind(this))
    this.observer.observe(this.slotContainerRef, {
      subtree: true,
      childList: true,
      attributes: true,
    })
  }

  private togglePopper() {
    this.expanded = !this.expanded

    if (this.expanded) {
      this.popper.enable()
    } else {
      this.popper.disable()
      this.triggerRef.focus()
    }
  }

  private clearSelection() {
    Array.from(this.listboxRef.querySelectorAll('ld-option-internal')).forEach(
      (option) => {
        ;((option as unknown) as LdOptionInternal).selected = false
      }
    )
    this.selected = []
  }

  @Listen('resize', { target: 'window', passive: true })
  handleWindowResize() {
    if (this.disabled || this.ariaDisabled) return // this is for a minor performance optimization only

    this.updatePopperWidth()
    this.updateTriggerMoreIndicator(true)
    this.updatePopperShadowHeight()
  }

  @Listen('ldOptionSelect', { target: 'window', passive: true })
  handleSelect(ev: CustomEvent<boolean>) {
    const target = ev.target as HTMLElement

    // Ignore events which are not fired on current instance.
    if (target.closest('[role="listbox"]') !== this.listboxRef) return

    if (!this.multiple) {
      // Deselect currently selected option, if it's not the target option.
      ;((Array.from(
        this.listboxRef.querySelectorAll('ld-option-internal')
      ) as unknown) as HTMLOptionElement[]).forEach((option) => {
        if (
          option !==
          ((target.closest(
            'ld-option-internal'
          ) as unknown) as HTMLOptionElement)
        ) {
          option.selected = false
        }
      })
      this.togglePopper()
    }
    this.initOptions()
  }

  private expandAndFocus() {
    this.expand()
    setTimeout(() => {
      // If selected in single select mode, focus selected.
      let optionToFocus
      if (!this.multiple) {
        // Using find instead of ld-option-internal[selected] selector below
        // in order to prevent "TypeError: e.getAttributeNode is not a function" in JSDom.
        optionToFocus = Array.from(
          this.listboxRef.querySelectorAll('ld-option-internal')
        )
          .find((ldOption) => ldOption.hasAttribute('selected'))
          ?.shadowRoot.querySelector('[role="option"]')
      }
      if (!optionToFocus) {
        optionToFocus = this.triggerRef
      }
      optionToFocus.focus()
    })
  }

  private handleHome(ev) {
    // Move focus to the trigger button.
    ev.preventDefault()
    if (this.el.shadowRoot.activeElement !== this.triggerRef) {
      this.triggerRef.focus()
    }
  }

  private handleEnd(ev) {
    // Move focus to the last option.
    ev.preventDefault()
    const options = (Array.from(
      this.listboxRef.querySelectorAll('ld-option-internal')
    ) as unknown) as LdOptionInternal[]
    if (
      document.activeElement !==
      ((options[options.length - 1] as unknown) as HTMLElement)
    ) {
      options[options.length - 1].focusOption()
    }
  }

  private selectAndFocus(ev, ldOption: LdOptionInternal) {
    if (!ldOption) return

    if (this.multiple && ev.shiftKey) {
      if (
        document.activeElement?.tagName === 'LD-OPTION-INTERNAL' &&
        !document.activeElement.hasAttribute('selected')
      ) {
        document.activeElement.dispatchEvent(
          new KeyboardEvent('keydown', { key: ' ' })
        )
      }
      ldOption.focusOption()
      const ldOptionHTMLEl = (ldOption as unknown) as HTMLElement
      if (!ldOptionHTMLEl.hasAttribute('selected')) {
        ldOptionHTMLEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
      }
    } else {
      ldOption.focusOption()
    }
  }

  private typeAhead(key: string) {
    // Type a character: focus moves to the next item with a name that starts with the typed character.
    // Type multiple characters in rapid succession: focus moves to the next item with a name that starts
    // with the string of characters typed.
    window.clearTimeout(this.typeAheadTimeout)
    this.typeAheadQuery = (this.typeAheadQuery || '') + key
    this.typeAheadTimeout = window.setTimeout(() => {
      this.typeAheadQuery = ''
    }, 500)
  }

  @Listen('keydown', { passive: false, target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.disabled || this.ariaDisabled) return

    // Ignore events if current instance has no focus.
    if (
      document.activeElement.closest('[role="listbox"]') !== this.listboxRef &&
      document.activeElement.closest('ld-select') !== this.el
    ) {
      return
    }

    // If the clear button is focused, ignore Enter and Space key events.
    if (
      this.el.shadowRoot.activeElement === this.btnClearRef &&
      (ev.key === ' ' || ev.key === 'Enter')
    ) {
      return
    }

    // If an option is focused, ignore Enter and Space key events
    // (the internal option component will dispatch its own event on selection).
    if (
      document.activeElement.closest('[role="listbox"]') !== this.listboxRef &&
      this.el.shadowRoot.activeElement.classList.contains(
        'ld-select__btn-clear-single'
      ) &&
      (ev.key === ' ' || ev.key === 'Enter')
    ) {
      return
    }

    switch (ev.key) {
      case 'ArrowDown': {
        // If not expanded, expand popper.
        // If expanded, move focus to the next option.
        // If shift is pressed, select the next option.
        // Holding down the Shift key and then using the Down cursor keys
        // increases the range of items selected (multiple mode only).
        ev.preventDefault()
        if (!this.expanded) {
          this.expandAndFocus()
          return
        }

        if (ev.metaKey) {
          this.handleEnd(ev)
          return
        }

        let nextLdOption
        if (
          document.activeElement.nextElementSibling?.tagName ===
          'LD-OPTION-INTERNAL'
        ) {
          nextLdOption = document.activeElement.nextElementSibling
        } else {
          if (document.activeElement === this.el) {
            nextLdOption = this.listboxRef.querySelector('ld-option-internal')
          }
        }
        this.selectAndFocus(ev, nextLdOption)
        break
      }
      case 'ArrowUp': {
        // If not expanded, expand popper.
        // If expanded, move focus to the previous option.
        // If the first option is focused, focus the trigger button.
        // Holding down the Shift key and then using the Up cursor keys
        // increases the range of items selected (multiple mode only).
        ev.preventDefault()
        if (!this.expanded) {
          this.expandAndFocus()
          return
        }

        if (ev.metaKey) {
          this.handleHome(ev)
          return
        }

        if (
          document.activeElement.previousElementSibling?.tagName ===
          'LD-OPTION-INTERNAL'
        ) {
          this.selectAndFocus(
            ev,
            (document.activeElement
              .previousElementSibling as unknown) as LdOptionInternal
          )
          return
        }

        if (
          document.activeElement ===
          this.listboxRef.querySelector('ld-option-internal')
        ) {
          this.triggerRef.focus()
        }
        break
      }
      case 'Home':
        if (this.expanded) {
          this.handleHome(ev)
        }
        break
      case 'End':
        if (this.expanded) {
          this.handleEnd(ev)
        }
        break
      case ' ':
        // If not expanded: Toggle popper.
        ev.preventDefault()
        ev.stopImmediatePropagation()
        if (
          this.expanded &&
          this.el.shadowRoot.activeElement === this.triggerRef
        ) {
          this.togglePopper()
        } else {
          this.expandAndFocus()
        }
        break
      case 'Enter':
        // If expanded and trigger button is focused: Toggle popper.
        ev.preventDefault()
        if (
          this.expanded &&
          this.el.shadowRoot.activeElement === this.triggerRef
        ) {
          this.togglePopper()
        }
        break
      case 'Escape':
        // If expanded: Close popper.
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
      case 'Shift':
      case 'Meta':
        break
      default:
        if (this.expanded) {
          ev.preventDefault()
          ev.stopImmediatePropagation()
          this.typeAhead(ev.key)
        }
    }
  }

  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(ev) {
    if (
      ev.target.closest('ld-select') !== this.el &&
      ev.target.closest('[role="listbox"]') !== this.listboxRef
    ) {
      this.expanded = false
    }

    if (ev.target.closest('ld-label')?.querySelector('ld-select') === this.el) {
      ev.preventDefault()
      this.triggerRef.focus()
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

  private handleFocusout(ev) {
    // Emit blur event if focus is not within the select component.
    ev.stopImmediatePropagation()
    if (
      ev.relatedTarget?.tagName !== 'LD-OPTION-INTERNAL' &&
      ev.relatedTarget !== this.el
    ) {
      const selectedValues = this.selected.map((option) => option.value)
      this.blur.emit(selectedValues)
      this.focusout.emit(selectedValues)
    }
  }

  private expand() {
    if (!this.popper) this.initPopper()

    this.togglePopper()
  }

  private handleTriggerClick(ev: Event) {
    ev.preventDefault()
    this.expand()
  }

  private handleTriggerFocus(ev: FocusEvent) {
    if (
      (ev.relatedTarget as HTMLElement)?.closest('[role="listbox"]') !==
      this.listboxRef
    ) {
      this.focus.emit(this.selected.map((option) => option.value))
    }
  }

  private handleClearClick(ev: MouseEvent) {
    ev.preventDefault()
    ev.stopImmediatePropagation()

    if (this.disabled || this.ariaDisabled) return

    this.clearSelection()
    this.triggerRef.focus()
  }

  private handleClearSingleClick(ev: MouseEvent, optionValue) {
    ev.preventDefault()
    ev.stopImmediatePropagation()

    if (this.disabled || this.ariaDisabled) return

    this.selected = this.selected.filter(
      (selection) => selection.value !== optionValue
    )

    this.listboxRef
      .querySelector(`ld-option-internal[value='${optionValue}']`)
      .dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
  }

  componentWillLoad() {
    applyPropAliases.apply(this)
    const customIcon = this.el.querySelector('ld-icon')
    this.hasCustomIcon = !!customIcon

    if (customIcon) {
      customIcon.setAttribute('size', this.size)
    }

    if (this.el.getAttribute('aria-disabled') === 'true') {
      this.ariaDisabled = true
    }
  }

  componentDidLoad() {
    this.initOptions()

    setTimeout(() => {
      this.initObserver()
      this.initialized = true
    })
  }

  componentDidUpdate() {
    if (this.expanded) {
      this.updatePopper()
    }
  }

  disconnectedCallback() {
    window.clearTimeout(this.typeAheadTimeout)
    if (this.popper) this.popper.destroy()
    if (this.observer) this.observer.disconnect()
  }

  render() {
    // Endable detached mode if any display mode is set.
    const detached = !!this.mode

    // Implicitly enable inline mode if ghost mode is enabled.
    const inline = this.mode === 'inline' || this.mode === 'ghost'

    // Disallow ghost in combination with multiple select mode.
    const ghost = !this.multiple && this.mode === 'ghost'

    let cl = 'ld-select'
    if (this.size) cl += ` ld-select--${this.size}`
    if (this.invalid) cl += ' ld-select--invalid'
    if (this.expanded) cl += ' ld-select--expanded'
    if (detached) cl += ' ld-select--detached'
    if (inline) cl += ' ld-select--inline'
    if (ghost) cl += ' ld-select--ghost'

    let triggerCl = 'ld-select__btn-trigger'
    if (this.invalid) triggerCl += ' ld-select__btn-trigger--invalid'
    if (detached) triggerCl += ' ld-select__btn-trigger--detached'
    if (inline) triggerCl += ' ld-select__btn-trigger--inline'
    if (ghost) triggerCl += ' ld-select__btn-trigger--ghost'

    let triggerIconCl = 'ld-select__icon'
    if (this.expanded) triggerIconCl += ' ld-select__icon--rotated'

    const triggerText = this.multiple
      ? this.placeholder
      : this.selected[0]?.text || this.placeholder

    return (
      <Host>
        <div
          class={cl}
          aria-disabled={this.disabled || this.ariaDisabled}
          part="root"
          onFocusout={this.handleFocusout.bind(this)}
          style={
            this.expanded
              ? {
                  zIndex: '2147483647', // Highest possible z-index
                }
              : undefined
          }
        >
          {this.name
            ? this.selected.map((selection) => (
                <input
                  type="hidden"
                  name={this.name}
                  value={selection.value}
                ></input>
              ))
            : ''}
          <div
            ref={(el) => (this.slotContainerRef = el as HTMLElement)}
            class="ld-select__slot-container"
            part="slot-container"
          >
            <slot></slot>
          </div>
          <div
            class="ld-select__select"
            part="select"
            ref={(el) => (this.selectRef = el as HTMLElement)}
          >
            <div
              class={triggerCl}
              role="button"
              part="btn-trigger"
              tabindex={this.disabled && !this.ariaDisabled ? undefined : '0'}
              aria-disabled={
                this.disabled || this.ariaDisabled ? 'true' : 'false'
              }
              aria-haspopup="listbox"
              aria-expanded={this.expanded ? 'true' : 'false'}
              aria-label={triggerText}
              onClick={this.handleTriggerClick.bind(this)}
              onFocus={this.handleTriggerFocus.bind(this)}
              ref={(el) => (this.triggerRef = el as HTMLElement)}
            >
              {this.multiple && this.selected.length ? (
                <ul
                  class="ld-select__selection-list"
                  part="selection-list"
                  aria-label="Selected options"
                  ref={(el) => (this.selectionListRef = el as HTMLElement)}
                  style={{
                    maxHeight:
                      this.maxRows && this.maxRows > 0
                        ? `${this.maxRows * 1.75}rem`
                        : undefined,
                  }}
                >
                  {this.selected.map((selection, index) => {
                    return (
                      <li
                        key={index}
                        class="ld-select__selection-list-item"
                        style={{ order: index + 1 + '' }}
                        part="selection-list-item"
                      >
                        <label class="ld-select__selection-label">
                          <span
                            class="ld-select__selection-label-text"
                            title={selection.text}
                            part="selection-label-text"
                          >
                            {selection.text}
                          </span>

                          <button
                            disabled={
                              this.disabled || this.ariaDisabled
                                ? true
                                : undefined
                            }
                            class="ld-select__btn-clear-single"
                            part="btn-clear-single"
                            onClick={(ev) => {
                              this.handleClearSingleClick.call(
                                this,
                                ev,
                                selection.value
                              )
                            }}
                          >
                            <svg
                              class="ld-select__btn-clear-single-icon"
                              part="icon-clear-single"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 12 12"
                            >
                              <title>Clear</title>
                              <path
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M2 2l8 8M2 10l8-8"
                              />
                            </svg>
                          </button>

                          <span
                            class="ld-select__selection-label-bg"
                            part="selection-label-bg"
                          ></span>
                        </label>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <span
                  class="ld-select__btn-trigger-text-wrapper"
                  title={triggerText}
                  part="trigger-text-wrapper"
                >
                  <span class="ld-select__btn-trigger-text" part="trigger-text">
                    {triggerText}
                  </span>
                </span>
              )}

              {this.selected?.length && this.multiple ? (
                <button
                  class="ld-select__btn-clear"
                  disabled={
                    this.disabled || this.ariaDisabled ? true : undefined
                  }
                  onClick={this.handleClearClick.bind(this)}
                  ref={(el) => (this.btnClearRef = el as HTMLButtonElement)}
                  part="btn-clear"
                >
                  <svg
                    class="ld-select__btn-clear-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 20"
                    part="icon-clear"
                  >
                    <title>Clear all</title>
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M10 20a10 10 0 100-20 10 10 0 000 20z"
                      clip-rule="evenodd"
                    />
                    <path
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6.67 6.67l6.67 6.66M6.67 13.33l6.67-6.66"
                    />
                  </svg>
                </button>
              ) : (
                ''
              )}

              <slot name="icon"></slot>
              {!this.hasCustomIcon && (
                <svg
                  class={triggerIconCl}
                  role={'presentation'}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  part="trigger-icon"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M3 6l5 4 5-4"
                  />
                </svg>
              )}
            </div>
          </div>
          <ld-select-popper
            onFocusout={this.handleFocusout.bind(this)}
            popperClass={this.popperClass}
            ref={(el) => (this.listboxRef = el as HTMLElement)}
            role="listbox"
            expanded={this.expanded}
            size={this.size}
            detached={detached}
            theme={this.theme}
          >
            <div
              ref={(el) =>
                (this.internalOptionsContainerRef = el as HTMLElement)
              }
              innerHTML={this.internalOptionsHTML}
              part="options-container"
            ></div>
          </ld-select-popper>
        </div>
      </Host>
    )
  }
}
