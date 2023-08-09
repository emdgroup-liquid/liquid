import { newSpecPage } from '@stencil/core/testing'
import { LdFileUpload } from '../ld-file-upload'

describe('ld-file-upload', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload></ld-file-upload>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
