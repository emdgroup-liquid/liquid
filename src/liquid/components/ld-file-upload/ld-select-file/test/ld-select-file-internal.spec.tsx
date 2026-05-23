import { newSpecPage } from '@stencil/core/testing'
import { LdSelectFileInternal } from '../ld-select-file-internal'
import '../../../../utils/mutationObserver'
import { h } from '@stencil/core'

describe('ld-select-file', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders upload items', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      template: () => (
        <ld-select-file-internal
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
        />
      ),
    })
    expect(page.root.uploadItems.length).toBe(1)
  })

  it('renders immediate', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal immediate />`,
    })
    expect(page.root.startUploadImmediately).toBe(true)
  })

  it('renders start-upload-clicked', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal start-upload-clicked />`,
    })
    expect(page.root.startUploadClicked).toBe(true)
  })

  it('renders multiple', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal multiple />`,
    })
    expect(page.root.multiple).toBe(true)
  })

  it('emits lduploadclick event', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal immediate />`,
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
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal immediate multiple />`,
    })
    const ldSelectFile = page.root

    await page.waitForChanges()

    // eslint-disable-next-line compat/compat
    const ev = new DragEvent('dragenter', { bubbles: true })
    ;(ev as { dataTransfer: object }).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')
  })

  it('adds class highlighted on drag over', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal immediate multiple />`,
    })
    const ldSelectFile = page.root

    await page.waitForChanges()

    // eslint-disable-next-line compat/compat
    const ev = new DragEvent('dragover', { bubbles: true })
    ;(ev as { dataTransfer: object }).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')
  })

  it('removes class highlighted on drag leave', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal immediate multiple />`,
    })
    const ldSelectFile = page.root

    await page.waitForChanges()

    // eslint-disable-next-line compat/compat
    const ev1 = new DragEvent('dragover', { bubbles: true })
    ;(ev1 as { dataTransfer: object }).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev1)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')

    // eslint-disable-next-line compat/compat
    const ev = new DragEvent('dragleave', { bubbles: true })
    ;(ev as { dataTransfer: object }).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).not.toHaveClass('ld-select-file--highlighted')
  })

  it('removes class highlighted on drop and emits ldselectfiles event', async () => {
    const page = await newSpecPage({
      components: [LdSelectFileInternal],
      html: `<ld-select-file-internal immediate multiple />`,
    })
    const ldSelectFile = page.root

    const ldselectfilesHandler = jest.fn()
    ldSelectFile.addEventListener('ldselectfiles', ldselectfilesHandler)

    await page.waitForChanges()

    // eslint-disable-next-line compat/compat
    const ev1 = new DragEvent('dragover', { bubbles: true })
    ;(ev1 as { dataTransfer: object }).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev1)

    await page.waitForChanges()

    expect(ldSelectFile).toHaveClass('ld-select-file--highlighted')

    // eslint-disable-next-line compat/compat
    const ev = new DragEvent('drop', { bubbles: true })
    ;(ev as { dataTransfer: object }).dataTransfer = {}
    ldSelectFile.dispatchEvent(ev)

    await page.waitForChanges()

    expect(ldSelectFile).not.toHaveClass('ld-select-file--highlighted')
    expect(ldselectfilesHandler).toHaveBeenCalled()
  })
})
