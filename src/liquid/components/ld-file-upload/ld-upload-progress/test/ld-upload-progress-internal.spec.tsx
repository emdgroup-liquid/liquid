import { newSpecPage } from '@stencil/core/testing'
import { LdUploadProgressInternal } from '../ld-upload-progress-internal'
import '../../../../utils/mutationObserver'
import { h } from '@stencil/core'

describe('ld-upload-progress', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdUploadProgressInternal],
      html: `<ld-upload-progress-internal />`,
    })
    expect(page.root).toMatchSnapshot()
  })
})

describe('ld-upload-progress', () => {
  it('renders list item', async () => {
    const page = await newSpecPage({
      components: [LdUploadProgressInternal],
      template: () => (
        <ld-upload-progress-internal
          uploadItems={[
            {
              file: undefined,
              state: 'uploading',
              fileName: 'file1.png',
              fileSize: 100000,
              fileType: 'png',
              progress: 50,
            },
          ]}
        />
      ),
    })

    const listItems = page.root.shadowRoot.querySelectorAll('li')
    expect(listItems.length).toEqual(1)
  })
})
