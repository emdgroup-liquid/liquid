import { newSpecPage } from '@stencil/core/testing'
import { LdFileUpload, UploadItem } from '../ld-file-upload'
import { LdChooseFile } from '../ld-choose-file/ld-choose-file'
import { LdUploadProgress } from '../ld-upload-progress/ld-upload-progress'
import { LdUploadItem } from '../ld-upload-item/ld-upload-item'
import { LdButton } from '../../ld-button/ld-button'
import '../../../utils/mutationObserver'

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
    expect(page.root.selectMultiple).toBe(true)
  })

  it('shows circular progress', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload circular-progress />`,
    })
    expect(page.root.circularProgress).toBe(true)
  })

  it('starts upload immediately after choosing files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload start-upload />`,
    })
    expect(page.root.startUpload).toBe(true)
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
      html: `<ld-file-upload max-size=500 />`,
    })
    expect(page.root.maxSize).toBe(500)
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

  /* it('receives uploadItems from ldchoosefiles event', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload></ld-file-upload>`,
    })
    const ldFileUpload = page.root

    // const data: UploadItem[] = [
    //   {
    //     file: undefined,
    //     state: 'uploading',
    //     fileName: 'file1.png',
    //     fileSize: 100000,
    //     fileType: 'png',
    //     progress: 50,
    //   },
    // ]

    // ldFileUpload.dispatchEvent(
    //   new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    // )

    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  }) */

  /* it('emits change and ldchange events', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root
    const input = ldFileUpload.shadowRoot.querySelector('input')

    const changeHandler = jest.fn()
    ldFileUpload.addEventListener('change', changeHandler)
    const ldchangeHandler = jest.fn()
    ldFileUpload.addEventListener('ldchange', ldchangeHandler)

    input.value = 'test'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    await page.waitForChanges()

    expect(changeHandler).toHaveBeenCalledTimes(1)
    expect(ldchangeHandler).toHaveBeenCalledTimes(1)
  }) */

  /* it('emits change and ldchoosefiles events', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root
    const input = ldFileUpload.shadowRoot.querySelector('input')

    const changeHandler = jest.fn()
    ldFileUpload.addEventListener('change', changeHandler)
    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    // input.value = 'test'
    input.dispatchEvent(new Event('change', { bubbles: true }))
    await page.waitForChanges()

    expect(changeHandler).toHaveBeenCalledTimes(1)
    expect(ldchoosefilesHandler).toHaveBeenCalledTimes(1)
  }) */

  /* it('allows accessing files via readonly files prop', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root
    const input = ldFileUpload.shadowRoot.querySelector('input')
    input.files = ['foo', 'bar'] as unknown as FileList

    const ldchangeHandler = jest.fn()
    ldFileUpload.addEventListener('ldchange', ldchangeHandler)

    input.dispatchEvent(new InputEvent('change', { bubbles: true }))
    await page.waitForChanges()

    expect(ldchangeHandler).toHaveBeenCalled()
    expect(ldFileUpload.files).toEqual(['foo', 'bar'])
  }) */

  it('emits ldfileuploadready event on continue button click', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload, LdChooseFile, LdUploadProgress, LdUploadItem],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root
    // const ldFileUploadRoot = page.root
    // const ldFileUpload = page.body.querySelector('ld-file-upload')
    // const contineButton =
    //   ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
    //     'ld-button[class="ld-file-upload__continue-button"]'
    //   )
    // const contineButton =
    //   ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
    //     '.ld-file-upload__continue-button'
    //   )
    // input.files = ['foo', 'bar'] as unknown as FileList

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    // const ev = {
    //   type: 'click',
    //   bubbles: true,
    //   composed: true,
    //   composedPath: () => [input],
    // } as unknown as MouseEvent
    // page.root.dispatchEvent(ev)

    // input.dispatchEvent(new InputEvent('change', { bubbles: true }))
    // ldFileUpload.dispatchEvent(new Event('ldchoosefiles', { bubbles: true }))

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const contineButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__continue-button"]'
      )

    contineButton.click()
    await page.waitForChanges()

    const ldUploadProgress =
      ldFileUpload.shadowRoot.querySelector('ld-upload-progress')

    const ldUploadItems =
      ldUploadProgress.shadowRoot.querySelectorAll('ld-upload-item')

    expect(ldUploadItems).toHaveLength(1)

    // expect(ldFileUpload).toHaveClass('ld-file-upload__continue-button')
    // expect(ldFileUpload.renderOnlyChooseFile).not.toBe(true)
    expect(ldfileuploadreadyHandler).toHaveBeenCalled()
    // expect(ldchoosefilesHandler).toHaveBeenCalled()
    // expect(ldFileUpload.files).toEqual(['foo', 'bar'])

    const data2: UploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file2.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 50,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data2)

    await page.waitForChanges()

    const ldUploadItems2 =
      ldUploadProgress.shadowRoot.querySelectorAll('ld-upload-item')

    expect(ldUploadItems2).toHaveLength(2)
  })

  it('enables pause all uploads button if uploading files exist in allow-pause mode', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload allow-pause />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

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

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadcontinueuploadsHandler = jest.fn()
    ldFileUpload.addEventListener(
      'ldfileuploadcontinueuploads',
      ldfileuploadcontinueuploadsHandler
    )

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    // ldFileUpload.dispatchEvent(
    //   new CustomEvent('ldpausealluploads', { detail: data, bubbles: true })
    // )

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

    // ldFileUpload.updateUploadItems(data)

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

  it('emits ldfileuploaddeleteall event on delete all click', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const ldfileuploaddeleteallHandler = jest.fn()
    ldFileUpload.addEventListener(
      'ldfileuploaddeleteall',
      ldfileuploaddeleteallHandler
    )

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const deleteAllButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__delete-button"]'
      )

    deleteAllButton.click()

    await ldFileUpload.deleteUploadItems()

    await page.waitForChanges()

    expect(ldfileuploaddeleteallHandler).toHaveBeenCalled()
    expect(ldFileUpload).not.toHaveClass('ld-file-upload__progress')
  })

  it('emits public ldchoosefiles and ldfileuploadready event after internal ldchoosefiles event is emitted by ld-choose-files', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload start-upload />`,
    })
    const ldFileUpload = page.root
    const ldChooseFiles =
      ldFileUpload.shadowRoot.querySelector<HTMLLdChooseFileElement>(
        'ld-choose-file[class="ld-file-upload__choose-file"]'
      )

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file1.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 50,
      },
    ]

    ldChooseFiles.dispatchEvent(
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    // ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    expect(ldchoosefilesHandler).toHaveBeenCalled()
    expect(ldfileuploadreadyHandler).toHaveBeenCalled()
  })

  it('emits public ldchoosefiles and ldfileuploadready event after files are selected through input', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload start-upload />`,
    })
    const ldFileUpload = page.root
    const input = ldFileUpload.shadowRoot.querySelector<HTMLInputElement>(
      'input[class="ld-file-upload__input"]'
    )

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    input.files = ['file1', 'file2'] as unknown as FileList
    input.dispatchEvent(new InputEvent('change', { bubbles: true }))

    await page.waitForChanges()

    expect(ldchoosefilesHandler).toHaveBeenCalled()
    expect(ldfileuploadreadyHandler).toHaveBeenCalled()
  })

  it('calculates total progress', async () => {
    const page = await newSpecPage({
      components: [
        LdFileUpload,
        LdChooseFile,
        LdUploadItem,
        LdUploadProgress,
        LdButton,
      ],
      html: `<ld-file-upload show-progress />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const progressButton =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-file-upload__continue-button"]'
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
        'ld-button[class="ld-file-upload__continue-button"]'
      )

    console.log('huhu')
    // is currently undefined?
    expect(progressButton2.progress).toBe(0)
  })

  it('converts bytes to higher size', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload circular-progress />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const totalUploadSize =
      ldFileUpload.shadowRoot.querySelector<HTMLLdTypoElement>(
        'ld-typo[class="ld-file-upload__circular-progress-total-upload-size"]'
      )

    await page.waitForChanges()

    expect(totalUploadSize.innerText).toBe('1 KB')
  })

  it('shows all files uploaded message after all uploads are finished', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload, LdChooseFile],
      html: `<ld-file-upload circular-progress />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const uploadedItems = data
    for (const item in uploadedItems) {
      const newItem = uploadedItems[item]
      newItem.state = 'uploaded'
      await ldFileUpload.updateUploadItem(newItem)
    }

    await page.waitForChanges()

    const uploadSuccessMessage =
      ldFileUpload.shadowRoot.querySelector('ld-input-message')

    // await page.waitForChanges()

    // const ldChooseFile =
    //   ldFileUpload.shadowRoot.querySelector<HTMLLdChooseFileElement>(
    //     'ld-choose-file[class="ld-file-upload__choose-file"]'
    //   )

    expect(uploadSuccessMessage.innerText).toBe('Files uploaded')
    // expect(page.root).toMatchSnapshot()
    // expect(ldChooseFile.size).toBe('bg')
  })

  it('removes file using the deleteUploadItems method', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload, LdUploadProgress, LdUploadItem, LdChooseFile],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root as HTMLLdFileUploadElement

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)
    await page.waitForChanges()
    await ldFileUpload.deleteUploadItems()
    await page.waitForChanges()

    const ldUploadProgress =
      ldFileUpload.shadowRoot.querySelector('ld-upload-progress')

    expect(ldUploadProgress).toBeNull()
  })

  it('removes file using the deleteUploadItem method', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload, LdUploadProgress, LdUploadItem, LdChooseFile],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root as HTMLLdFileUploadElement

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    await ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    await ldFileUpload.deleteUploadItem(data[0])

    await page.waitForChanges()

    const ldUploadProgress =
      ldFileUpload.shadowRoot.querySelector('ld-upload-progress')

    const ldUploadItems =
      ldUploadProgress.shadowRoot.querySelectorAll('ld-upload-item')

    expect(ldUploadItems).toHaveLength(1)

    // const dataToDelete: UploadItem = {
    //   file: undefined,
    //   state: 'uploading',
    //   fileName: 'file1.png',
    //   fileSize: 1024,
    //   fileType: 'png',
    //   progress: 0,
    // }

    // expect(await ldFileUpload.deleteUploadItem(dataToDelete)).toThrow(Error)
  })

  /* it('listens to lduploadclick', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload, LdChooseFile, LdUploadItem, LdUploadProgress],
      html: `<ld-file-upload />`,
    })
    const ldFileUpload = page.root
    const ldChooseFile = ldFileUpload.shadowRoot.querySelector('ld-choose-file')
    const uploadButton =
      ldChooseFile.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-button[class="ld-choose-file__upload-button"]'
      )
    const input = ldFileUpload.shadowRoot.querySelector('input')

    const inputClickHandler = jest.fn()
    input.addEventListener('click', inputClickHandler)

    uploadButton.click()

    ldChooseFile.dispatchEvent(
      new CustomEvent('lduploadclick', { bubbles: true })
    )

    expect(inputClickHandler).toHaveBeenCalled()
  }) */

  /* it('displays error message if max file size is exceeded', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload max-size=500 />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
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
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    // ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const maxSizeError =
      ldFileUpload.shadowRoot.querySelector<HTMLLdTypoElement>(
        'ld-typo[class="ld-file-upload__error"]'
      )

    await page.waitForChanges()

    expect(maxSizeError.innerText).toBe(
      'Error: file1.png cannot be chosen since the file(s) exceed the maximum file size.'
    )
  }) */

  /* it('changes circular progress if error occured', async () => {
    const page = await newSpecPage({
      components: [LdFileUpload],
      html: `<ld-file-upload select-multiple circular-progress />`,
    })
    const ldFileUpload = page.root

    const ldchoosefilesHandler = jest.fn()
    ldFileUpload.addEventListener('ldchoosefiles', ldchoosefilesHandler)

    const ldfileuploadreadyHandler = jest.fn()
    ldFileUpload.addEventListener('ldfileuploadready', ldfileuploadreadyHandler)

    const data: UploadItem[] = [
      {
        file: undefined,
        state: 'upload failed',
        fileName: 'file1.png',
        fileSize: 100000,
        fileType: 'png',
        progress: 50,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldchoosefiles', { detail: data, bubbles: true })
    )

    ldFileUpload.updateUploadItems(data)

    await page.waitForChanges()

    const circularProgress =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-circular-progress[class="ld-file-upload__circular-progress"]'
      )

    const circularProgressError =
      ldFileUpload.shadowRoot.querySelector<HTMLLdButtonElement>(
        'ld-circular-progress[class="ld-file-upload--circular-progress-error"]'
      )

    await page.waitForChanges()

    expect(ldchoosefilesHandler).toHaveBeenCalled()
  }) */
})
