import { getPageWithContent } from '../../../utils/e2e-tests'

jest.useRealTimers()

const logo = `<ld-typo class="logo" tag="div" variant="b6">M</ld-typo>`
const siteName = (flexGrow = false) =>
  `<ld-typo tag="div" variant="h5"${
    flexGrow ? ' style="flex-grow: 1"' : ''
  }>Liquid Oxygen</ld-typo>`
const defaultContent = `${logo}
${siteName()}`
const menu = (flexGrow = false) => `<ld-menu${
  flexGrow ? ' style="flex-grow: 1"' : ''
}>
  <ld-menu-item selected href="#">Home</ld-menu-item>
  <ld-menu-item href="#">Products</ld-menu-item>
  <ld-menu-item href="#">Support</ld-menu-item>
</ld-menu>`
const burgerMenu = `<ld-button mode="ghost" type="button">
<ld-icon name="burger-menu"></ld-icon>
</ld-button>`
const logoStyle = `<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }
</style>`

describe('ld-header', () => {
  it('default', async () => {
    const page = await getPageWithContent(
      `<ld-header>
        <a href="#" title="Home" style="text-decoration: none">
          ${logo}
        </a>
        ${siteName()}
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('without logo link', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${defaultContent}
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('without site name', async () => {
    const page = await getPageWithContent(
      `<ld-header>
        ${logo}
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with buttons', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${logo}
        ${siteName(true)}
        <ld-button type="button">
          <ld-icon name="pen"></ld-icon>
          Register
        </ld-button>
        <ld-button mode="secondary" type="button">
          <ld-icon name="user"></ld-icon>
          Login
        </ld-button>
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with icon only ghost button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${logo}
        ${siteName(true)}
        <ld-button type="button">
          <ld-icon name="pen"></ld-icon>
          Register
        </ld-button>
        <ld-button mode="ghost" title="Login" type="button">
          <ld-icon name="user"></ld-icon>
        </ld-button>
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with burger menu button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${burgerMenu}
        ${defaultContent}
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with menu', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${defaultContent}
        ${menu()}
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with menu and button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${defaultContent}
        ${menu(true)}
        <ld-button mode="secondary" type="button">
          <ld-icon name="user"></ld-icon>
          Profile
        </ld-button>
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('with menu and burger menu button', async () => {
    const page = await getPageWithContent(
      `
      <ld-header>
        ${burgerMenu}
        ${defaultContent}
        ${menu()}
      </ld-header>
      ${logoStyle}`
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('sticky', async () => {
    const page = await getPageWithContent(
      `
      <ld-header sticky>
        ${defaultContent}
      </ld-header>
      <p>I am content.</p>
      ${logoStyle}`,
      { notWrapped: true }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  xit('sticky after scroll', async () => {
    const page = await getPageWithContent(
      `
      <ld-header sticky>
        ${defaultContent}
      </ld-header>
      <p>I am content.</p>
      ${logoStyle}`,
      { notWrapped: true }
    )
    await page.mouse.wheel({ deltaY: 25 })
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })

  it('hidden', async () => {
    const page = await getPageWithContent(
      `
      <ld-header hidden sticky>
        ${defaultContent}
      </ld-header>
      <p>I am content.</p>
      ${logoStyle}`,
      { notWrapped: true }
    )
    const results = await page.compareScreenshot()
    expect(results).toMatchScreenshot()
  })
})
