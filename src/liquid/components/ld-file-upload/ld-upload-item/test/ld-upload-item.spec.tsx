import { newSpecPage } from '@stencil/core/testing'
import { LdUploadItem } from '../ld-upload-item'

describe('ld-upload-item', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdUploadItem],
      html: `<ld-upload-item file-name='Liquid' file-size='1.28'></ld-upload-item>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('changes state according to props', () => {
    it('changes to state pending', async () => {
      const page = await newSpecPage({
        components: [LdUploadItem],
        html: `<ld-upload-item state='pending' file-name='Liquid' file-size='1.28'></ld-upload-item>`,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('changes to state uploading', async () => {
      const page = await newSpecPage({
        components: [LdUploadItem],
        html: `<ld-upload-item state='uploading' file-name='Liquid' file-size='1.28'></ld-upload-item>`,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('changes to state uploaded', async () => {
      const page = await newSpecPage({
        components: [LdUploadItem],
        html: `<ld-upload-item state='uploaded' file-name='Liquid' file-size='1.28'></ld-upload-item>`,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('changes to state upload failed', async () => {
      const page = await newSpecPage({
        components: [LdUploadItem],
        html: `<ld-upload-item state='upload failed' file-name='Liquid' file-size='1.28'></ld-upload-item>`,
      })
      expect(page.root).toMatchSnapshot()
    })
  })

  describe('changes size unit according to props', () => {
    it('changes to size KB', async () => {
      const page = await newSpecPage({
        components: [LdUploadItem],
        html: `<ld-upload-item state='pending' file-name='Liquid' file-size='10000'></ld-upload-item>`,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('changes to size MB', async () => {
      const page = await newSpecPage({
        components: [LdUploadItem],
        html: `<ld-upload-item state='pending' file-name='Liquid' file-size='2000000'></ld-upload-item>`,
      })
      expect(page.root).toMatchSnapshot()
    })
  })
})
