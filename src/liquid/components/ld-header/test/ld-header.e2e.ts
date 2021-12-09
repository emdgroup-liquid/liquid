import { getPageWithContent } from '../../../utils/e2e-tests'

jest.useRealTimers()

describe('ld-header', () => {
  it('default', async () => {
    const page = await getPageWithContent(
      `<ld-header site-name="Liquid Oxygen" logo-url="#"></ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('without logo link', async () => {
    const page = await getPageWithContent(
      `<ld-header site-name="Liquid Oxygen"></ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('without site name', async () => {
    const page = await getPageWithContent(
      `<ld-header logo-url="#"></ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('without custom logo', async () => {
    const page = await getPageWithContent(
      `
      <ld-header logo-url="#">
        <ld-icon name="rocket" slot="logo"></ld-icon>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with buttons', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#">
        <ld-button slot="end" type="button">
          <ld-icon name="pen"></ld-icon>
          Register
        </ld-button>
        <ld-button mode="secondary" slot="end" type="button">
          <ld-icon name="user"></ld-icon>
          Login
        </ld-button>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with icon only ghost button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#">
        <ld-button slot="end" type="button">
          <ld-icon name="pen"></ld-icon>
          Register
        </ld-button>
        <ld-button mode="ghost" slot="end" type="button">
          <ld-icon name="user"></ld-icon>
        </ld-button>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with burger menu button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#">
        <ld-button mode="ghost" slot="start" type="button">
          <ld-icon name="burger-menu"></ld-icon>
        </ld-button>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with menu', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#">
        <ld-menu slot="menu">
          <ld-menu-item selected href="#">Home</ld-menu-item>
          <ld-menu-item href="#">Products</ld-menu-item>
          <ld-menu-item href="#">Support</ld-menu-item>
        </ld-menu>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with menu and button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#">
        <ld-menu slot="menu">
          <ld-menu-item selected href="#">Home</ld-menu-item>
          <ld-menu-item href="#">Products</ld-menu-item>
          <ld-menu-item href="#">Support</ld-menu-item>
        </ld-menu>
        <ld-button mode="secondary" slot="end" type="button">
          <ld-icon name="user"></ld-icon>
          Profile
        </ld-button>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with menu and burger menu button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#">
        <ld-button mode="ghost" slot="start" type="button">
          <ld-icon name="burger-menu"></ld-icon>
        </ld-button>
        <ld-menu slot="menu">
          <ld-menu-item selected href="#">Home</ld-menu-item>
          <ld-menu-item href="#">Products</ld-menu-item>
          <ld-menu-item href="#">Support</ld-menu-item>
        </ld-menu>
      </ld-header>`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('sticky', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#" sticky></ld-header>
      <p>I am content.</p>`,
      { notWrapped: true }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('sticky after scroll', async () => {
    const page = await getPageWithContent(
      `
      <ld-header site-name="Liquid Oxygen" logo-url="#" sticky></ld-header>
      <p>I am content.</p>`,
      { notWrapped: true }
    )
    await page.mouse.wheel({ deltaY: 25 })
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('hidden', async () => {
    const page = await getPageWithContent(
      `
      <ld-header hidden site-name="Liquid Oxygen" logo-url="#" sticky></ld-header>
      <p>I am content.</p>`,
      { notWrapped: true }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
