import { newSpecPage } from '@stencil/core/testing'
import { LdFileUpload, LdUploadItem } from '../ld-file-upload'
import { LdSelectFileInternal } from '../ld-select-file/ld-select-file-internal'
import { LdUploadProgressInternal } from '../ld-upload-progress/ld-upload-progress-internal'
import { LdUploadItemInternal } from '../ld-upload-item/ld-upload-item-internal'
import { LdButton } from '../../ld-button/ld-button'
import '../../../utils/mutationObserver'

describe('ld-file-upload', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload/>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('allows selection of multiple files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload multiple />`,
    })
    expect(page.root.multiple).toBe(true)
  })

  it('starts upload immediately after selecting files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload immediate />`,
    })
    expect(page.root.startUploadImmediately).toBe(true)
  })

  it('allows pausing the uploads', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload allow-pause />`,
    })
    expect(page.root.allowPause).toBe(true)
  })

  it('shows progress bars for files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload show-progress />`,
    })
    expect(page.root.showProgress).toBe(true)
  })

  it('sets maximum file size', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload max-file-size=500 />`,
    })
    expect(page.root.maxFileSize).toBe(500)
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

  // Continuing/pausing singular files might be added at a later time

  // it('emits ldfileuploadready event on continue button click', async () => {
  //   const page = await newSpecPage({
  //     components: [LdFileUpload, LdSelectFile, LdUploadProgress, LdUploadItem],
  //     html: `<ld-file-upload />`,
  //   })
  //   const ldFileUpload = page.root

  //   const ldselectfilesHandler = jest.fn()
  //   ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

  //   const ldfileuploadreadyHandler = jest.fn()
  //   ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

  //   const data: UploadItem[] = [
  //     {
  //       file: undefined,
  //       state: 'uploading',
  //       fileName: 'file1.png',
  //       fileSize: 100000,
  //       fileType: 'png',
  //       progress: 50,
  //     },
  //   ]

  //   ldFileUpload.dispatchEvent(
  //     new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
  //   )

  //   await ldFileUpload.addUploadItems(data)

  //   await page.waitForChanges()

  //   const contineButton =
  //     ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
  //       'ld-button[class="ld-file-upload__continue-button"]'
  //     )

  //   contineButton.click()
  //   await page.waitForChanges()

  //   const ldUploadProgress =
  //     ldFileUpload.shadowRoot.querySelector('ld-upload-progress')

  //   const ldUploadItems =
  //     ldUploadProgress.shadowRoot.querySelectorAll('ld-upload-item')

  //   expect(ldUploadItems).toHaveLength(1)

  //   expect(ldfileuploadreadyHandler).toHaveBeenCalled()

  //   const data2: UploadItem[] = [
  //     {
  //       file: undefined,
  //       state: 'uploading',
  //       fileName: 'file2.png',
  //       fileSize: 100000,
  //       fileType: 'png',
  //       progress: 50,
  //     },
  //   ]

  //   ldFileUpload.dispatchEvent(
  //     new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
  //   )

  //   await ldFileUpload.addUploadItems(data2)

  //   await page.waitForChanges()

  //   const ldUploadItems2 =
  //     ldUploadProgress.shadowRoot.querySelectorAll('ld-upload-item')

  //   expect(ldUploadItems2).toHaveLength(2)
  // })

  it('enables pause all uploads button if uploading files exist in allow-pause mode', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload allow-pause />`,
    })
    const ldFileUpload = page.root

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: LdUploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 50,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.addUploadItems(data)

    await page.waitForChanges()

    const pauseAllButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__pause-all-button"]'
      )

    await page.waitForChanges()

    expect(pauseAllButton.disabled).not.toBe(true)
  })

  it('enables continue paused uploads button if uploading files exist in allow-pause mode; emits ldfileuploadcontinueuploads', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload allow-pause />`,
    })
    const ldFileUpload = page.root

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadcontinueuploadsHandler = jest.fn()
    ldFileUpload.addEventListener(
      'ldfileuploadcontinueuploads',
      ldfileuploadcontinueuploadsHandler
    )

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: LdUploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 50,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.addUploadItems(data)

    await page.waitForChanges()

    const pauseAllButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__pause-all-button"]'
      )

    pauseAllButton.click()

    const pausedItems = data
    for (const item in pausedItems) {
      const newItem = pausedItems[item]
      newItem.state = 'paused'
      await ldFileUpload.updateUploadItem(newItem)
    }

    await page.waitForChanges()

    const continuePausedButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__continue-paused-button"]'
      )

    await page.waitForChanges()

    expect(continuePausedButton.disabled).not.toBe(true)

    continuePausedButton.click()
    await page.waitForChanges()

    expect(ldfileuploadcontinueuploadsHandler).toHaveBeenCalled()
  })

  // The remove all files button might be added again at a later time

  // it('emits ldfileuploadremoveall event on remove all click', async () => {
  //   const page = await newSpecPage({
  //     components: [LdFileUpload],
  //     html: `<ld-file-upload />`,
  //   })
  //   const ldFileUpload = page.root

  //   const ldselectfilesHandler = jest.fn()
  //   ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

  //   const ldfileuploadreadyHandler = jest.fn()
  //   ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

  //   const ldfileuploadremoveallHandler = jest.fn()
  //   ldFileUpload.addEventListener(
  //     'ldfileuploadremoveall',
  //     ldfileuploadremoveallHandler
  //   )

  //   const data: UploadItem[] = [
  //     {
  //       file: undefined,
  //       state: 'uploading',
  //       fileName: 'file1.png',
  //       fileSize: 100000,
  //       fileType: 'png',
  //       progress: 50,
  //     },
  //   ]

  //   ldFileUpload.dispatchEvent(
  //     new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
  //   )

  //   await ldFileUpload.addUploadItems(data)

  //   await page.waitForChanges()

  //   const removeAllButton =
  //     ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
  //       'ld-button[class="ld-file-upload__remove-button"]'
  //     )

  //   removeAllButton.click()

  //   await ldFileUpload.removeAllUploadItems()

  //   await page.waitForChanges()

  //   expect(ldfileuploadremoveallHandler).toHaveBeenCalled()
  //   expect(ldFileUpload).not.toHaveClass('ld-file-upload__progress')
  // })

  it('emits public ldselectfiles and ldfileuploadready event after internal ldselectfiles event is emitted by ld-select-files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload immediate />`,
    })
    const ldFileUpload = page.root
    const ldSelectFiles =
      ldFileUpload.shadowRoot.querySelector<HTMLLdSelectFileInternalElement>(
        'ld-select-file[class="ld-file-upload__select-file"]'
      )

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: LdUploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 50,
      },
    ]

    ldSelectFiles.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    await page.waitForChanges()

    expect(ldselectfilesHandler).toHaveBeenCalled()
    expect(ldfileuploadreadyHandler).toHaveBeenCalled()
  })

  it('emits public ldselectfiles and ldfileuploadready event after files are selected through input', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload immediate />`,
    })
    const ldFileUpload = page.root
    const input = ldFileUpload.shadowRoot.querySelector<HTMLInputElement>(
      'input[class="ld-file-upload__input"]'
    )

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    input.files = ['file1', 'file2'] as unknown as FileList
    input.dispatchEvent(new InputEvent('change', { bubbles: true }))

    await page.waitForChanges()

    expect(ldselectfilesHandler).toHaveBeenCalled()
    expect(ldfileuploadreadyHandler).toHaveBeenCalled()
  })

  it('calculates total progress', async () => {
    const page = await newSpecPage({
      components: [
        LdFileUpload,
        LdSelectFileInternal,
        LdUploadItemInternal,
        LdUploadProgressInternal,
        LdButton,
      ],
      html: `<ld-file-upload show-progress />`,
    })
    const ldFileUpload = page.root

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: LdUploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 0,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.addUploadItems(data)

    await page.waitForChanges()

    const progressButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__start-upload-button"]'
      )

    progressButton.click()

    await page.waitForChanges()
    await page.waitForChanges()
    await page.waitForChanges()

    jest.runOnlyPendingTimers()

    await page.waitForChanges()
    await page.waitForChanges()

    const progressButton2 =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__start-upload-button"]'
      )

    expect(progressButton2.progress).toBe(0)
  })

  it('removes file using the removeAllUploadItems method', async () => {
    const page = await newSpecPage({
      components: [
        LdFileUpload,
        LdUploadProgressInternal,
        LdUploadItemInternal,
        LdSelectFileInternal,
      ],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root as HTMLLdFileUploadElement

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: LdUploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 1024,
        fileType: 'png',
        progress: 0,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.addUploadItems(data)
    await page.waitForChanges()
    await ldFileUpload.removeAllUploadItems()
    await page.waitForChanges()

    const ldUploadProgress =
      ldFileUpload.shadowRoot.querySelector('ld-upload-progress')

    expect(ldUploadProgress).toBeNull()
  })

  it('removes file using the removeUploadItem method', async () => {
    const page = await newSpecPage({
      components: [
        LdFileUpload,
        LdUploadProgressInternal,
        LdUploadItemInternal,
        LdSelectFileInternal,
      ],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root as HTMLLdFileUploadElement

    const ldselectfilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldselectfiles', ldselectfilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: LdUploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 1024,
        fileType: 'png',
        progress: 0,
      },
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file2.png',
        fileSize: 1024,
        fileType: 'png',
        progress: 0,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.addUploadItems(data)

    await page.waitForChanges()

    await ldFileUpload.removeUploadItem(data[0])

    await page.waitForChanges()

    const ldUploadProgress =
      ldFileUpload.shadowRoot.querySelector('ld-upload-progress')

    const ldUploadItems =
      ldUploadProgress.shadowRoot.querySelectorAll('ld-upload-item')

    expect(ldUploadItems).toHaveLength(1)
  })
})
