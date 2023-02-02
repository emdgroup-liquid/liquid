import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../ld-input'
import { getTriggerableMutationObserver } from '../../../utils/mutationObserver'

describe('ld-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders as dark input with prop tone set to "dark"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input tone="dark" />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input value="yada-yada" />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders type file', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders type file (multiline)', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" multiline />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('updates value prop on value change', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input value="yada-yada" />`,
    })
    const ldInput = page.root
    expect(ldInput.value).toBe('yada-yada')

    const input = ldInput.shadowRoot.querySelector('input')
    expect(input.value).toBe('yada-yada')

    input.value = 'yoda-yoda'
    input.dispatchEvent(new Event('input'))
    await page.waitForChanges()

    expect(ldInput).toMatchSnapshot()
  })

  // TODO: Uncomment, as soon as Stencil's JSDom implementation
  // supports bubbling of composed events into the light DOM.
  xit('emits focus and blur event', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const ldInput = page.root
    const input = page.root.shadowRoot.querySelector('input')

    const blurHandler = jest.fn()
    const focusHandler = jest.fn()

    ldInput.addEventListener('focus', focusHandler)
    input.dispatchEvent(new Event('focus', { bubbles: true, composed: true }))
    ldInput.addEventListener('blur', blurHandler)
    input.dispatchEvent(new Event('blur', { bubbles: true, composed: true }))
    await page.waitForChanges()

    expect(focusHandler).toHaveBeenCalled()
    expect(blurHandler).toHaveBeenCalled()
  })

  it('emits change and ldchange events', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const ldInput = page.root
    const input = ldInput.shadowRoot.querySelector('input')

    const changeHandler = jest.fn()
    ldInput.addEventListener('change', changeHandler)
    const ldchangeHandler = jest.fn()
    ldInput.addEventListener('ldchange', ldchangeHandler)

    input.value = 'test'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    await page.waitForChanges()

    expect(changeHandler).toHaveBeenCalledTimes(1)
    expect(ldchangeHandler).toHaveBeenCalledTimes(1)
  })

  it('emits ldchange event with file list', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" />`,
    })
    const ldInput = page.root
    const input = ldInput.shadowRoot.querySelector('input')
    input.files = ['foo', 'bar'] as unknown as FileList

    const ldchangefileHandler = jest.fn()
    ldInput.addEventListener('ldchangefile', ldchangefileHandler)

    input.value = 'test'
    input.dispatchEvent(new InputEvent('change', { bubbles: true }))
    await page.waitForChanges()

    expect(ldchangefileHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: ['foo', 'bar'] })
    )
  })

  // TODO: Uncomment, as soon as Stencil's JSDom implementation
  // supports bubbling of composed events into the light DOM.
  xit('emits input event', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const ldInput = page.root
    const input = ldInput.shadowRoot.querySelector('input')

    const inputHandler = jest.fn()
    ldInput.addEventListener('input', inputHandler)

    input.value = 'test'
    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    await page.waitForChanges()

    expect(inputHandler).toHaveBeenCalledTimes(1)
  })

  it('emits ldinput event', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const ldInput = page.root
    const input = ldInput.shadowRoot.querySelector('input')

    const ldinputHandler = jest.fn()
    ldInput.addEventListener('ldinput', ldinputHandler)

    input.value = 'test'
    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    await page.waitForChanges()

    expect(ldinputHandler).toHaveBeenCalledTimes(1)
  })

  it('emits ldinput event with file list', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" />`,
    })
    const ldInput = page.root
    const input = ldInput.shadowRoot.querySelector('input')
    input.files = ['foo', 'bar'] as unknown as FileList

    const ldinputfileHandler = jest.fn()
    ldInput.addEventListener('ldinputfile', ldinputfileHandler)

    input.value = 'test'
    input.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
    await page.waitForChanges()

    expect(ldinputfileHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: ['foo', 'bar'] })
    )
  })

  it('renders with slot start', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="start">hi</span></ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with slot end', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end">hello</span></ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with both slots', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="start">hi</span><span slot="end">hello</span></ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('focuses the input on click of non-interactive elment inside the component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end"><span id="banana">🍌</span></span></ld-input>`,
    })
    const ldInput = page.root
    const banana = ldInput.querySelector('#banana') as HTMLElement
    const input = ldInput.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    banana.dispatchEvent(new Event('click', { bubbles: true }))
    ldInput.dispatchEvent(new Event('click'))

    expect(input.focus).toHaveBeenCalledTimes(2)
  })

  it('does not focus the input on click of non-interactive elment inside the component if already focused', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input><span slot="end"><span id="banana">🍌</span></span></ld-input>`,
    })
    const ldInput = page.root
    const banana = ldInput.querySelector('#banana') as HTMLElement
    const input = ldInput.shadowRoot.querySelector('input')

    const doc = ldInput.shadowRoot as unknown as { activeElement: Element }
    doc.activeElement = input

    input.focus = jest.fn()
    banana.dispatchEvent(new Event('click', { bubbles: true }))
    ldInput.dispatchEvent(new Event('click'))

    expect(input.focus).not.toHaveBeenCalled()
  })

  it('does not focus the input on click of non-interactive elment inside the component if disabled', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input disabled><span slot="end"><span id="banana">🍌</span></span></ld-input>`,
    })
    const ldInput = page.root
    const banana = ldInput.querySelector('#banana') as HTMLElement
    const input = ldInput.shadowRoot.querySelector('input')

    const doc = ldInput.shadowRoot as unknown as { activeElement: Element }
    doc.activeElement = input

    input.focus = jest.fn()
    banana.dispatchEvent(new Event('click', { bubbles: true }))
    ldInput.dispatchEvent(new Event('click'))

    expect(input.focus).not.toHaveBeenCalled()
  })

  it('forwards click to input (default)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    const dispatchSpy = jest.spyOn(input, 'dispatchEvent')
    root.click()

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ bubbles: false })
    )
    expect(dispatchSpy).toHaveBeenCalledTimes(1)
  })

  it('does not forward click to input if the input is the event target', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    const dispatchSpy = jest.spyOn(input, 'dispatchEvent')

    const ev = {
      type: 'click',
      bubbles: true,
      composed: true,
      composedPath: () => [input],
    } as unknown as MouseEvent
    root.dispatchEvent(ev)

    expect(dispatchSpy).not.toHaveBeenCalled()
  })

  it('forwards click to input (multiline)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input multiline />`,
    })
    const textarea = root.shadowRoot.querySelector('textarea')

    textarea.focus = jest.fn()
    const dispatchSpy = jest.spyOn(textarea, 'dispatchEvent')
    root.click()

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ bubbles: false })
    )
  })

  it('allows to set inner focus (default)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input />`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await root.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })

  it('allows to set inner focus (multiline)', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input multiline />`,
    })
    const textarea = root.shadowRoot.querySelector('textarea')

    textarea.focus = jest.fn()
    await root.focusInner()

    expect(textarea.focus).toHaveBeenCalled()
  })

  it('removes size from ld-icon web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <ld-icon name="placeholder" size="sm" slot="start"></ld-icon>
        <ld-icon name="placeholder" size="lg" slot="end"></ld-icon>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('removes size from ld-icon css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <svg class="ld-icon ld-icon--sm" slot="start"></svg>
        <svg class="ld-icon ld-icon--lg" slot="end"></svg>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size sm on ld-icon web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <ld-icon name="placeholder" slot="start"></ld-icon>
        <ld-icon name="placeholder" size="lg" slot="end"></ld-icon>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size lg on ld-icon web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="lg">
        <ld-icon name="placeholder" slot="start"></ld-icon>
        <ld-icon name="placeholder" size="sm" slot="end"></ld-icon>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size sm on ld-icon css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <svg class="ld-icon" slot="start"></svg>
        <svg class="ld-icon ld-icon--lg" slot="end"></svg>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size lg ld-icon css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="lg">
        <svg class="ld-icon" slot="start"></svg>
        <svg class="ld-icon ld-icon--sm" slot="end"></svg>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('removes size from ld-button web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <ld-button size="sm" slot="start">X</ld-button>
        <ld-button size="lg" slot="end">Y</ld-button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('removes size from ld-button css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input>
        <button class="ld-button ld-button--sm" slot="start">X</button>
        <button class="ld-button ld-button--lg" slot="end">Y</button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size sm on ld-button web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <ld-button slot="start">X</ld-button>
        <ld-button size="lg" slot="end">Y</ld-button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size lg on ld-button web component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="lg">
        <ld-button slot="start">X</ld-button>
        <ld-button size="sm" slot="end">Y</ld-button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size sm on ld-button css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="sm">
        <button class="ld-button" slot="start">X</button>
        <button class="ld-button ld-button--lg" slot="end">Y</button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets size lg on ld-button css component', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input size="lg">
        <button class="ld-button" slot="start">X</button>
        <button class="ld-button ld-button--sm" slot="end">Y</button>
      </ld-input>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('creates hidden input field, if inside a form', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input name="example" /></form>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('creates hidden input field, if name attribute is added', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input /></form>`,
    })

    root.setAttribute('name', 'test')
    getTriggerableMutationObserver().trigger([{ attributeName: 'name' }])
    await waitForChanges()
    expect(root).toMatchSnapshot()
  })

  it('creates hidden input field, if form attribute is given', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input form="example-form" name="example" />`,
    })
    expect(root).toMatchSnapshot()
  })

  it('creates hidden input field, if form attribute is added', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input name="example" />`,
    })

    root.setAttribute('form', 'test')
    getTriggerableMutationObserver().trigger([{ attributeName: 'form' }])
    await waitForChanges()
    expect(root).toMatchSnapshot()
  })

  it('copies form autocomplete attribute, if it has not one of its own', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<form autocomplete="off"><ld-input name="example" /></form>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('uses own autocomplete attribute even if the form has a different one', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<form autocomplete="off"><ld-input name="example" autocomplete="name" /></form>`,
    })
    await waitForChanges()
    expect(root).toMatchSnapshot()
  })

  it('fills hidden input field with initial attributes', async () => {
    const { root } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input dirname="example.dir" form="formName" name="example" value="hello"  /></form>`,
    })
    expect(root).toMatchSnapshot()
  })

  it('updates hidden input field value', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input name="example" /></form>`,
    })
    const input = root.shadowRoot.querySelector('input')

    input.value = 'test'
    input.dispatchEvent(new Event('input'))
    await waitForChanges()

    expect(root).toMatchSnapshot()
  })

  it('replaces hidden input field with clone of input field of type file', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input type="file" name="example" form="example-form" />`,
    })
    const hiddenInput = root.querySelector('input')
    hiddenInput.replaceWith = jest.fn()

    const inputInShadow = root.shadowRoot.querySelector('input')
    expect(inputInShadow.type).toEqual('file')
    inputInShadow.value = 'foo.txt'
    inputInShadow.files = ['foo'] as unknown as FileList
    expect(inputInShadow.files).toEqual(['foo'])
    inputInShadow.dispatchEvent(new Event('input'))
    await waitForChanges()

    expect(hiddenInput.replaceWith).toHaveBeenCalled()
  })

  it('updates hidden input field attributes', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input name="example" /></form>`,
    })

    root.setAttribute('dirname', 'test.dir')
    root.setAttribute('form', 'test')
    root.setAttribute('name', 'test')
    root.setAttribute('value', 'test')
    getTriggerableMutationObserver().trigger([
      { attributeName: 'dirname' },
      { attributeName: 'form' },
      { attributeName: 'name' },
      { attributeName: 'value' },
    ])
    await waitForChanges()

    expect(root).toMatchSnapshot()
    expect(root.querySelector('input').dirName).toBe('test.dir')
  })

  it('removes hidden input field attributes', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input dirname="example.dir" form="formName" name="example" value="hello" /></form>`,
    })

    const ldInput = page.root

    ldInput.removeAttribute('dirname')
    ldInput.removeAttribute('form')
    ldInput.removeAttribute('value')
    getTriggerableMutationObserver().trigger([
      { attributeName: 'dirname' },
      { attributeName: 'form' },
      { attributeName: 'value' },
    ])
    await page.waitForChanges()

    expect(ldInput).toMatchSnapshot()
    expect(ldInput.querySelector('input').getAttribute('dirname')).toBeNull()
  })

  it('removes hidden input field, if name attribute is removed', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input dirname="example.dir" form="formName" name="example" value="hello" /></form>`,
    })

    root.removeAttribute('name')
    getTriggerableMutationObserver().trigger([{ attributeName: 'name' }])
    await waitForChanges()
    expect(root).toMatchSnapshot()
  })

  it('removes hidden input field, if form attribute is removed', async () => {
    const { root, waitForChanges } = await newSpecPage({
      components: [LdInput],
      html: `<ld-input form="example-form" name="example" />`,
    })

    root.removeAttribute('form')
    getTriggerableMutationObserver().trigger([{ attributeName: 'form' }])
    await waitForChanges()
    expect(root).toMatchSnapshot()
  })

  it('requests submit on enter, if inside a form', async () => {
    const { body, root } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input name="example" /></form>`,
    })

    const form = body.querySelector('form')
    form.requestSubmit = jest.fn()
    const input = root.shadowRoot.querySelector('input')
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(form.requestSubmit).toHaveBeenCalled()
  })

  it('does not requests submit on enter with aria-disabled set to true', async () => {
    const { body, root } = await newSpecPage({
      components: [LdInput],
      html: `<form><ld-input name="example" aria-disabled="true" /></form>`,
    })

    const form = body.querySelector('form')
    form.requestSubmit = jest.fn()
    const input = root.shadowRoot.querySelector('input')
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(form.requestSubmit).not.toHaveBeenCalled()
  })

  it('requests submit on enter, if form attribute is given', async () => {
    const { body, root } = await newSpecPage({
      components: [LdInput],
      html: `
      <form id="test"></form>
      <ld-input form="test" name="example" />`,
    })

    const form = body.querySelector('form')
    form.requestSubmit = jest.fn()
    const input = root.shadowRoot.querySelector('input')
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(form.requestSubmit).toHaveBeenCalled()
  })

  it('prefers form attribute over surrounding form when requesting submit', async () => {
    const { body, root } = await newSpecPage({
      components: [LdInput],
      html: `
      <form id="test"></form>
      <form id="surrounding"><ld-input form="test" name="example" /></form>`,
    })

    const referencedForm = body.querySelector<HTMLFormElement>('form#test')
    const surroundingForm = body.querySelector<HTMLFormElement>('#surrounding')
    referencedForm.requestSubmit = jest.fn()
    surroundingForm.requestSubmit = jest.fn()
    const input = root.shadowRoot.querySelector('input')
    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )

    expect(referencedForm.requestSubmit).toHaveBeenCalled()
    expect(surroundingForm.requestSubmit).not.toHaveBeenCalled()
  })
})
