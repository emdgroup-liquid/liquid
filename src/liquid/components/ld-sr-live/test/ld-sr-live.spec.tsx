import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdSrLive } from '../ld-sr-live'

describe('ld-sr-live', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdSrLive],
      template: () => <ld-sr-live />,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('informs', async () => {
    const page = await newSpecPage({
      components: [LdSrLive],
      template: () => <ld-sr-live />,
    })
    const statusRegion = page.root.shadowRoot.querySelector('[role="status"]')

    window.dispatchEvent(
      new CustomEvent('ldSrLiveInfo', {
        detail: 'Your profile has been updated.',
      })
    )
    await page.waitForChanges()
    expect(statusRegion.textContent).toEqual('Your profile has been updated.​')

    window.dispatchEvent(
      new CustomEvent('ldSrLiveInfo', {
        detail: 'Your profile has been updated.',
      })
    )
    await page.waitForChanges()
    expect(statusRegion.textContent).toEqual('Your profile has been updated.')
  })

  it('alerts', async () => {
    const page = await newSpecPage({
      components: [LdSrLive],
      template: () => <ld-sr-live />,
    })
    const alertRegion = page.root.shadowRoot.querySelector('[role="alert"]')

    window.dispatchEvent(
      new CustomEvent('ldSrLiveAlert', {
        detail: 'An error has occured.',
      })
    )
    await page.waitForChanges()
    expect(alertRegion.textContent).toEqual('An error has occured.​')

    window.dispatchEvent(
      new CustomEvent('ldSrLiveAlert', {
        detail: 'An error has occured.',
      })
    )
    await page.waitForChanges()
    expect(alertRegion.textContent).toEqual('An error has occured.')
  })
})
