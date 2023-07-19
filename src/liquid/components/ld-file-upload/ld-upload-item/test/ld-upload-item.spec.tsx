import { newSpecPage } from '@stencil/core/testing'
import { LdUploadItem } from '../ld-upload-item'

describe('ld-menuitem', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdUploadItem],
      html: `<ld-upload-item file-name='Liquid' file-size='1.28'></ld-upload-item>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
