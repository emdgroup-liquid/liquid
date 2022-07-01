import { newE2EPage } from '@stencil/core/testing'

describe('ld-switch-item', () => {
  it('renders', async () => {
    const page = await newE2EPage()
    await page.setContent('<ld-switch-item></ld-switch-item>')

    const element = await page.find('ld-switch-item')
    expect(element).toHaveClass('hydrated')
  })
})
