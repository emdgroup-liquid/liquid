import { newE2EPage } from '@stencil/core/testing'

jest.useRealTimers()

describe('ld-icon', () => {
  it('renders with name prop', async () => {
    const page = await newE2EPage()
    await page.setContent('<ld-icon name="alarm"></ld-icon>')

    const element = await page.find('ld-icon')
    expect(element).toHaveClass('hydrated')

    const svg = await element.find('svg')
    expect(svg).toBeDefined()
  })

  it('does not render with invalid name prop', async () => {
    const page = await newE2EPage()
    await page.setContent('<ld-icon name="asdfasdfasdf"></ld-icon>')

    const element = await page.find('ld-icon')
    expect(element).toHaveClass('hydrated')

    const svg = await element.find('svg')
    expect(svg).toBeNull()
  })

  it('renders with slot', async () => {
    const page = await newE2EPage()
    await page.setContent(`<ld-icon>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
      </svg>
    </ld-icon>`)

    const element = await page.find('ld-icon')
    expect(element).toHaveClass('hydrated')

    const svg = await element.find('svg')
    expect(svg).toBeDefined()
  })
})
