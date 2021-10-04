import MutationObserver from 'mutation-observer'
import { newSpecPage } from '@stencil/core/testing'
import { LdSelect } from '../ld-select'
import { LdTheme } from '../../ld-theme/ld-theme'
import { LdLabel } from '../../ld-label/ld-label'
import { LdOption } from '../ld-option/ld-option'
import { LdOptionInternal } from '../ld-option-internal/ld-option-internal'

global.MutationObserver = MutationObserver

class FocusManager {
  focus(el) {
    const doc = (document as unknown) as { activeElement: Element }
    doc.activeElement = el
  }
}
const focusManager = new FocusManager()

async function triggerPopper(page) {
  const ldSelect = page.body.querySelector('ld-select')
  const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
  btnTrigger.focus = jest.fn(focusManager.focus)
  btnTrigger.click()
  await page.waitForChanges()
  jest.advanceTimersByTime(0)
  await page.waitForChanges()
}

describe('ld-select', () => {
  it('renders popper element with copies of slotted options', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })
    jest.advanceTimersByTime(0)

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')

    expect(ldSelect.classList.contains('ld-select--expanded')).toBeFalsy()
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    btnTrigger.dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const popper = await page.body.querySelector('.ld-select__popper')
    const slottedOptions = ldSelect.querySelectorAll('ld-option')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(ldSelect.classList.contains('ld-select--expanded')).toBeTruthy()
    expect(slottedOptions.length).toEqual(2)
    expect(internalOptions.length).toEqual(2)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(
      popper.classList.contains('ld-select__popper--expanded')
    ).toBeTruthy()
  })

  it('throws if no ld-option(s) are passed to the default slot', async () => {
    expect.assertions(1)
    try {
      const page = await newSpecPage({
        components: [LdSelect, LdOption, LdOptionInternal],
        html: '<ld-select placeholder="Pick a fruit" name="fruit"></ld-select>',
      })

      await triggerPopper(page)
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
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)

    const ldSelect = page.root
    expect(ldSelect.classList.contains('ld-select--sm')).toBeTruthy()

    await triggerPopper(page)

    const popper = await page.body.querySelector('.ld-select__popper')
    expect(popper.classList.contains('ld-select__popper--sm')).toBeTruthy()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" popper-class="ld-select__popper--fruits">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
        <ld-select placeholder="Pick a vegetable" name="vegetable" popper-class="ld-select__popper--vegetables">
          <ld-option value="tomato">Tomato</ld-option>
          <ld-option value="cucumber">Cucumber</ld-option>
        </ld-select>
      `,
    })

    const ldSelectFruit = page.body.querySelector('ld-select[name="fruit"]')
    const btnTriggerFruit = ldSelectFruit.querySelector(
      '.ld-select__btn-trigger'
    )

    const ldSelectVegetable = page.body.querySelector(
      'ld-select[name="vegetable"]'
    )
    const btnTriggerVegetable = ldSelectVegetable.querySelector(
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
    ldSelectFruit.addEventListener('focus', fruitHandlers.onFocus)

    window.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalledTimes(0)

    btnTriggerVegetable.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalledTimes(0)

    btnTriggerFruit.dispatchEvent(new Event('focus'))
    jest.advanceTimersByTime(0)
    expect(spyFocus).toHaveBeenCalledTimes(1)

    const spyBlur = jest.spyOn(fruitHandlers, 'onBlur')
    ldSelectFruit.addEventListener('blur', fruitHandlers.onBlur)

    window.dispatchEvent(new Event('blur', { bubbles: true }))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalledTimes(0)

    btnTriggerVegetable.dispatchEvent(new Event('blur', { bubbles: true }))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalledTimes(0)

    btnTriggerFruit.dispatchEvent(new Event('blur', { bubbles: true }))
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalledTimes(1)

    btnTriggerFruit['focus'] = jest.fn(focusManager.focus)
    btnTriggerFruit.dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)
    await page.waitForChanges()
    expect(btnTriggerFruit.getAttribute('aria-expanded')).toEqual('true')

    const popperFruits = await page.body.querySelector(
      '.ld-select__popper--fruits'
    )
    const internalOptionsFruits = popperFruits.querySelectorAll(
      'ld-option-internal'
    )

    expect(internalOptionsFruits.length).toEqual(2)

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any*/
    const Ev = CustomEvent as any

    internalOptionsFruits[1].focus = jest.fn(focusManager.focus)
    internalOptionsFruits[1].dispatchEvent(
      new Ev('blur', {
        bubbles: true,
        relatedTarget: internalOptionsFruits[0],
      }) // actually FocusEvent
    )
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalledTimes(1)

    internalOptionsFruits[1].focus = jest.fn(focusManager.focus)
    internalOptionsFruits[1].dispatchEvent(
      new Ev('blur', {
        bubbles: true,
        detail: 0,
      }) // actually FocusEvent
    )
    jest.advanceTimersByTime(0)
    expect(spyBlur).toHaveBeenCalledTimes(2)
  })

  it('passes down prop selected option prop to internal options', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected='true'>Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = await page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(2)
    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
  })

  it('allows selecting and deselecting an option', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = await page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].click()
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].click()
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('deselects a selected option if another option is selected in single select mode', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = await page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[1].click()
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
  })

  it('does not deselect a selected option if preventDeselection prop is truethy in single select mode', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" prevent-deselection>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = await page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].click()
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('does not deselect a selected option if another option is selected in multiple select mode', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = await page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[1].click()
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
  })

  it('selects and deselects options via key down Enter and Space', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    const doc = (document as unknown) as { activeElement: Element }

    doc.activeElement = internalOptions[1]
    internalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    )
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)

    internalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    )
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    internalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)

    internalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('sets multiple class on popper element', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = page.body.querySelector('.ld-select__popper')

    expect(
      popper.classList.contains('ld-select__popper--multiple')
    ).toBeTruthy()
  })

  it('sets invalid class on popper element', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" invalid>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = page.body.querySelector('.ld-select__popper')

    expect(popper.classList.contains('ld-select__popper--invalid')).toBeTruthy()
  })

  it('sets detached class on popper element', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" mode="detached">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const popper = page.body.querySelector('.ld-select__popper')

    expect(
      popper.classList.contains('ld-select__popper--detached')
    ).toBeTruthy()
  })

  it('sets inline class on trigger button', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" mode="inline">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })
    jest.advanceTimersByTime(0)

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')

    expect(
      btnTrigger.classList.contains('ld-select__btn-trigger--inline')
    ).toBeTruthy()
  })

  it('sets ghost class on trigger button', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" mode="ghost">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })
    jest.advanceTimersByTime(0)

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')

    expect(
      btnTrigger.classList.contains('ld-select__btn-trigger--ghost')
    ).toBeTruthy()
  })

  it('clears selection on clear click', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const ldSelect = page.root
    const popper = await page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)

    const btnClear = await ldSelect.querySelector('.ld-select__btn-clear')
    btnClear.dispatchEvent(new MouseEvent('click'))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
  })

  it('ignores key down Space and Enter if component has no focus', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = page.body

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('delegates key down Space and Enter to clear button click handler if the clear button has focus', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = await page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    const btnClear = await ldSelect.querySelector('.ld-select__btn-clear')
    // ;(document as any).activeElement = btnTrigger
    doc.activeElement = btnClear

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('delegates key down Space and Enter to clear single button click handler if the clear single button has focus', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = await page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    const btnClearSingle = await ldSelect.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(2)
    // ;(document as any).activeElement = btnTrigger
    doc.activeElement = btnClearSingle[0]

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('clears single selection on clear single button click', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const ldSelect = page.root
    let btnClearSingle = ldSelect.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(2)
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    btnClearSingle[0].dispatchEvent(new Event('click'))
    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)

    btnClearSingle = ldSelect.querySelectorAll('.ld-select__btn-clear-single')
    expect(btnClearSingle.length).toEqual(1)
  })

  it('expands popper on key down ArrowDown if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down Space if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('closes expanded popper on key down Enter if trigger button has focus', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('closes expanded popper on key down Escape', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')
    expect(internalOptions.length).toEqual(2)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    doc.activeElement = internalOptions[1]

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('does not close expanded popper on key down Tab', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down ArrowDown if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down ArrowDown with meta key if it is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const doc = (document as unknown) as { activeElement: Element }
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = btnTrigger

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
  })

  it('expands popper on key down ArrowDown and focuses on selected internal option in single select mode if popper is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(1)
  })

  it('expands popper on key down ArrowDown without setting focus on selected internal option in multiple select mode if popper is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(0)
  })

  it('sets focus on next internal option on key down ArrowDown if popper is expanded', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = internalOptions[0]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = internalOptions[1]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = internalOptions[2]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = internalOptions[3]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  it('sets focus on last internal option on key down ArrowDown with meta key if popper is expanded', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = btnTrigger
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = internalOptions[3]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  it('sets focus on last internal option on key down End if popper is expanded', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = internalOptions[3]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  it('expands popper on key down ArrowUp and focuses on selected internal option in single select mode if popper is not expanded yet', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
        </ld-select>
      `,
    })

    jest.advanceTimersByTime(0)
    await page.waitForChanges()

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(1)
  })

  it('sets focus on trigger button on key down ArrowUp if popper is expanded and first option has focus', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(2)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')

    doc.activeElement = internalOptions[0]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
  })

  it('sets focus on trigger button on key down ArrowUp with meta key if popper is expanded', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')
    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    doc.activeElement = internalOptions[2]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', metaKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = btnTrigger
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', metaKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)
  })

  it('sets focus on trigger button on key down Home if popper is expanded', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
          <ld-option value="orange" disabled>Orange</ld-option>
          <ld-option value="cherry">Cherry</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(4)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    internalOptions[2].focus = jest.fn(focusManager.focus)
    internalOptions[3].focus = jest.fn(focusManager.focus)

    jest.advanceTimersByTime(0)

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')
    const spyFocus0 = jest.spyOn(internalOptions[0], 'focus')
    const spyFocus1 = jest.spyOn(internalOptions[1], 'focus')
    const spyFocus2 = jest.spyOn(internalOptions[2], 'focus')
    const spyFocus3 = jest.spyOn(internalOptions[3], 'focus')

    doc.activeElement = internalOptions[2]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusBtnTrigger).toHaveBeenCalledTimes(1)
    expect(spyFocus0).toHaveBeenCalledTimes(0)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)
  })

  it('selects multiple options on key down ArrowDown with Shift if popper is expanded in multiple mode', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
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

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')
    internalOptions.forEach((internalOption) => {
      internalOption.focus = jest.fn(focusManager.focus)
    })

    expect(internalOptions.length).toEqual(5)
    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = internalOptions[1]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = internalOptions[2]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = internalOptions[3]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', shiftKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).not.toEqual(null)
  })

  it('selects multiple options on key down ArrowUp with Shift if popper is expanded in multiple mode', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
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

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')
    internalOptions.forEach((internalOption) => {
      internalOption.focus = jest.fn(focusManager.focus)
    })

    expect(internalOptions.length).toEqual(5)
    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = internalOptions[3]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = internalOptions[2]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)

    doc.activeElement = internalOptions[1]
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', shiftKey: true })
    )
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[2].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[3].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[4].getAttribute('selected')).toEqual(null)
  })

  it('supports typeahead focus setting', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
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

    await triggerPopper(page)

    const doc = (document as unknown) as { activeElement: Element }

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    const popper = page.body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')
    internalOptions.forEach((internalOption) => {
      internalOption.focus = jest.fn(focusManager.focus)
    })
    const spyFocusAppl = jest.spyOn(internalOptions[0], 'focus')
    const spyFocusPear = jest.spyOn(internalOptions[1], 'focus')
    const spyFocusPine = jest.spyOn(internalOptions[2], 'focus')
    const spyFocusBana = jest.spyOn(internalOptions[3], 'focus')
    const spyFocusPlum = jest.spyOn(internalOptions[4], 'focus')

    expect(internalOptions.length).toEqual(5)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(1)
    expect(spyFocusPine).toHaveBeenCalledTimes(0)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(0)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'l' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(1)
    expect(spyFocusPine).toHaveBeenCalledTimes(0)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(600)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(2)
    expect(spyFocusPine).toHaveBeenCalledTimes(0)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'i' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(2)
    expect(spyFocusPine).toHaveBeenCalledTimes(1)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(600)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'i' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(3)
    expect(spyFocusPine).toHaveBeenCalledTimes(1)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(600)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(spyFocusAppl).toHaveBeenCalledTimes(0)
    expect(spyFocusPear).toHaveBeenCalledTimes(3)
    expect(spyFocusPine).toHaveBeenCalledTimes(1)
    expect(spyFocusBana).toHaveBeenCalledTimes(0)
    expect(spyFocusPlum).toHaveBeenCalledTimes(1)
  })

  it('prevents interaction with disabled prop', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" disabled>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
        </ld-select>
      `,
    })
    jest.advanceTimersByTime(0)

    const ldSelect = page.root
    expect(ldSelect.classList.contains('ld-select--expanded')).toBeFalsy()

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-disabled')).toEqual('true')

    const doc = (document as unknown) as { activeElement: Element }
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('prevents interaction with aria-disabled prop set to a truethy value', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" aria-disabled="true">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
        </ld-select>
      `,
    })
    jest.advanceTimersByTime(0)

    const ldSelect = page.root
    expect(ldSelect.classList.contains('ld-select--expanded')).toBeFalsy()

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-disabled')).toEqual('true')

    const doc = (document as unknown) as { activeElement: Element }
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    doc.activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('closes popper on click outside the component', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="pear">Pear</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)
    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    page.body.dispatchEvent(new Event('touchend', { bubbles: true }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
  })

  it('closes popper on outer label click and sets focus on the trigger button', async () => {
    const page = await newSpecPage({
      components: [LdLabel, LdSelect, LdOption, LdOptionInternal],
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

    await triggerPopper(page)
    const ldLabel = page.body.querySelector('ld-label')
    const ldSelect = page.body.querySelector('ld-select')
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    const spyFocusBtnTrigger = jest.spyOn(btnTrigger as HTMLElement, 'focus')

    ldLabel.dispatchEvent(new Event('touchend', { bubbles: true }))
    await page.waitForChanges()
    jest.advanceTimersByTime(0)

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    expect(spyFocusBtnTrigger).toHaveBeenCalled()
  })

  xit('displays more indicator with maxRows prop set in multiple mode', async () => {
    jest.useRealTimers()
    Object.defineProperty(LdSelect.prototype, 'isOverflowing', {
      configurable: true,
      value: () => true,
    })

    const page = await newSpecPage({
      components: [LdTheme, LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick some fruits" name="fruits" multiple max-rows="2" style="max-width: 14rem">
          <ld-option value="apple" selected>Apple</ld-option>
          <ld-option value="banana" selected>Banana</ld-option>
          <ld-option value="strawberry" selected>Strawberry</ld-option>
        </ld-select>
      `,
    })
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    const selectionList = btnTrigger.querySelector('.ld-select__selection-list')
    expect(selectionList).toBeTruthy()

    const selectionListItems = btnTrigger.querySelectorAll(
      '.ld-select__selection-list-item'
    )
    expect(selectionListItems.length).toEqual(3)

    const selectionListItemsOverflowing = btnTrigger.querySelectorAll(
      '.ld-select__selection-list-item--overflowing'
    )
    expect(selectionListItemsOverflowing.length).toBeGreaterThan(0)

    const moreIndicator = btnTrigger.querySelectorAll(
      '.ld-select__selection-list-more'
    )
    expect(moreIndicator.length).toEqual(1)
    jest.useFakeTimers()
  })

  // For some reason this test must come last, otherwise an exception is thrown.
  it('applies theme class on popper element', async () => {
    const page = await newSpecPage({
      components: [LdTheme, LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-theme name="tea">
          <ld-select placeholder="Pick a fruit" name="fruit">
            <ld-option value="apple">Apple</ld-option>
            <ld-option value="pear">Pear</ld-option>
          </ld-select>
        </ld-theme>
      `,
    })

    await triggerPopper(page)
    const popper = page.body.querySelector('.ld-select__popper')
    expect(popper.classList.contains('ld-theme-tea')).toBeTruthy()
  })
})
