import { newSpecPage } from '@stencil/core/testing'
import { LdUploadProgress } from '../ld-upload-progress'

describe('ld-upload-progress', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdUploadProgress],
      html: `<ld-upload-progress></ld-upload-progress>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
