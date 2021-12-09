jest.mock('../../../utils/cloneAttributes')
import { newSpecPage } from '@stencil/core/testing'
import { LdButton } from '../../ld-button/ld-button'
import { LdIcon } from '../../ld-icon/ld-icon'
import { LdMenu } from '../../ld-menu/ld-menu'
import { LdMenuItem } from '../../ld-menu/ld-menu-item/ld-menu-item'
import { LdHeader } from '../ld-header'

describe('ld-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header site-name="Liquid Oxygen" logo-title="Home"></ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders without site name', async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header></ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with clickable logo', async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header site-name="Liquid Oxygen" logo-title="Home" logo-url="#"></ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with custom logo', async () => {
    const page = await newSpecPage({
      components: [LdHeader, LdIcon],
      html: `
      <ld-header site-name="Liquid Oxygen" logo-title="Home">
        <ld-icon name="rocket" size="lg" slot="logo"></ld-icon>
      </ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with custom clickable logo', async () => {
    const page = await newSpecPage({
      components: [LdHeader, LdIcon],
      html: `
      <ld-header site-name="Liquid Oxygen" logo-title="Home" logo-url="#">
        <ld-icon name="rocket" size="lg" slot="logo"></ld-icon>
      </ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with buttons', async () => {
    const page = await newSpecPage({
      components: [LdButton, LdHeader],
      html: `
      <ld-header site-name="Liquid Oxygen">
        <ld-button slot="end" type="button">Register</ld-button>
        <ld-button mode="secondary" slot="end" type="button">Login</ld-button>
      </ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with menu', async () => {
    const page = await newSpecPage({
      components: [LdHeader, LdMenu, LdMenuItem],
      html: `
      <ld-header site-name="Liquid Oxygen">
        <ld-menu slot="menu">
          <ld-menu-item href="#">Menu Item 1</ld-icon>
          <ld-menu-item href="#">Menu Item 2</ld-icon>
          <ld-menu-item href="#">Menu Item 3</ld-icon>
        </ld-menu>
      </ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with burger menu button', async () => {
    const page = await newSpecPage({
      components: [LdButton, LdHeader, LdIcon],
      html: `
      <ld-header site-name="Liquid Oxygen">
        <ld-button slot="start" type="button">
          <ld-icon name="burger-menu"></ld-icon>
        </ld-button>
      </ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders sticky', async () => {
    const page = await newSpecPage({
      components: [LdHeader],
      html: `<ld-header site-name="Liquid Oxygen" logo-title="Home" sticky></ld-header>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
