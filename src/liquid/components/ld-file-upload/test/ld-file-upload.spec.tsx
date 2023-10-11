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

  it('allows selection of multiple files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload select-multiple />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('shows circular progress', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload circular-progress />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('starts upload immediately after choosing files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload start-upload />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('allows pausing the uploads', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload allow-pause />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('shows progress bars for files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload show-progress />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets maximum file size', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload max-size=500 />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('sets custom icons', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload>
      <ld-icon slot='icons' data-upload-icon='application/pdf' name='pdf' size='lg'></ld-icon>
      </ld-file-upload>`,
    })
    expect(page.root).toMatchSnapshot()
  })
})
