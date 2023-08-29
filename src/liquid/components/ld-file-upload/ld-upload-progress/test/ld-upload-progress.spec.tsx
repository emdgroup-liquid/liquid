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

describe('ld-upload-progress', () => {
  it('renders list item', async () => {
    const page = await newSpecPage({
      components: [LdUploadProgress],
      html: `<ld-upload-progress uploadItems=[
        {
          state: 'uploading',
          fileName: 'file1.png',
          fileSize: 100000,
          fileType: 'png',
          progress: 50,
        },]>
        </ld-upload-progress>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
