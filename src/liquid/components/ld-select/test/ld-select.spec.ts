import MutationObserver from 'mutation-observer'
import { newSpecPage, SpecPage } from '@stencil/core/testing'
import { LdSelect } from '../ld-select'
import { LdSelectPopper } from '../ld-select-popper/ld-select-popper'
import { LdLabel } from '../../ld-label/ld-label'
import { LdOption } from '../ld-option/ld-option'
import { LdOptionInternal } from '../ld-option-internal/ld-option-internal'

const components = [
  LdSelect,
  LdSelectPopper,
  LdOption,
  LdOptionInternal,
  LdLabel,
]

let triggerableMutationObserver
const TriggerableMutationObserver = function (cb) {
  triggerableMutationObserver = new MutationObserver(cb)
  triggerableMutationObserver.trigger = cb
  return triggerableMutationObserver
}

global.MutationObserver = TriggerableMutationObserver as MutationObserver

class FocusManager {
  focus(el) {
    const doc = (document as unknown) as { activeElement: Element }
    doc.activeElement = el
  }
}
const focusManager = new FocusManager()

async function triggerPopperWithClick(page: SpecPage) {
  const ldSelect = page.body.querySelector('ld-select')
  const btnTrigger = ldSelect.shadowRoot.querySelector(
    '.ld-select__btn-trigger'
  )
  ;(btnTrigger as HTMLElement).focus = jest.fn(focusManager.focus)
  ;(btnTrigger as HTMLElement).click()
  await page.waitForChanges()
  jest.advanceTimersByTime(0)
}

async function getInternalOptions(page: SpecPage) {
  const ldSelectPopper = await page.body.querySelector('ld-select-popper')
  const ldInternalOptions = Array.from(
    ldSelectPopper.querySelectorAll('ld-option-internal')
  )
  const internalOptions = ldInternalOptions.map((ldInternalOption) =>
    ldInternalOption.shadowRoot.querySelector('.ld-option-internal')
  ) as HTMLElement[]
  return {
    ldInternalOptions,
    internalOptions,
  }
}

function getShadow(page: SpecPage) {
  const ldSelect = page.root
  const doc = (document as unknown) as { activeElement: Element }
  const shadowDoc = (ldSelect.shadowRoot as unknown) as {
    activeElement: Element
  }
  return {
    doc,
    shadowDoc,
  }
}

describe('ld-select', () => {
  afterEach(() => {
    jest.advanceTimersToNextTimer()
  })

  it('renders popper element with copies of slotted options', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const ldSelectEl = ldSelect.shadowRoot.querySelector('.ld-select')
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )

    expect(ldSelectEl.classList.contains('ld-select--expanded')).toBeFalsy()
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    btnTrigger.dispatchEvent(new Event('click'))
    await page.waitForChanges()

    const ldSelectPopper = await page.body.querySelector('ld-select-popper')
    const ldSelectPopperEl = await ldSelectPopper.shadowRoot.querySelector(
      '.ld-select-popper'
    )
    const slottedOptions = ldSelect.querySelectorAll('ld-option')
    const internalOptions = ldSelectPopper.querySelectorAll(
      'ld-option-internal'
    )

    expect(ldSelectEl.classList.contains('ld-select--expanded')).toBeTruthy()
    expect(slottedOptions.length).toEqual(2)
    expect(internalOptions.length).toEqual(2)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(
      ldSelectPopperEl.classList.contains('ld-select-popper--expanded')
    ).toBeTruthy()
  })

  it('throws if no ld-option(s) are passed to the default slot', async () => {
    expect.assertions(1)
    try {
      const page = await newSpecPage({
        components,
        html: '<ld-select placeholder="Pick a fruit" name="fruit"></ld-select>',
      })

      await triggerPopperWithClick(page)
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError(
          'ld-select requires at least one ld-option element as a child, but found none.'
        )
      )
    }
  })

  it('applies size prop', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const ldSelectEl = ldSelect.shadowRoot.querySelector('.ld-select')
    expect(ldSelectEl.classList.contains('ld-select--sm')).toBeTruthy()

    await triggerPopperWithClick(page)

    const ldSelectPopper = await page.body.querySelector('ld-select-popper')
    const ldSelectPopperEl = await ldSelectPopper.shadowRoot.querySelector(
      '.ld-select-popper'
    )
    expect(
      ldSelectPopperEl.classList.contains('ld-select-popper--sm')
    ).toBeTruthy()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" popper-class="ld-select__popper--fruits">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )

    const fruitHandlers = {
      onFocus() {
        return
      },
      onBlur() {
        return
      },
    }

    const spyFocus = jest.spyOn(fruitHandlers, 'onFocus')
    ldSelect.addEventListener('focus', fruitHandlers.onFocus)

    btnTrigger.dispatchEvent(new Event('focus'))
    expect(spyFocus).toHaveBeenCalledTimes(1)

    const spyBlur = jest.spyOn(fruitHandlers, 'onBlur')
    ldSelect.addEventListener('blur', fruitHandlers.onBlur)

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    const Ev = CustomEvent as any // allows setting relatedTarget on CustomEvent

    // blurs with focus moving to window
    btnTrigger.dispatchEvent(
      new Ev('focusout', {
        bubbles: true,
        relatedTarget: window,
      })
    )
    expect(spyBlur).toHaveBeenCalledTimes(1)

    btnTrigger['focus'] = jest.fn(focusManager.focus)
    btnTrigger.dispatchEvent(new Event('click'))
    await page.waitForChanges()
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    const ldSelectPopper = await page.body.querySelector('ld-select-popper')

    const internalOptions = ldSelectPopper.querySelectorAll(
      'ld-option-internal'
    )

    expect(internalOptions.length).toEqual(2)

    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[1].dispatchEvent(
      new Ev('focusout', {
        bubbles: true,
        relatedTarget: internalOptions[0],
      }) // actually FocusEvent
    )
    expect(spyBlur).toHaveBeenCalledTimes(1)

    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[1].dispatchEvent(
      new Ev('focusout', {
        bubbles: true,
        relatedTarget: window,
      }) // actually FocusEvent
    )
    expect(spyBlur).toHaveBeenCalledTimes(2)
  })

  it('passes down prop selected option prop to internal options', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected='true'>Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions } = await getInternalOptions(page)

    expect(ldInternalOptions.length).toEqual(2)
    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
  })

  it('allows selecting and deselecting an option', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].click()
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].click()
    await page.waitForChanges()

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('emits input event on selection of an option', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { internalOptions } = await getInternalOptions(page)

    const ldSelect = page.root

    const spyInput = jest.fn()
    ldSelect.addEventListener('input', spyInput)

    internalOptions[0].click()
    await page.waitForChanges()

    expect(spyInput).toHaveBeenCalledTimes(1)
    expect(spyInput).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: ['apple'],
      })
    )

    internalOptions[1].click()
    await page.waitForChanges()

    expect(spyInput).toHaveBeenCalledTimes(2)
    expect(spyInput).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: ['banana'],
      })
    )
  })

  it('deselects a selected option if another option is selected in single select mode', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[1].click()
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
  })

  it('does not deselect a selected option if preventDeselection prop is truethy in single select mode', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" prevent-deselection>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].click()
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('does not deselect a selected option if another option is selected in multiple select mode', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    ldInternalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[1].click()
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
  })

  it('selects and deselects options via key down Enter and Space', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    ldInternalOptions[0].focus = jest.fn(focusManager.focus)
    ldInternalOptions[1].focus = jest.fn(focusManager.focus)
    const doc = (document as unknown) as { activeElement: Element }

    doc.activeElement = internalOptions[1]
    ldInternalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)

    ldInternalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    )
    await page.waitForChanges()

    ldInternalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)

    ldInternalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('sets detached class on popper element', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" mode="detached">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelectPopper = await page.body.querySelector('ld-select-popper')
    const selectPopper = ldSelectPopper.shadowRoot.querySelector(
      '.ld-select-popper'
    )

    expect(
      selectPopper.classList.contains('ld-select-popper--detached')
    ).toBeTruthy()
  })

  it('sets inline class on trigger button', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" mode="inline">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )

    expect(
      btnTrigger.classList.contains('ld-select__btn-trigger--inline')
    ).toBeTruthy()
  })

  it('sets ghost class on trigger button', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" mode="ghost">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )

    expect(
      btnTrigger.classList.contains('ld-select__btn-trigger--ghost')
    ).toBeTruthy()
  })

  it('clears selection on clear click', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions } = await getInternalOptions(page)

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)

    const ldSelect = page.root
    const btnClear = await ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-clear'
    )
    btnClear.dispatchEvent(new MouseEvent('click'))
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('ignores key down Space and Enter if component has no focus', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = page.body

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('delegates key down Space and Enter to clear button click handler if the clear button has focus', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = await page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    const btnClear = await ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-clear'
    )
    doc.activeElement = btnClear

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('delegates key down Space and Enter to clear single button click handler if the clear single button has focus', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = await page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    const btnClearSingle = await ldSelect.shadowRoot.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(2)
    doc.activeElement = btnClearSingle[0]

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('clears single selection on clear single button click', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    let btnClearSingle = ldSelect.shadowRoot.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(2)

    await triggerPopperWithClick(page)
    const { ldInternalOptions } = await getInternalOptions(page)

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    ldInternalOptions[0].focus = jest.fn(focusManager.focus)
    ldInternalOptions[1].focus = jest.fn(focusManager.focus)

    btnClearSingle[0].dispatchEvent(new Event('click'))
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)

    btnClearSingle = ldSelect.shadowRoot.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(1)
  })

  it('expands popper on key down ArrowDown if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root

    const { doc, shadowDoc } = getShadow(page)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down Space if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root

    const { doc, shadowDoc } = getShadow(page)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('closes expanded popper on key down Enter if trigger button has focus', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root

    const { doc, shadowDoc } = getShadow(page)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('closes expanded popper on key down Escape', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const { doc } = getShadow(page)

    const { ldInternalOptions } = await getInternalOptions(page)

    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    expect(ldInternalOptions.length).toEqual(2)
    ldInternalOptions[0].focus = jest.fn(focusManager.focus)
    ldInternalOptions[1].focus = jest.fn(focusManager.focus)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    doc.activeElement = ldInternalOptions[1]

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('does not close expanded popper on key down Tab', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const { doc } = getShadow(page)
    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down ArrowDown if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const { doc, shadowDoc } = getShadow(page)
    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down ArrowDown with meta key if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const { doc, shadowDoc } = getShadow(page)
    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down ArrowDown and focuses on selected internal option in single select mode if popper is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[1].click()
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)

    const ldSelect = page.root
    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    const { doc, shadowDoc } = getShadow(page)
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(1)
  })

  it('expands popper on key down ArrowDown without setting focus on selected internal option in multiple select mode if popper is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[1].click()
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    const { doc, shadowDoc } = getShadow(page)
    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(0)
  })

  it('sets focus on next internal option on key down ArrowDown if popper is expanded', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const { doc, shadowDoc } = getShadow(page)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = ldInternalOptions[0]
    shadowDoc.activeElement = internalOptions[0]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = ldInternalOptions[1]
    shadowDoc.activeElement = internalOptions[1]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = ldInternalOptions[2]
    shadowDoc.activeElement = internalOptions[2]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = ldInternalOptions[3]
    shadowDoc.activeElement = internalOptions[3]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  it('sets focus on last internal option on key down ArrowDown with meta key if popper is expanded', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = ldInternalOptions[3]
    shadowDoc.activeElement = internalOptions[3]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  it('sets focus on last internal option on key down End if popper is expanded', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = ldInternalOptions[3]
    shadowDoc.activeElement = internalOptions[3]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }))
    await page.waitForChanges()

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  it('expands popper on key down ArrowUp and focuses on selected internal option in single select mode if popper is not expanded yet', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    await triggerPopperWithClick(page)

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(1)
  })

  it('sets focus on trigger button on key down ArrowUp if popper is expanded and first option has focus', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(2)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')

    doc.activeElement = ldInternalOptions[0]
    shadowDoc.activeElement = internalOptions[0]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
  })

  it('sets focus on trigger button on key down ArrowUp with meta key if popper is expanded', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')
    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    doc.activeElement = ldInternalOptions[2]
    shadowDoc.activeElement = internalOptions[2]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', metaKey: true })
    )
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', metaKey: true })
    )
    await page.waitForChanges()

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)
  })

  it('sets focus on trigger button on key down Home if popper is expanded', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')
    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    doc.activeElement = ldInternalOptions[2]
    shadowDoc.activeElement = internalOptions[2]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }))
    await page.waitForChanges()

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)
  })

  it('selects multiple options on key down ArrowDown with Shift if popper is expanded in multiple mode', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange">Orange</ld-option>
          <ld-option value="cherry" selected>Cherry</ld-option>
          <ld-option value="strawberry">Strawberry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(5)
    internalOptions.forEach((internalOption) => {
      internalOption.focus = jest.fn(focusManager.focus)
    })

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = ldInternalOptions[1]
    shadowDoc.activeElement = internalOptions[1]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = ldInternalOptions[2]
    shadowDoc.activeElement = internalOptions[2]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = ldInternalOptions[3]
    shadowDoc.activeElement = internalOptions[3]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).not.toEqual(null)
  })

  it('selects multiple options on key down ArrowUp with Shift if popper is expanded in multiple mode', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
          <ld-option value="orange">Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
          <ld-option value="strawberry">Strawberry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const { ldInternalOptions, internalOptions } = await getInternalOptions(
      page
    )

    const { doc, shadowDoc } = getShadow(page)

    expect(internalOptions.length).toEqual(5)
    internalOptions.forEach((internalOption) => {
      internalOption.focus = jest.fn(focusManager.focus)
    })

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = ldInternalOptions[3]
    shadowDoc.activeElement = internalOptions[3]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = ldInternalOptions[2]
    shadowDoc.activeElement = internalOptions[2]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = ldInternalOptions[1]
    shadowDoc.activeElement = internalOptions[1]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
    )
    await page.waitForChanges()

    expect(ldInternalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(ldInternalOptions[4].getAttribute('selected')).toEqual(null)
  })

  it('supports typeahead focus setting', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
          <ld-option value="pineapple">Pineapple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="plum">Plum</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)

    const ldSelect = page.root
    const { internalOptions } = await getInternalOptions(page)

    const { doc, shadowDoc } = getShadow(page)

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    internalOptions.forEach((internalOption) => {
      internalOption.focus = jest.fn(focusManager.focus)
    })
    const spyFocusAppl = jest.spyOn(internalOptions[0], 'focus')
    const spyFocusPear = jest.spyOn(internalOptions[1], 'focus')
    const spyFocusPine = jest.spyOn(internalOptions[2], 'focus')
    const spyFocusBana = jest.spyOn(internalOptions[3], 'focus')
    const spyFocusPlum = jest.spyOn(internalOptions[4], 'focus')

    expect(internalOptions.length).toEqual(5)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }))
    await page.waitForChanges()

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(1)
    expect(spyFocusPine).toHaveBeenCalledTimes(0)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(0)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }))
    await page.waitForChanges()

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(1)
    expect(spyFocusPine).toHaveBeenCalledTimes(0)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(600)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }))
    await page.waitForChanges()

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(2)
    expect(spyFocusPine).toHaveBeenCalledTimes(0)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'i' }))
    await page.waitForChanges()

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(2)
    expect(spyFocusPine).toHaveBeenCalledTimes(1)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(600)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'i' }))
    await page.waitForChanges()

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(3)
    expect(spyFocusPine).toHaveBeenCalledTimes(1)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(600)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }))
    await page.waitForChanges()

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(3)
    expect(spyFocusPine).toHaveBeenCalledTimes(1)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)
  })

  it('prevents interaction with disabled prop', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" disabled>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    expect(btnTrigger.getAttribute('aria-disabled')).toEqual('true')

    const { doc, shadowDoc } = getShadow(page)
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    await triggerPopperWithClick(page)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('prevents interaction with aria-disabled prop set to a truethy value', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root

    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    expect(btnTrigger.getAttribute('aria-disabled')).toEqual('true')

    const { doc, shadowDoc } = getShadow(page)
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = ldSelect
    shadowDoc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    await triggerPopperWithClick(page)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('closes popper on click outside the component', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
        </ld-select>
      `,
    })

    await triggerPopperWithClick(page)
    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    page.body.dispatchEvent(new Event('touchend', { bubbles: true }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('closes popper on outer label click and sets focus on the trigger button', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <ld-label>
          Favorite fruit
          <ld-select placeholder="Pick a fruit" name="fruit">
            <ld-option value="apple">Apple</ld-option>
            <ld-option value="pear">Pear</ld-option>
          </ld-select>
        </ld-label>
      `,
    })

    await triggerPopperWithClick(page)
    const ldLabel = page.body.querySelector('ld-label')
    const ldSelect = page.body.querySelector('ld-select')
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')

    ldLabel.dispatchEvent(new Event('touchend', { bubbles: true }))
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    expect(spyFocusBtnTrigger).toHaveBeenCalled()
  })

  it('displays more indicator with maxRows prop set in multiple mode', async () => {
    jest
      .spyOn(
        (LdSelect.prototype as unknown) as { isOverflowing },
        'isOverflowing'
      )
      .mockImplementation(() => true)

    const page = await newSpecPage({
      components,
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple max-rows="2" style="max-width: 14rem">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
          <ld-option value="strawberry" selected>Strawberry</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const btnTrigger = ldSelect.shadowRoot.querySelector(
      '.ld-select__btn-trigger'
    )
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    const selectionList = btnTrigger.querySelector('.ld-select__selection-list')
    expect(selectionList).toBeTruthy()

    await triggerPopperWithClick(page)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    window.dispatchEvent(new Event('resize'))

    const selectionListItems = btnTrigger.querySelectorAll(
      '.ld-select__selection-list-item'
    )
    expect(selectionListItems.length).toEqual(3)

    const selectionListItemsOverflowing = btnTrigger.querySelectorAll(
      '.ld-select__selection-list-item--overflowing'
    )
    expect(selectionListItemsOverflowing.length).toBeGreaterThan(0)

    jest
      .spyOn(
        (LdSelect.prototype as unknown) as { isOverflowing },
        'isOverflowing'
      )
      .mockImplementation(() => false)

    const moreIndicator = btnTrigger.querySelector(
      '.ld-select__selection-list-more'
    )
    expect(moreIndicator).toBeTruthy()

    jest.restoreAllMocks()
  })

  // For some reason this test must come last, otherwise an exception is thrown.
  it('applies theme class on popper element', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <div class="ld-theme-tea">
          <ld-select placeholder="Pick a fruit" name="fruit">
            <ld-option value="apple">Apple</ld-option>
            <ld-option value="pear">Pear</ld-option>
          </ld-select>
        </div>
      `,
    })

    await triggerPopperWithClick(page)
    await page.waitForChanges()

    const ldSelectPopper = await page.body.querySelector('ld-select-popper')
    expect(ldSelectPopper.classList.contains('ld-theme-tea')).toBeTruthy()
  })

  it('creates hidden input field, if inside a form', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <form>
          <ld-select placeholder="Pick a fruit" name="fruit">
            <ld-option value="apple">Apple</ld-option>
            <ld-option value="banana">Banana</ld-option>
          </ld-select>
        </form>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders initially selected options as internal options and hidden input fields', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <form>
          <ld-select placeholder="Pick a fruit" name="fruit" multiple>
            <ld-option value="apple" selected>Apple</ld-option>
            <ld-option value="banana" selected>Banana</ld-option>
          </ld-select>
        </form>
      `,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('throws an error, if multiple options initially selected without multiple mode', async () => {
    expect.assertions(1)
    try {
      await newSpecPage({
        components,
        html: `
        <form>
          <ld-select placeholder="Pick a fruit" name="fruit">
            <ld-option value="apple" selected>Apple</ld-option>
            <ld-option value="banana" selected>Banana</ld-option>
          </ld-select>
        </form>
      `,
      })
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError(
          'Multiple selected options are not allowed, if multiple option is not set.'
        )
      )
    }
  })

  it('updates internal options in popper and hidden input fields', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <form>
          <ld-select placeholder="Pick a fruit" name="fruit" multiple>
            <ld-option value="apple">Apple</ld-option>
            <ld-option value="pear">Pear</ld-option>
            <ld-option value="banana">Banana</ld-option>
          </ld-select>
        </form>
      `,
    })

    await triggerPopperWithClick(page)
    const { internalOptions } = await getInternalOptions(page)
    const [option0, option1, option2] = internalOptions

    option0.click()
    option1.click()
    option2.click()
    option0.click() // deselect

    await page.waitForChanges()

    expect(page.body).toMatchSnapshot()
  })

  it('observes slot content changes and updates internal options in popper and hidden input fields', async () => {
    const page = await newSpecPage({
      components,
      html: `
        <form>
          <ld-select placeholder="Pick a fruit" name="fruit">
            <ld-option value="apple">Apple</ld-option>
            <ld-option value="pear">Pear</ld-option>
            <ld-option value="banana">Banana</ld-option>
          </ld-select>
        </form>
      `,
    })
    const ldSelect = page.root

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const slottedOptions = ldSelect.querySelectorAll('ld-option')
    expect(slottedOptions.length).toEqual(3)

    slottedOptions[2].setAttribute('selected', '')
    await page.waitForChanges()
    triggerableMutationObserver.trigger([])

    await page.waitForChanges()

    expect(page.body).toMatchSnapshot()
  })
})
