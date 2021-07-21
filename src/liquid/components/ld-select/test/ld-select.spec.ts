import MutationObserver from 'mutation-observer'
import { newSpecPage } from '@stencil/core/testing'
import { LdSelect } from '../ld-select'

global.MutationObserver = MutationObserver

async function triggerPopper(page) {
  const ldSelect = page.root
  const triggerButton = ldSelect.querySelector('.ld-select__btn-trigger')
  await triggerButton.dispatchEvent(new Event('click'))
  await page.waitForChanges()
  await new Promise((resolve) => setTimeout(resolve))
  await page.waitForChanges()
}

describe('ld-select', () => {
  it('renders popper element with copies of slotted options', async () => {
    const page = await newSpecPage({
      components: [LdSelect],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })
    await new Promise((resolve) => setTimeout(resolve))

    const ldSelect = page.root
    const triggerButton = ldSelect.querySelector('.ld-select__btn-trigger')

    expect(ldSelect.classList.contains('ld-select--expanded')).toBeFalsy()
    expect(triggerButton.getAttribute('aria-expanded')).toEqual('false')

    await triggerButton.dispatchEvent(new Event('click'))
    await page.waitForChanges()
    await new Promise((resolve) => setTimeout(resolve))

    const body = page.body
    const popper = body.querySelector('.ld-select__popper')
    const slottedOptions = ldSelect.querySelectorAll('ld-option')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(ldSelect.classList.contains('ld-select--expanded')).toBeTruthy()
    expect(slottedOptions.length).toEqual(2)
    expect(internalOptions.length).toEqual(2)
    expect(triggerButton.getAttribute('aria-expanded')).toEqual('true')
    expect(
      popper.classList.contains('ld-select__popper--expanded')
    ).toBeTruthy()
  })

  it('throws if no ld-option(s) are passed to the default slot', async () => {
    expect.assertions(1)
    try {
      const page = await newSpecPage({
        components: [LdSelect],
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
  //       components: [LdSelect],
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
  //       components: [LdSelect],
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
      components: [LdSelect],
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
    const popper = body.querySelector('.ld-select__popper')
    expect(popper.classList.contains('ld-select__popper--sm')).toBeTruthy()
  })

  it('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdSelect],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" size="sm">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    const ldSelect = page.root
    const triggerButton = ldSelect.querySelector('.ld-select__btn-trigger')

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
    await triggerButton.dispatchEvent(new Event('focus'))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyFocus).toHaveBeenCalledTimes(1)

    const spyBlur = jest.spyOn(handlers, 'onBlur')
    ldSelect.addEventListener('blur', handlers.onBlur)
    await triggerButton.dispatchEvent(new Event('blur', { bubbles: true }))
    await new Promise((resolve) => setTimeout(resolve))
    expect(spyBlur).toHaveBeenCalledTimes(1)
  })

  it('uses checkboxes on options in multiple mode', async () => {
    const page = await newSpecPage({
      components: [LdSelect],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" multiple>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const body = page.body
    const popper = body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(2)
    expect(internalOptions[0].getAttribute('checkbox')).toEqual('true')
    expect(internalOptions[1].getAttribute('checkbox')).toEqual('true')
  })

  it('passes down prop selected option prop to internal options', async () => {
    const page = await newSpecPage({
      components: [LdSelect],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit">
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana" selected='true'>Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const body = page.body
    const popper = body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(2)
    expect(internalOptions[0].getAttribute('selected')).toEqual(null)
    expect(internalOptions[1].getAttribute('selected')).toEqual('true')
  })

  it('passes down prop preventDeselection to internal options', async () => {
    const page = await newSpecPage({
      components: [LdSelect],
      html: `
        <ld-select placeholder="Pick a fruit" name="fruit" prevent-deselection>
          <ld-option value="apple">Apple</ld-option>
          <ld-option value="banana">Banana</ld-option>
        </ld-select>
      `,
    })

    await triggerPopper(page)

    const body = page.body
    const popper = body.querySelector('.ld-select__popper')
    const internalOptions = popper.querySelectorAll('ld-option-internal')

    expect(internalOptions.length).toEqual(2)
    expect(internalOptions[0].getAttribute('prevent-deselection')).toEqual(
      'true'
    )
    expect(internalOptions[1].getAttribute('prevent-deselection')).toEqual(
      'true'
    )
  })
})
