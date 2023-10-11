import { newSpecPage } from '@stencil/core/testing'
import { LdUploadProgress } from '../ld-upload-progress'
import { h } from '@stencil/core'

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
      template: () => (
        <ld-upload-progress
          uploadItems={[
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            {
              state: 'uploading',
              fileName: 'file1.png',
              fileSize: 100000,
              fileType: 'png',
              progress: 50,
            },
          ]}
        ></ld-upload-progress>
      ),
    })
    expect(page.root).toMatchSnapshot()
  })
})
