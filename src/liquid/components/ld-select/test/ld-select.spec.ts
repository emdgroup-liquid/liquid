import MutationObserver from 'mutation-observer'
import { newSpecPage } from '@stencil/core/testing'
import { LdSelect } from '../ld-select'
import { LdOption } from '../../ld-option/ld-option'
import { LdOptionInternal } from '../../ld-option/ld-option-internal'

global.MutationObserver = MutationObserver

class FocusManager {
  focus(el) {
    ;(document as any).activeElement = el
  }
}
const focusManager = new FocusManager()

async function triggerPopper(page) {
  const ldSelect = page.root
  const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
  btnTrigger.focus = jest.fn(focusManager.focus)
  await btnTrigger.click()
  await page.waitForChanges()
  await new Promise((resolve) => setTimeout(resolve))
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
    await new Promise((resolve) => setTimeout(resolve))

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')

    expect(ldSelect.classList.contains('ld-select--expanded')).toBeFalsy()
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')

    await btnTrigger.dispatchEvent(new Event('click'))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    const body = page.body
    const popper = await body.querySelector('.ld-select__popper')
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

  // it('throws if something other than an ld-option is passed to the default slot', async () => {
  //   expect.assertions(1)
  //   try {
  //     const page = await newSpecPage({
  //       components: [LdSelect, LdOption, LdOptionInternal],
  //       html: `
  //         <ld-select placeholder="Pick a fruit" name="fruit">
  //           <ld-option value="apple">Apple</ld-option>
  //           <option value="banana">Banana</option>
  //         </ld-select>
  //       `,
  //     })
  //
  //     await triggerPopper(page)
  //   } catch (err) {
  //     expect(err).toStrictEqual(
  //       TypeError(
  //         'ld-select accepts only ld-option elements as children, but found a "option" element.'
  //       )
  //     )
  //   }
  // })

  // it('throws if it can not parse custom Tether options', async () => {
  //   expect.assertions(1)
  //   try {
  //     const page = await newSpecPage({
  //       components: [LdSelect, LdOption, LdOptionInternal],
  //       html: `
  //         <ld-select placeholder="Pick a fruit" name="fruit" tetherOptions="asdf">
  //           <ld-option value="apple">Apple</ld-option>
  //           <ld-option value="banana">Banana</ld-option>
  //         </ld-select>
  //       `,
  //     })
  //
  //     await triggerPopper(page)
  //   } catch (err) {
  //     expect(err.toString()).toEqual(
  //       'ld-select failed parsing custom Tether options with JSON.parse.'
  //     )
  //   }
  // })

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

    await new Promise((resolve) => setTimeout(resolve))

    const ldSelect = page.root
    expect(ldSelect.classList.contains('ld-select--sm')).toBeTruthy()

    await triggerPopper(page)

    const body = page.body
    const popper = await body.querySelector('.ld-select__popper')
    expect(popper.classList.contains('ld-select__popper--sm')).toBeTruthy()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdSelect, LdOption, LdOptionInternal],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')

    const handlers = {
      onFocus() {
        return
      },
      onBlur() {
        return
      },
    }

    const spyFocus = jest.spyOn(handlers, 'onFocus')
    ldSelect.addEventListener('focus', handlers.onFocus)
    await btnTrigger.dispatchEvent(new Event('focus'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyFocus).toHaveBeenCalledTimes(1)

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldSelect.addEventListener('blur', handlers.onBlur)
    await btnTrigger.dispatchEvent(new Event('blur', { bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyBlur).toHaveBeenCalledTimes(1)
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

    const body = page.body
    const popper = await body.querySelector('.ld-select__popper')
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

    const body = page.body
    const popper = await body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    await internalOptions[0].click()
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    await internalOptions[0].click()
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    const body = page.body
    const popper = await body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    await internalOptions[1].click()
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
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

    const body = page.body
    const popper = await body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)

    internalOptions[1].focus = jest.fn(focusManager.focus)
    await internalOptions[1].click()
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    const body = page.body
    const popper = body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)
    const doc = document as any

    doc.activeElement = internalOptions[1]
    internalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: ' ', bubbles: true })
    )
    await new Promise((resolve) => setTimeout(resolve))
    await page.waitForChanges()

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    doc.activeElement = internalOptions[1]
    internalOptions[1].dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
    await new Promise((resolve) => setTimeout(resolve))
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

    const body = page.body
    const popper = body.querySelector('.ld-select__popper')

    expect(
      popper.classList.contains('ld-select__popper--multiple')
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

    const body = page.body
    const ldSelect = page.root
    const popper = await body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)

    const btnClear = await ldSelect.querySelector('.ld-select__btn-clear')
    await btnClear.dispatchEvent(new MouseEvent('click'))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    ;(document as any).activeElement = page.body

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    await new Promise((resolve) => setTimeout(resolve))
    await page.waitForChanges()

    const ldSelect = await page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    const btnClear = await ldSelect.querySelector('.ld-select__btn-clear')
    // ;(document as any).activeElement = btnTrigger
    ;(document as any).activeElement = btnClear

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await new Promise((resolve) => setTimeout(resolve))
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

    await new Promise((resolve) => setTimeout(resolve))
    await page.waitForChanges()

    const ldSelect = await page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    const btnClearSingle = await ldSelect.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(2)
    // ;(document as any).activeElement = btnTrigger
    ;(document as any).activeElement = btnClearSingle[0]

    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await new Promise((resolve) => setTimeout(resolve))
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

    await new Promise((resolve) => setTimeout(resolve))
    await page.waitForChanges()

    const body = page.body
    const ldSelect = page.root
    let btnClearSingle = ldSelect.querySelectorAll(
      '.ld-select__btn-clear-single'
    )
    expect(btnClearSingle.length).toEqual(2)
    const popper = body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).not.toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    btnClearSingle[0].dispatchEvent(new Event('click'))
    await new Promise((resolve) => setTimeout(resolve))
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

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    ;(document as any).activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    ;(document as any).activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    const ldSelect = page.root
    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    ;(document as any).activeElement = btnTrigger

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', metaKey: true })
    )
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

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

    await new Promise((resolve) => setTimeout(resolve))
    await page.waitForChanges()

    const body = page.body
    const ldSelect = page.root
    const popper = body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).not.toEqual(null)
    internalOptions[0].focus = jest.fn(focusManager.focus)
    internalOptions[1].focus = jest.fn(focusManager.focus)

    const spyFocus = jest.spyOn(internalOptions[1], 'focus')

    await new Promise((resolve) => setTimeout(resolve))

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('false')
    btnTrigger['focus'] = jest.fn(focusManager.focus)
    ;(document as any).activeElement = btnTrigger

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    expect(spyFocus).toHaveBeenCalledTimes(1)
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

    const doc = document as any
    const body = page.body
    const ldSelect = page.root
    const popper = body.querySelector('.ld-select__popper')
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

    await new Promise((resolve) => setTimeout(resolve))

    const btnTrigger = ldSelect.querySelector('.ld-select__btn-trigger')
    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')
    btnTrigger['focus'] = jest.fn(focusManager.focus)

    doc.activeElement = btnTrigger
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(btnTrigger.getAttribute('aria-expanded')).toEqual('true')

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(0)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = internalOptions[0]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(0)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = internalOptions[1]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(0)

    doc.activeElement = internalOptions[2]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(1)

    doc.activeElement = internalOptions[3]
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    expect(spyFocus0).toHaveBeenCalledTimes(1)
    expect(spyFocus1).toHaveBeenCalledTimes(1)
    expect(spyFocus2).toHaveBeenCalledTimes(1)
    expect(spyFocus3).toHaveBeenCalledTimes(1)
  })

  // TODO: Write tests for disabled and aria-disabled ld-select
  // TODO: Write tests for disabled ld-option
})
