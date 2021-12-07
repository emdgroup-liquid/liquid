import { newSpecPage } from '@stencil/core/testing'
import { LdTypo } from '../ld-typo'
import '../../../utils/mutationObserver'

describe('ld-typo', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdTypo],
      html: `<ld-typo variant="body-m">Text</ld-typo>`,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with custom tag', async () => {
    const page = await newSpecPage({
      components: [LdTypo],
      html: `<ld-typo variant="h3" tag="h1">Text</ld-typo>`,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with brand variant and explicit aria-label', async () => {
    const page = await newSpecPage({
      components: [LdTypo],
      html: `<ld-typo variant="b3" aria-label="Yolo">Text</ld-typo>`,
    })
    expect(page.root).toMatchSnapshot()
  })
  it('renders with brand variant and implicit aria-label', async () => {
    const page = await newSpecPage({
      components: [LdTypo],
      html: `<ld-typo variant="b3" tag="h1">Text</ld-typo>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
