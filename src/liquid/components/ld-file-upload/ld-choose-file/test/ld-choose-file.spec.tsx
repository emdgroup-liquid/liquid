import { newSpecPage } from '@stencil/core/testing'
import { LdChooseFile } from '../ld-choose-file'

describe('ld-choose-file', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file></ld-choose-file>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
