import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdModal } from '../ld-modal'

async function transitionEnd(page) {
  const dialog = page.root.shadowRoot.querySelector('dialog')
  const transitionEndHandler = dialog['__listeners'].find(
    (l) => l.type === 'transitionEnd'
  ).handler
  transitionEndHandler({ target: dialog })
  await page.waitForChanges()
}

function getModal(page) {
  const ldModal = page.root as HTMLLdModalElement
  const dialog = ldModal.shadowRoot.querySelector('dialog')
  dialog['close'] = jest.fn()
  dialog['showModal'] = jest.fn()
  return ldModal
}

describe('ld-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal>Hello</ld-modal>,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('is open', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal open>Hello</ld-modal>,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('uses a blurry backdrop', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => (
        <ld-modal open blurry-backdrop>
          Hello
        </ld-modal>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  it('opens', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    ldModal.showModal()
    await page.waitForChanges()

    expect(ldModal.open).toBe(true)
  })

  it('closes via method call', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal open>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    ldModal.close()
    await page.waitForChanges()

    expect(ldModal.open).toBe(false)
  })

  it('closes via click on close button', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal open>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    ldModal.shadowRoot.querySelector<HTMLButtonElement>('.ld-modal__x').click()
    await page.waitForChanges()

    expect(ldModal.open).toBe(false)
  })

  it('closes via click on backdrop', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal open>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    ldModal.shadowRoot.querySelector('dialog').click()
    await page.waitForChanges()

    expect(ldModal.open).toBe(false)
  })

  it('closes via Escape key press', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal open>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await page.waitForChanges()

    expect(ldModal.open).toBe(false)
  })

  it('does not close via click on dialog content', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => (
        <ld-modal open>
          <button id="hello">Hello</button>
        </ld-modal>
      ),
    })

    const ldModal = getModal(page)

    ldModal.querySelector<HTMLButtonElement>('#hello').click()
    await page.waitForChanges()

    expect(ldModal.open).toBe(true)
  })

  it('does not display close button in header if not cancelable', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => (
        <ld-modal open cancelable={false}>
          <span slot="header">Hello</span>
          Hello
        </ld-modal>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })

  it('does not close via click on backdrop if not cancelable', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => (
        <ld-modal open cancelable={false}>
          Hello
        </ld-modal>
      ),
    })

    const ldModal = getModal(page)

    ldModal.shadowRoot.querySelector('dialog').click()
    await page.waitForChanges()

    expect(ldModal.open).toBe(true)
  })

  it('does not close via Escape key press if not cancelable', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => (
        <ld-modal open cancelable={false}>
          Hello
        </ld-modal>
      ),
    })

    const ldModal = getModal(page)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await page.waitForChanges()

    expect(ldModal.open).toBe(true)
  })

  it('emits ldmodalopening and ldmodalopened events', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    const openingHandler = jest.fn()
    const openedHandler = jest.fn()

    ldModal.addEventListener('ldmodalopening', openingHandler)
    ldModal.addEventListener('ldmodalopened', openedHandler)

    expect(openingHandler).toHaveBeenCalledTimes(0)
    expect(openedHandler).toHaveBeenCalledTimes(0)

    ldModal.showModal()
    await page.waitForChanges()

    expect(openingHandler).toHaveBeenCalledTimes(1)
    expect(openedHandler).toHaveBeenCalledTimes(0)

    await transitionEnd(page)

    expect(openingHandler).toHaveBeenCalledTimes(1)
    expect(openedHandler).toHaveBeenCalledTimes(1)
  })

  it('emits ldmodalclosing and ldmodalclosed events', async () => {
    const page = await newSpecPage({
      components: [LdModal],
      template: () => <ld-modal open>Hello</ld-modal>,
    })

    const ldModal = getModal(page)

    const closingHandler = jest.fn()
    const closedHandler = jest.fn()

    ldModal.addEventListener('ldmodalclosing', closingHandler)
    ldModal.addEventListener('ldmodalclosed', closedHandler)

    expect(closingHandler).toHaveBeenCalledTimes(0)
    expect(closedHandler).toHaveBeenCalledTimes(0)

    ldModal.close()
    await page.waitForChanges()

    expect(closingHandler).toHaveBeenCalledTimes(1)
    expect(closedHandler).toHaveBeenCalledTimes(0)

    await transitionEnd(page)

    expect(closingHandler).toHaveBeenCalledTimes(1)
    expect(closedHandler).toHaveBeenCalledTimes(1)
  })

  it('does not prevent cancel by default', () => {
    const ldModal = new LdModal()
    const ev = new Event('cancel')
    ldModal['handleCancel'](ev)
    expect(ev.defaultPrevented).toBeFalsy()
  })

  it('prevents cancel if not cancelable', () => {
    const ldModal = new LdModal()
    ldModal.cancelable = false
    const ev = new Event('cancel')
    ldModal['handleCancel'](ev)
    expect(ev.defaultPrevented).toBeTruthy()
  })

  it('closes on Esc key press', () => {
    const ldModal = new LdModal()
    ldModal.open = true
    ldModal['handleClose']()
    expect(ldModal.open).toBeFalsy()
  })

  it('does not throw when disconnecting before hydration', () => {
    const component = new LdModal()
    component.disconnectedCallback()
  })
})
