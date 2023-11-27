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
  Method,
} from '@stencil/core'
import Tether from 'tether'
import { getClassNames } from '../../utils/getClassNames'
import { registerAutofocus } from '../../utils/focus'
import { closest } from '../../utils/closest'
import { TypeAheadHandler } from '../../utils/typeahead'
import { isAriaDisabled } from '../../utils/ariaDisabled'
import { sanitize } from '../../utils/sanitize'
import {
  isLdOptgroup,
  isLdOptgroupInternal,
  isLdOption,
  isLdOptionInternal,
  isLdOptInternalHidden,
} from './utils/type-guards'

type SelectOption = { value: string; html: string; text: string }

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
export class LdSelect implements InnerFocusable {
  @Element() el: HTMLLdSelectElement
  private selectRef!: HTMLDivElement
  private triggerRef!: HTMLDivElement
  private selectionListRef!: HTMLUListElement
  private internalOptionsContainerRef!: HTMLDivElement
  private listboxRef!: HTMLLdSelectPopperElement
  private btnClearRef: HTMLButtonElement
  private popper: Tether
  private slotChangeObserver: MutationObserver
  private popperObserver: MutationObserver
  private isObserverEnabled = true
  private optionSelectListenerEnabled = true

  /** Alternative disabled state that keeps element focusable */
  @Prop() ariaDisabled: string

  /**
   * This Boolean attribute lets you specify that a form control should have input focus when the page loads.
   * Only one form element in a document can have the autofocus attribute.
   */
  @Prop({ reflect: true }) autofocus: boolean

  /**
   * Creatable mode can be enabled when the filter prop is set to true.
   * This mode allows the user to create new options using the filter input field.
   */
  @Prop() creatable?: boolean

  /** The "create" input label (creatable mode). */
  @Prop() createInputLabel? = 'Press Enter to create option'

  /** The "create" button label (creatable mode). */
  @Prop() createButtonLabel? = 'Create option'

  /** Disabled state of the component. */
  @Prop() disabled?: boolean

  /** The form element to associate the select with (its form owner). */
  @Prop() form?: string

  /** Set this property to `true` in order to enable an input field for filtering options. */
  @Prop() filter?: boolean

  /** The filter input placeholder. */
  @Prop() filterPlaceholder? = 'Filter options'

  /** Set this property to `true` in order to mark the select visually as invalid. */
  @Prop() invalid?: boolean

  /** Tab index of the trigger button. */
  @Prop() ldTabindex = 0

  /** Constrains the height of the trigger button by replacing overflowing selection with a "+X more" indicator. */
  @Prop({ mutable: true }) maxRows?: number

  // prettier-ignore
  /** Display mode. */
  @Prop() mode?:
    // default
    | 'detached' // = default  + small gap between trigger button and popper
    | 'inline' //   = detached + minumum trigger button width
    | 'ghost' //    = inline   + transparent background and borders

  /** Multiselect mode. */
  @Prop() multiple?: boolean

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** Used as trigger button label in multiselect mode and in single select mode if nothing is selected. */
  @Prop() placeholder?: string

  /** Attached as CSS class to the select popper element. */
  @Prop() popperClass?: string

  /** Prevents a state with no options selected after initial selection in single select mode. */
  @Prop() preventDeselection?: boolean

  /** A Boolean attribute indicating that an option with a non-empty string value must be selected. */
  @Prop() required?: boolean

  /**
   * Sanitize config passed to DOMPurify's sanitize method.
   * If passed as string, the component will try to parse the string as JSON.
   * See https://github.com/cure53/DOMPurify#can-i-configure-dompurify
   */
  @Prop() sanitizeConfig?: SanitizeConfig | string

  /** Currently selected option(s) (read only!) */
  @Prop({ mutable: true }) selected?: SelectOption[] = []

  /** Size of the select trigger button. */
  @Prop() size?: 'sm' | 'lg'

  /** Tether options object to be merged with the default options (optionally stringified). */
  @Prop() tetherOptions?: Partial<Tether.ITetherOptions> | string

  @State() allOptsFiltered = false
  @State() filterMatchesOpt = false
  @State() expanded = false
  @State() hasCustomIcon = false
  @State() hasMore = false
  @State() initialized = false
  @State() internalOptionsHTML: string
  @State() renderHiddenInput = false
  @State() theme: string
  @State() typeAheadHandler: TypeAheadHandler<
    HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement
  >

  /**
   * Emitted with an array of selected values
   * when an alteration to the selection is committed.
   */
  @Event() ldchange: EventEmitter<string[]>

  /**
   * Emitted with an array of selected values
   * when an alteration to the selection is committed.
   */
  @Event() ldinput: EventEmitter<string[]>

  /**
   * Emitted when an option is created in create mode
   * with the filter input value.
   */
  @Event() ldoptioncreate: EventEmitter<string>

  /** Sets focus on the trigger button. */
  @Method()
  async focusInner() {
    if (!this.disabled) {
      // Experimental feature that fixes a bug in Firefox only.
      // See https://github.com/emdgroup-liquid/liquid/issues/486
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.triggerRef.focus({ focusVisible: true })
    }
  }

  @Watch('selected')
  emitEventsAndUpdateHidden(
    newSelection: SelectOption[],
    oldSelection: SelectOption[]
  ) {
    if (!this.initialized) return

    const newValues = newSelection.map((option) => option.value)
    const oldValues = oldSelection.map((option) => option.value)
    if (JSON.stringify(newValues) === JSON.stringify(oldValues)) return

    this.updateTriggerMoreIndicator(true)

    if (this.renderHiddenInput) {
      this.updateSelectedHiddenInputs(newSelection)
    }

    // Synchronize options with internal options.
    this.isObserverEnabled = false
    this.el.querySelectorAll('ld-option').forEach((ldOption) => {
      ldOption.selected = newValues.some((value) => value === ldOption.value)
      if (!ldOption.selected && ldOption.hidden) {
        this.listboxRef
          .querySelector(`ld-option-internal[value="${ldOption.value}"]`)
          .remove()
        ldOption.remove()
      }
    })
    this.isObserverEnabled = true

    this.el.dispatchEvent(new InputEvent('change', { bubbles: true }))
    this.el.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    this.ldchange.emit(newValues)
    this.ldinput.emit(newValues)
  }

  private isDisabled = () => this.disabled || isAriaDisabled(this.ariaDisabled)

  // This method must be a function declaration for testing purposes;
  // otherwise Jest's mockImplementation won't work here.
  private isOverflowing() {
    /* istanbul ignore next */
    return (
      this.selectionListRef.scrollHeight >
      this.selectionListRef.clientHeight + 2
    )
  }

  private updateTriggerMoreIndicator = (refresh = false) => {
    if (!this.multiple || !this.maxRows) return

    if (refresh) this.hasMore = false

    requestAnimationFrame(() => {
      if (!this.selectionListRef) return

      const selectionListItems = Array.from(
        this.selectionListRef.querySelectorAll<HTMLLIElement>(
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
            : el.offsetTop >= maxOffset
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
            /* istanbul ignore next */
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

            requestAnimationFrame(() => {
              hideLastVisibleIfMoreIndicatorOverflowing()
            })
          }
        }
        hideLastVisibleIfMoreIndicatorOverflowing()
      }
    })
  }

  private updatePopperWidth = () => {
    this.listboxRef.style.setProperty(
      'width',
      `${this.selectRef.getBoundingClientRect().width}px`
    )
  }

  private updatePopperShadowHeight = () => {
    const ldPopper = this.listboxRef
    ldPopper.updateShadowHeight(
      `calc(100% + ${this.triggerRef.getBoundingClientRect().height}px)`
    )
  }

  private updatePopperTheme = () => {
    const themeEl = this.el.closest('[class*="ld-theme-"]')
    if (!themeEl) return

    setTimeout(() => {
      // Array.from(themeEl.classList).find doesn't work in JSDom for some reason.
      this.theme = themeEl.classList
        .toString()
        .split(' ')
        .find((cl) => cl.startsWith('ld-theme-'))
        ?.substring(9)
    })
  }

  private updatePopper = () => {
    if (!this.popper) this.initPopper()
    this.popper.position()
    this.updatePopperWidth()
    this.updatePopperShadowHeight()
    this.updatePopperTheme()
  }

  private initPopper = () => {
    const customTetherOptions: Partial<Tether.ITetherOptions> =
      typeof this.tetherOptions === 'string'
        ? JSON.parse(this.tetherOptions)
        : this.tetherOptions
    const tetherOptions: Tether.ITetherOptions = {
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
    }

    this.popper = new Tether(tetherOptions)

    // Observe popper in order to set focus as soon as it becomes visible.
    this.initPopperObserver()

    this.listboxRef.classList.add('ld-select__popper--initialized')
  }

  private getOptsRec = (
    children: Element[]
  ): (HTMLLdOptionElement | HTMLLdOptionInternalElement)[] => {
    const options = children.flatMap((child) => {
      if (isLdOption(child)) {
        return child
      }
      if (isLdOptgroup(child)) {
        return this.getOptsRec(Array.from(child.children))
      }
      return []
    })
    return options
  }

  private getInternalOptionHTML = (
    ldOption: HTMLLdOptionElement,
    optgroupDisabled = false
  ) => {
    const classStr = ldOption.classList.toString()
    return `<ld-option-internal${classStr ? ' class="' + classStr + '"' : ''}${
      this.multiple ? ' mode="checkbox"' : ''
    }${this.size ? ' size="' + this.size + '"' : ''}${
      this.preventDeselection ? ' prevent-deselection' : ''
    }${ldOption.selected ? ' selected' : ''}${
      ldOption.hidden ? ' hidden' : ''
    }${ldOption.value ? ' value="' + ldOption.value + '"' : ''}${
      ldOption.disabled || optgroupDisabled ? ' disabled' : ''
    }>${ldOption.innerHTML.replaceAll(
      /<ld-icon (.|\n|\r)*slot="icon"(.|\n|\r)*>(.|\n|\r)*<\/ld-icon>/g,
      ''
    )}</ld-option-internal>`
  }

  private getInternalOptgroupHTML = (ldOptgroup: HTMLLdOptgroupElement) => {
    const classStr = ldOptgroup.classList.toString()
    return `<ld-optgroup-internal label=${ldOptgroup.label} ${
      classStr ? ' class="' + classStr + '"' : ''
    }${this.multiple ? ' mode="checkbox"' : ''}${
      this.size ? ' size="' + this.size + '"' : ''
    }${ldOptgroup.hidden ? ' hidden' : ''}${
      ldOptgroup.disabled ? ' disabled' : ''
    }>${Array.from(ldOptgroup.children)
      .map((ldOption: HTMLLdOptionElement) =>
        this.getInternalOptionHTML(ldOption, ldOptgroup.disabled)
      )
      .join('')}</ld-optgroup-internal>`
  }

  private initOptions = () => {
    const initialized = this.initialized
    const children = Array.from(
      initialized ? this.internalOptionsContainerRef.children : this.el.children
    )

    const options = this.getOptsRec(children)

    if (!options.length) {
      throw new TypeError(
        'ld-select requires at least one ld-option element as a child, but found none.'
      )
    }

    const selectedOptions = options.filter((child) => {
      return child.selected
    })

    if (selectedOptions.length > 1 && !this.multiple) {
      throw new TypeError(
        'Multiple selected options are not allowed, if multiple option is not set.'
      )
    }

    if (!initialized) {
      let internalOptionsHTML = ''
      children.forEach((child) => {
        if (isLdOption(child)) {
          internalOptionsHTML += this.getInternalOptionHTML(child)
        } else if (isLdOptgroup(child)) {
          internalOptionsHTML += this.getInternalOptgroupHTML(child)
        } // else it's the slotted icon which we ignore.
      })
      this.internalOptionsHTML = internalOptionsHTML
    }
    this.selected = selectedOptions.map((child) => {
      return {
        value: child.value,
        html: child.innerHTML,
        text: child.innerText,
      }
    })

    if (this.listboxRef) {
      this.typeAheadHandler.options =
        this.listboxRef.querySelectorAll('ld-option-internal')
    }
    this.updateTriggerMoreIndicator(true)
  }

  private updateSelectedHiddenInputs = (selected: SelectOption[]) => {
    const selectedValues = selected.map(({ value }) => value)
    const inputs = this.el.querySelectorAll('input')

    // For each existing input, remove it from DOM if not in selected.
    // Remove each value from selectedValues if hidden input already exists.
    inputs.forEach((hiddenInput) => {
      const index = selectedValues.indexOf(hiddenInput.value)
      if (index >= 0) {
        selectedValues.splice(index, 1)
      } else {
        hiddenInput.remove()
      }
    })

    // If nothing is selected we need only one hidden input without value.
    if (selected.length === 0) {
      this.appendHiddenInput()
      return
    }

    // Else add hidden inputs for each value in selectedValues.
    selectedValues.forEach(this.appendHiddenInput)
  }

  private appendHiddenInput = (value?: string) => {
    const hiddenInput = document.createElement('input')

    // Slot required to keep the hidden input outside the popper.
    hiddenInput.setAttribute('slot', 'hidden')
    hiddenInput.name = this.name
    hiddenInput.type = 'hidden'

    if (value !== undefined) {
      hiddenInput.value = value
    }

    this.el.appendChild(hiddenInput)
  }

  @Watch('name')
  @Watch('form')
  updateHiddenInputs() {
    const hiddenInputs = this.el.querySelectorAll('input')

    const outerForm = this.el.closest('form')
    if (!this.name || !(outerForm || this.form)) {
      hiddenInputs.forEach((hiddenInput) => {
        hiddenInput.remove()
      })
      return
    }

    if (!hiddenInputs.length) {
      this.updateSelectedHiddenInputs(this.selected)
      return
    }

    hiddenInputs.forEach((hiddenInput) => {
      hiddenInput.name = this.name
      if (this.form) {
        hiddenInput.setAttribute('form', this.form)
      }
    })
  }

  private handleSlotChange = (mutationsList: MutationRecord[]) => {
    if (!this.isObserverEnabled) return
    if (
      !mutationsList.some(
        (record) => isLdOption(record.target) || isLdOptgroup(record.target)
      )
    ) {
      return
    }

    this.initialized = false

    const oldValues = [...this.selected]
    this.initOptions()

    this.initialized = true
    const newValues = [...this.selected]
    this.emitEventsAndUpdateHidden(newValues, oldValues)
  }

  private handlePopperChange = (mutationsList: MutationRecord[]) => {
    if (
      this.listboxRef.classList.contains('ld-tether-enabled') &&
      mutationsList.some((mutation) =>
        mutation.oldValue.includes('display: none;')
      )
    ) {
      // Popper has just been expanded and is visible.

      // If there is a selected option in single select mode, focus it.
      let toFocus
      if (!this.multiple) {
        // Using find instead of ld-option-internal[selected] selector below
        // in order to prevent "TypeError: e.getAttributeNode is not a function" in JSDom.
        toFocus = Array.from(
          this.listboxRef.querySelectorAll('ld-option-internal')
        )
          .find((ldOption) => ldOption.hasAttribute('selected'))
          ?.shadowRoot.querySelector('[role="option"]')
      }

      // Otherwise, focus either the filter input (if available) or the trigger button.
      if (!toFocus) {
        if (this.filter) {
          toFocus = this.getFilterInput()
        } else {
          toFocus = this.triggerRef
        }
      }

      toFocus.focus()
    }
  }

  private initSlotChangeObserver = () => {
    this.slotChangeObserver = new MutationObserver(this.handleSlotChange)
    this.slotChangeObserver.observe(this.el, {
      subtree: true,
      childList: true,
      attributes: true,
    })
  }

  private initPopperObserver = () => {
    this.popperObserver = new MutationObserver(this.handlePopperChange)
    this.popperObserver.observe(this.listboxRef, {
      subtree: false,
      childList: false,
      attributes: true,
      attributeFilter: ['style'],
      attributeOldValue: true,
    })
  }

  private getFilterInput = () =>
    this.listboxRef.shadowRoot.querySelector<HTMLInputElement>(
      '.ld-select-popper__filter-input'
    )

  private togglePopper = () => {
    if (!this.popper) this.initPopper()

    this.expanded = !this.expanded

    if (this.expanded) {
      this.popper.enable()
    } else {
      this.popper.disable()
      this.focusInner()
    }
  }

  private clearSelection = () => {
    Array.from(this.listboxRef.querySelectorAll('ld-option-internal')).forEach(
      (option) => {
        option.selected = false
      }
    )
    this.selected = []
  }

  @Listen('resize', { target: 'window', passive: true })
  handleWindowResize() {
    if (this.isDisabled()) return // this is for a minor performance optimization only

    this.updatePopperWidth()
    this.updateTriggerMoreIndicator(true)
    this.updatePopperShadowHeight()
  }

  @Listen('ldoptionselect', { target: 'window', passive: true })
  handleSelect(ev: CustomEvent<boolean>) {
    const target = ev.target as HTMLLdOptionInternalElement

    // Ignore events which are not fired on current instance.
    if (target.closest('[role="listbox"]') !== this.listboxRef) return

    if (!this.optionSelectListenerEnabled) return
    this.optionSelectListenerEnabled = false

    if (!this.multiple) {
      // Deselect currently selected option, if it's not the target option.
      this.listboxRef
        .querySelectorAll('ld-option-internal')
        .forEach((option) => {
          if (option !== target.closest('ld-option-internal')) {
            option.selected = false
          }
        })
      this.togglePopper()
      if (this.filter) {
        this.resetFilter()
        this.focusInner()
      }
    }
    this.initOptions()

    this.optionSelectListenerEnabled = true
  }

  private handleHome = (ev) => {
    ev.preventDefault()
    this.focusInner()
  }

  private handleEnd = (ev) => {
    // Move focus to the last option.
    ev.preventDefault()
    const visibleOptions = Array.from(
      this.listboxRef.querySelectorAll('ld-option-internal')
    ).filter((option) => !isLdOptInternalHidden(option))
    if (document.activeElement !== visibleOptions[visibleOptions.length - 1]) {
      visibleOptions[visibleOptions.length - 1].focusInner()
    }
  }

  private selectAndFocus = (
    ev: KeyboardEvent,
    opt: HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement | undefined
  ) => {
    if (!opt) return

    if (this.multiple && ev.shiftKey) {
      if (
        isLdOptionInternal(document.activeElement) &&
        !isLdOptgroupInternal(document.activeElement) &&
        !document.activeElement.hasAttribute('selected')
      ) {
        document.activeElement.dispatchEvent(
          new KeyboardEvent('keydown', { key: ' ' })
        )
      }
      if (!opt.hasAttribute('selected') && !isLdOptgroupInternal(opt)) {
        opt.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
      }
    }
    opt.focusInner()
  }

  private handleFilterChange = (ev: CustomEvent<string>) => {
    // Hide options which do not match the filter query.
    const opts = this.internalOptionsContainerRef.querySelectorAll<
      HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement
    >('ld-option-internal, ld-optgroup-internal')
    const query = ev.detail.trim().toLowerCase()
    let allFiltered = true
    let filterMatchesOpt = false
    const filteredOpts = Array.from(opts).filter((opt) => {
      const optTextLower = isLdOptionInternal(opt)
        ? opt.textContent.toLowerCase()
        : (opt as HTMLLdOptgroupInternalElement).label.toLowerCase()
      const filtered = Boolean(query) && !optTextLower.includes(query)

      opt.filtered = filtered
      if (optTextLower === query) {
        filterMatchesOpt = true
      }
      if (!opt.filtered) {
        allFiltered = false
      }

      return !filtered
    })

    this.typeAheadHandler.options = filteredOpts
    this.allOptsFiltered = allFiltered
    this.filterMatchesOpt = filterMatchesOpt

    // Re-position popper after new height has been applied.
    requestAnimationFrame(() => {
      this.updatePopper()
    })
  }

  private handleFilterCreate = () => {
    // In single select mode, deselect currently selected option
    if (!this.multiple) {
      const options = this.el.querySelectorAll('ld-option')
      options.forEach((ldOption) => {
        ldOption.selected = false
      })
    }

    const value = this.getFilterInput().value
    this.resetFilter()
    this.ldoptioncreate.emit(value)
  }

  private canCreate = () => {
    return Boolean(
      this.creatable && !this.filterMatchesOpt && this.getFilterInput().value
    )
  }

  private focusPrev = (
    current: HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement,
    ev: KeyboardEvent
  ) => {
    // Focus previous visible option, if any.
    // If the previous is an option, we check if it's visible.
    if (isLdOptionInternal(current.previousElementSibling)) {
      if (isLdOptInternalHidden(current.previousElementSibling)) {
        // If it's hidden, we repeat with the hidden option.
        this.focusPrev(current.previousElementSibling, ev)
        return
      }
      // If it's not hidden we focus it.
      this.selectAndFocus(ev, current.previousElementSibling)
      return
    }

    // If the previous is an optgroup, we try to focus the last option in it.
    if (isLdOptgroupInternal(current.previousElementSibling)) {
      const lastInOptgroup = Array.from(
        current.previousElementSibling.children
      ).at(-1) as HTMLLdOptionInternalElement

      // If it's hidden, we repeat with the hidden option.
      if (isLdOptInternalHidden(lastInOptgroup)) {
        this.focusPrev(lastInOptgroup, ev)
        return
      }
      // If it's not hidden we focus it.
      this.selectAndFocus(ev, lastInOptgroup)
      return
    }

    // If there is no previous element, we check if we are currently in an optgroup.
    const closestOptgroup =
      isLdOptionInternal(current) &&
      current.closest<HTMLLdOptgroupInternalElement | undefined>(
        'ld-optgroup-internal'
      )
    // If we are in an optgroup, we try to focus the optgroup.
    if (closestOptgroup) {
      // If the optgroup is not visible, we set current to the optgroup and repeat.
      if (isLdOptInternalHidden(closestOptgroup)) {
        this.focusPrev(closestOptgroup, ev)
        return
      }
      closestOptgroup.focusInner()
      return
    }

    // Otherwise we focus either the filter input or the trigger button.
    if (this.filter) {
      this.getFilterInput().focus()
      return
    }
    this.handleHome(ev)
  }

  private focusNext = (
    current: HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement,
    ev: KeyboardEvent
  ) => {
    // Focus next visible option, if any.
    // If current is an optgroup, try to focus the first option in it.
    if (isLdOptgroupInternal(current)) {
      const firstInOptgroup = current.children[0] as HTMLLdOptionInternalElement
      // If it's hidden, we repeat with the hidden option.
      if (isLdOptInternalHidden(firstInOptgroup)) {
        this.focusNext(firstInOptgroup, ev)
        return
      }
      // If it's not hidden we focus it.
      this.selectAndFocus(ev, firstInOptgroup)
      return
    }

    // If the next is an option, we check if it's visible.
    if (isLdOptionInternal(current.nextElementSibling)) {
      if (isLdOptInternalHidden(current.nextElementSibling)) {
        // If it's hidden, we repeat with the hidden option.
        this.focusNext(current.nextElementSibling, ev)
        return
      }
      // If it's not hidden we focus it.
      this.selectAndFocus(ev, current.nextElementSibling)
      return
    }

    // If the next is an optgroup, we try to focus the optgroup.
    if (isLdOptgroupInternal(current.nextElementSibling)) {
      // If it's hidden, we repeat with first input within the hidden optgroup.
      if (isLdOptInternalHidden(current.nextElementSibling)) {
        const firstInOptgroup = current.nextElementSibling
          .children[0] as HTMLLdOptionInternalElement
        // If the first is not visible, we continue with it as current.
        if (isLdOptInternalHidden(firstInOptgroup)) {
          this.focusNext(firstInOptgroup, ev)
          return
        }
        // Otherwise we focus it.
        this.selectAndFocus(ev, firstInOptgroup)
        return
      }
      // If it's not hidden we focus it.
      this.selectAndFocus(ev, current.nextElementSibling)
      return
    }

    // If there is no next element, we check if we are currently in an optgroup.
    const closestOptgroup =
      isLdOptionInternal(current) &&
      current.closest<HTMLLdOptgroupInternalElement | undefined>(
        'ld-optgroup-internal'
      )
    // If we are in an optgroup, we try to focus its next sibling.
    if (closestOptgroup) {
      const next = closestOptgroup.nextElementSibling as
        | HTMLLdOptionInternalElement
        | HTMLLdOptgroupInternalElement
        | undefined
      if (!next) return

      // If the next sibling is not visible, we repeat with the next sibling.
      if (isLdOptInternalHidden(next)) {
        this.focusNext(next, ev)
        return
      }
      // If it's visible, we focus it.
      next.focusInner()
    }
  }

  @Listen('keydown', { passive: false, target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.isDisabled()) return

    // Ignore page special meta key combos.
    if (ev.metaKey && !['ArrowDown', 'ArrowUp'].includes(ev.key)) return

    // Ignore events if current instance has no focus.
    if (
      document.activeElement.closest('[role="listbox"]') !== this.listboxRef &&
      document.activeElement.closest('ld-select') !== this.el
    ) {
      return
    }

    const filterHasFocus =
      this.filter &&
      this.listboxRef?.shadowRoot.activeElement === this.getFilterInput()

    // If filter has focus...
    if (filterHasFocus) {
      // ... and create mode is active
      if (this.canCreate() && ev.key === 'Enter') {
        this.handleFilterCreate()
        return
      }

      // Ignore events if filter input has focus,
      // except for navigation-specific keys.
      if (
        !['ArrowDown', 'ArrowUp', 'End', 'Escape', 'Home', 'Tab'].includes(
          ev.key
        )
      ) {
        return
      }
    }

    // If the clear button is focused, ignore Enter and Space key events.
    if (
      this.el.shadowRoot.activeElement === this.btnClearRef &&
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
          this.togglePopper()
          return
        }

        if (ev.metaKey) {
          this.handleEnd(ev)
          return
        }

        // Focus next visible option, if any,
        // or the filter input, if applicable.
        if (document.activeElement === this.el || filterHasFocus) {
          if (this.filter && !filterHasFocus) {
            this.getFilterInput().focus()
          } else {
            const nextOpt = Array.from(
              this.listboxRef.querySelectorAll<
                HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement
              >('ld-option-internal, ld-optgroup-internal')
            ).find((opt) => !isLdOptInternalHidden(opt))
            this.selectAndFocus(ev, nextOpt)
          }
        } else {
          this.focusNext(
            document.activeElement as
              | HTMLLdOptionInternalElement
              | HTMLLdOptgroupInternalElement,
            ev
          )
        }
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
          this.togglePopper()
          return
        }

        if (ev.metaKey || filterHasFocus) {
          this.handleHome(ev)
          return
        }

        // Focus previous visible option, if any.
        if (
          isLdOptionInternal(document.activeElement) ||
          isLdOptgroupInternal(document.activeElement)
        ) {
          this.focusPrev(document.activeElement, ev)
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
      case ' ': {
        // If trigger has focus: Toggle popper.
        ev.stopImmediatePropagation()
        ev.preventDefault()
        if (this.expanded) {
          this.togglePopper()
        } else {
          this.togglePopper()
        }
        break
      }
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
        // If expanded and popper element has focus within: Prevent default.
        if (
          this.expanded &&
          document.activeElement.closest('[role="listbox"]') === this.listboxRef
        ) {
          ev.preventDefault()
          ev.stopImmediatePropagation()
        }
        break
      default:
        if (this.expanded) {
          ev.stopImmediatePropagation()
          ev.preventDefault()
          this.typeAheadHandler.typeAhead(ev.key)
        }
    }
  }

  @Listen('click', {
    target: 'window',
  })
  handleClickOutside(ev) {
    // closest utility function must be used here for the component
    // to work in Solid.js app, where ev.target can be an element
    // within the shadow DOM of the component.
    // Usage of ev.composedPath() is required for penetrating shadow DOM.
    const target = 'composedPath' in ev ? ev.composedPath().at(0) : ev.target
    if (
      ev.isTrusted &&
      closest('ld-select', target) !== this.el &&
      closest('[role="listbox"]', target) !== this.listboxRef
    ) {
      this.expanded = false
      this.resetFilter()
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

  private resetFilter = () => {
    this.allOptsFiltered = false
    this.filterMatchesOpt = false

    if (!this.filter) return
    const filterInput = this.getFilterInput()
    if (!filterInput) return

    filterInput.value = ''
    const opts = this.internalOptionsContainerRef.querySelectorAll<
      HTMLLdOptionInternalElement | HTMLLdOptgroupInternalElement
    >('ld-option-internal, ld-optgroup-internal')

    opts.forEach((opt) => {
      opt.filtered = false
    })

    this.typeAheadHandler.options = opts
    this.listboxRef.resetFilter()
  }

  private handleFocusEvent = (ev: FocusEvent) => {
    // Emit event only, if focus is not within the select component.
    if (
      ev.relatedTarget === null ||
      ev.relatedTarget === this.listboxRef ||
      isLdOption(ev.relatedTarget) ||
      isLdOptgroup(ev.relatedTarget) ||
      closest('ld-select', ev.relatedTarget as HTMLElement) === this.el
    ) {
      ev.stopImmediatePropagation()
    } else {
      // Focus left the select component - make sure it is not expanded.
      this.expanded = false
      this.resetFilter()
    }
  }

  private handleTriggerClick = (ev: Event) => {
    ev.preventDefault()

    if (this.isDisabled()) return

    this.togglePopper()
  }

  private handleClearClick = (ev: MouseEvent) => {
    ev.preventDefault()
    ev.stopImmediatePropagation()

    if (this.isDisabled()) return

    this.clearSelection()
    this.focusInner()
  }

  private handleClearSingleClick = (ev: MouseEvent, optionValue) => {
    ev.preventDefault()
    ev.stopImmediatePropagation()

    if (this.isDisabled()) return

    this.selected = this.selected.filter(
      (selection) => selection.value !== optionValue
    )

    this.listboxRef
      .querySelector(`ld-option-internal[value='${optionValue}']`)
      ?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
  }

  componentWillLoad() {
    const outerForm = this.el.closest('form')

    if (this.name && (outerForm || this.form)) {
      this.renderHiddenInput = true
    }

    const customIcon = this.el.querySelector('ld-icon')
    this.hasCustomIcon = !!customIcon

    if (customIcon) {
      customIcon.setAttribute('size', this.size)
    }

    this.initOptions()

    if (this.renderHiddenInput) {
      this.updateSelectedHiddenInputs(this.selected)
    }

    registerAutofocus(this.autofocus)
  }

  componentDidLoad() {
    setTimeout(() => {
      this.initSlotChangeObserver()
      this.typeAheadHandler = new TypeAheadHandler(
        this.listboxRef.querySelectorAll('ld-option-internal')
      )
      this.initialized = true
    })
  }

  componentDidUpdate() {
    if (this.expanded) {
      this.updatePopper()
    }
  }

  disconnectedCallback() {
    /* istanbul ignore if */
    if (this.popperObserver) this.popperObserver.disconnect()
    /* istanbul ignore if */
    if (this.popper) this.popper.destroy()
    /* istanbul ignore if */
    if (this.slotChangeObserver) this.slotChangeObserver.disconnect()
    /* istanbul ignore if */
    if (this.listboxRef) this.listboxRef.remove()
    /* istanbul ignore if */
    if (this.typeAheadHandler) this.typeAheadHandler.clearTimeout()
  }

  render() {
    // Endable detached mode if any display mode is set.
    const detached = !!this.mode

    // Implicitly enable inline mode if ghost mode is enabled.
    const inline = this.mode === 'inline' || this.mode === 'ghost'

    // Disallow ghost in combination with multiple select mode.
    const ghost = !this.multiple && this.mode === 'ghost'

    const cl = [
      'ld-select',
      this.disabled && 'ld-select--disabled',
      this.size && `ld-select--${this.size}`,
      this.invalid && 'ld-select--invalid',
      this.expanded && 'ld-select--expanded',
      detached && 'ld-select--detached',
      inline && 'ld-select--inline',
      ghost && 'ld-select--ghost',
    ]

    const triggerCl = [
      'ld-select__btn-trigger',
      this.invalid && 'ld-select__btn-trigger--invalid',
      detached && 'ld-select__btn-trigger--detached',
      inline && 'ld-select__btn-trigger--inline',
      ghost && 'ld-select__btn-trigger--ghost',
    ]

    const triggerIconCl = [
      'ld-select__icon',
      this.expanded && 'ld-select__icon--rotated',
    ]

    const triggerHtml = this.multiple
      ? this.placeholder
      : this.selected[0]?.html || this.placeholder

    const triggerText = this.multiple
      ? this.placeholder
      : this.selected[0]?.text || this.placeholder

    return (
      <Host>
        <div
          class={getClassNames(cl)}
          aria-disabled={this.isDisabled() ? 'true' : undefined}
          part="root"
          onBlur={this.handleFocusEvent}
          onFocusout={this.handleFocusEvent}
          style={
            this.expanded
              ? {
                  zIndex: '2147483647', // Highest possible z-index
                }
              : undefined
          }
        >
          {this.renderHiddenInput && <slot name="hidden" />}
          <div class="ld-select__slot-container" part="slot-container">
            <slot></slot>
          </div>
          <div
            class="ld-select__select"
            part="select"
            ref={(el) => (this.selectRef = el)}
          >
            <div
              class={getClassNames(triggerCl)}
              role="button"
              part="btn-trigger focusable"
              tabindex={
                this.disabled && !isAriaDisabled(this.ariaDisabled)
                  ? undefined
                  : this.ldTabindex
              }
              aria-disabled={this.isDisabled() ? 'true' : undefined}
              aria-haspopup="listbox"
              aria-expanded={this.expanded ? 'true' : 'false'}
              aria-label={triggerText}
              onClick={this.handleTriggerClick}
              ref={(el) => (this.triggerRef = el)}
            >
              {this.multiple && this.selected.length ? (
                <div
                  class="ld-select__selection-list-container"
                  part="selection-list-container"
                >
                  <ul
                    class="ld-select__selection-list"
                    part="selection-list"
                    aria-label="Selected options"
                    ref={(el) => (this.selectionListRef = el)}
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
                              innerHTML={sanitize(
                                selection.html,
                                this.sanitizeConfig
                              )}
                            ></span>

                            <button
                              disabled={this.isDisabled() ? true : undefined}
                              class="ld-select__btn-clear-single"
                              part="btn-clear-single focusable"
                              onClick={(ev) => {
                                this.handleClearSingleClick.call(
                                  this,
                                  ev,
                                  selection.value
                                )
                              }}
                            >
                              {/* custom icon cross */}
                              <svg
                                class="ld-select__btn-clear-single-icon"
                                part="icon-clear-single"
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
                            />
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <span
                  class="ld-select__btn-trigger-text-wrapper"
                  title={triggerText}
                  part="trigger-text-wrapper"
                >
                  <span
                    class="ld-select__btn-trigger-text"
                    part="trigger-text"
                    innerHTML={sanitize(triggerHtml, this.sanitizeConfig)}
                  ></span>
                </span>
              )}

              {this.selected?.length && this.multiple ? (
                <button
                  class="ld-select__btn-clear"
                  disabled={this.isDisabled() ? true : undefined}
                  onClick={this.handleClearClick}
                  ref={(el) => (this.btnClearRef = el)}
                  part="btn-clear focusable"
                >
                  {/* custom icon cross */}
                  <svg
                    class="ld-select__btn-clear-icon"
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
                /* custom icon arrow-down */
                <svg
                  class={getClassNames(triggerIconCl)}
                  role={'presentation'}
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
            allOptionsFiltered={this.allOptsFiltered}
            creatable={this.creatable}
            createButtonLabel={this.createButtonLabel}
            createInputLabel={this.createInputLabel}
            detached={detached}
            expanded={this.expanded}
            filter={this.filter}
            filterMatchesOption={this.filterMatchesOpt}
            filterPlaceholder={this.filterPlaceholder}
            onBlur={this.handleFocusEvent}
            onFocusout={this.handleFocusEvent}
            onLdselectfilterchange={this.handleFilterChange}
            onLdselectfiltercreate={this.handleFilterCreate}
            popperClass={this.popperClass}
            ref={(el) => (this.listboxRef = el)}
            role="listbox"
            size={this.size}
            theme={this.theme}
          >
            <div
              ref={(el) => (this.internalOptionsContainerRef = el)}
              innerHTML={sanitize(this.internalOptionsHTML, {
                ...(typeof this.sanitizeConfig === 'string'
                  ? JSON.parse(this.sanitizeConfig)
                  : this.sanitizeConfig),
                ADD_ATTR: ['prevent-deselection'],
              })}
              part="options-container"
            ></div>
          </ld-select-popper>
        </div>
      </Host>
    )
  }
}
