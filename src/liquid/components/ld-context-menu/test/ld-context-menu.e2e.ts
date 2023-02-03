import { newE2EPage } from '@stencil/core/testing'

describe('ld-context-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<ld-context-menu></ld-context-menu>')

    const element = await page.find('ld-context-menu')
    expect(element).toHaveClass('hydrated')
  })
})
