import { newSpecPage } from '@stencil/core/testing'
import { LdChooseFile } from '../ld-choose-file'
import '../../../../utils/mutationObserver'
import { h } from '@stencil/core'

describe('ld-choose-file', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file></ld-choose-file>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders upload items', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      template: () => (
        <ld-choose-file
          start-upload-clicked
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
        ></ld-choose-file>
      ),
    })
    expect(page.root.uploadItems.length).toBe(1)
  })

  it('renders start-upload', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload></ld-choose-file>`,
    })
    expect(page.root.startUpload).toBe(true)
  })

  it('renders start-upload-clicked', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload-clicked></ld-choose-file>`,
    })
    expect(page.root.startUploadClicked).toBe(true)
  })

  it('renders select-multiple', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file select-multiple></ld-choose-file>`,
    })
    expect(page.root.selectMultiple).toBe(true)
  })

  it('emits lduploadclick event', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload></ld-choose-file>`,
    })
    const ldChooseFile = page.root
    const uploadButton =
      ldChooseFile.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-choose-file__upload-button"]'
      )

    const lduploadclickHandler = jest.fn()
    ldChooseFile.addEventListener('lduploadclick', lduploadclickHandler)

    uploadButton.click()
    await page.waitForChanges()

    expect(lduploadclickHandler).toHaveBeenCalled()
  })

  it('adds class highlighted on drag enter', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload select-multiple></ld-choose-file>`,
    })
    const ldChooseFile = page.root

    await page.waitForChanges()

    const ev = new Event('dragenter', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldChooseFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldChooseFile).toHaveClass('ld-choose-file--highlighted')
  })

  it('adds class highlighted on drag over', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload select-multiple></ld-choose-file>`,
    })
    const ldChooseFile = page.root

    await page.waitForChanges()

    const ev = new Event('dragover', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldChooseFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldChooseFile).toHaveClass('ld-choose-file--highlighted')
  })

  it('removes class highlighted on drag leave', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload select-multiple></ld-choose-file>`,
    })
    const ldChooseFile = page.root

    await page.waitForChanges()

    const ev1 = new Event('dragover', { bubbles: true })
    ;(ev1 as any).dataTransfer = {}
    ldChooseFile.dispatchEvent(ev1)

    await page.waitForChanges()

    expect(ldChooseFile).toHaveClass('ld-choose-file--highlighted')

    const ev = new Event('dragleave', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldChooseFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldChooseFile).not.toHaveClass('ld-choose-file--highlighted')
  })

  it('removes class highlighted on drop and emits ldchoosefiles event', async () => {
    const page = await newSpecPage({
      components: [LdChooseFile],
      html: `<ld-choose-file start-upload select-multiple></ld-choose-file>`,
    })
    const ldChooseFile = page.root

    const ldchoosefilesHandler = jest.fn()
    ldChooseFile.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    await page.waitForChanges()

    const ev1 = new Event('dragover', { bubbles: true })
    ;(ev1 as any).dataTransfer = {}
    ldChooseFile.dispatchEvent(ev1)

    await page.waitForChanges()

    expect(ldChooseFile).toHaveClass('ld-choose-file--highlighted')

    const ev = new Event('drop', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldChooseFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldChooseFile).not.toHaveClass('ld-choose-file--highlighted')
    expect(ldchoosefilesHandler).toHaveBeenCalled()
  })
})
