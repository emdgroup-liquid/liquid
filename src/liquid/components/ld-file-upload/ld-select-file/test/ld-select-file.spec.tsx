import { newSpecPage } from '@stencil/core/testing'
import { LdSelectFile } from '../ld-select-file'
import '../../../../utils/mutationObserver'
import { h } from '@stencil/core'

describe('ld-select-file', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file></ld-select-file>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders upload items', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      template: () => (
        <ld-select-file
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
        ></ld-select-file>
      ),
    })
    expect(page.root.uploadItems.length).toBe(1)
  })

  it('renders immediate', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file immediate></ld-select-file>`,
    })
    expect(page.root.startUploadImmediately).toBe(true)
  })

  it('renders start-upload-clicked', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file start-upload-clicked></ld-select-file>`,
    })
    expect(page.root.startUploadClicked).toBe(true)
  })

  it('renders multiple', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file multiple></ld-select-file>`,
    })
    expect(page.root.multiple).toBe(true)
  })

  it('emits lduploadclick event', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file immediate></ld-select-file>`,
    })
    const ldSelectFile = page.root
    const uploadButton =
      ldSelectFile.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-select-file__upload-button"]'
      )

    const lduploadclickHandler = jest.fn()
    ldSelectFile.addEventListener('lduploadclick', lduploadclickHandler)

    uploadButton.click()
    await page.waitForChanges()

    expect(lduploadclickHandler).toHaveBeenCalled()
  })

  it('adds class highlighted on drag enter', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file immediate multiple></ld-select-file>`,
    })
    const ldSelectFile = page.root

    await page.waitForChanges()

    const ev = new Event('dragenter', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')
  })

  it('adds class highlighted on drag over', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file immediate multiple></ld-select-file>`,
    })
    const ldSelectFile = page.root

    await page.waitForChanges()

    const ev = new Event('dragover', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')
  })

  it('removes class highlighted on drag leave', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file immediate multiple></ld-select-file>`,
    })
    const ldSelectFile = page.root

    await page.waitForChanges()

    const ev1 = new Event('dragover', { bubbles: true })
    ;(ev1 as any).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev1)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')

    const ev = new Event('dragleave', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).not.toHaveClass('ld-select-file--highlighted')
  })

  it('removes class highlighted on drop and emits ldselectfiles event', async () => {
    const page = await newSpecPage({
      components: [LdSelectFile],
      html: `<ld-select-file immediate multiple></ld-select-file>`,
    })
    const ldSelectFile = page.root

    const ldselectfilesHandler = jest.fn()
    ldSelectFile.addEventListener('ldselectfiles', ldselectfilesHandler)

    await page.waitForChanges()

    const ev1 = new Event('dragover', { bubbles: true })
    ;(ev1 as any).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev1)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')

    const ev = new Event('drop', { bubbles: true })
    ;(ev as any).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).not.toHaveClass('ld-select-file--highlighted')
    expect(ldselectfilesHandler).toHaveBeenCalled()
  })
})
