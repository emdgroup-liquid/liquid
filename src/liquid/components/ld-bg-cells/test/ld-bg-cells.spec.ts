import { newSpecPage } from '@stencil/core/testing'
import { LdBgCells } from '../ld-bg-cells'

describe('ld-bg-cells', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdBgCells],
      html: `<ld-bg-cells></ld-bg-cells>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with explicit type', async () => {
    const page = await newSpecPage({
      components: [LdBgCells],
      html: `<ld-bg-cells type="millipore"></ld-bg-cells>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with alias type', async () => {
    const page = await newSpecPage({
      components: [LdBgCells],
      html: `<ld-bg-cells type="qa-x2f-qc"></ld-bg-cells>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with three layers', async () => {
    const page = await newSpecPage({
      components: [LdBgCells],
      html: `<ld-bg-cells three-layers></ld-bg-cells>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with animation', async () => {
    const page = await newSpecPage({
      components: [LdBgCells],
      html: `<ld-bg-cells animated></ld-bg-cells>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
