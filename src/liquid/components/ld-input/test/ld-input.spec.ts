import { newSpecPage } from '@stencil/core/testing'
import { LdInput } from '../ld-input'

describe('ld-input', () => {
  it('renders as dark input by default', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input>
        <input class="ld-input ld-input--dark">
      </ld-input>
    `)
  })
  it('renders as dark input with prop mode set to "dark"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input mode="dark"></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input mode="dark">
        <input class="ld-input ld-input--dark">
      </ld-input>
    `)
  })
  it('renders as light input with prop mode set to "light"', async () => {
    const page = await newSpecPage({
      components: [LdInput],
      html: `<ld-input mode="light"></ld-input>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-input mode="light">
        <input class="ld-input ld-input--light">
      </ld-input>
    `)
  })
})
