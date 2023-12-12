import { newSpecPage } from '@stencil/core/testing'
import { LdUploadItemInternal } from '../ld-upload-item-internal'
import { LdFileUpload, LdUploadItem } from '../../ld-file-upload'
import { LdUploadProgressInternal } from '../../ld-upload-progress/ld-upload-progress-internal'
import '../../../../utils/mutationObserver'

describe('ld-upload-item', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [LdUploadItemInternal],
      html: `<ld-upload-item-internal file-name='Liquid' file-size='1.28' />`,
    })
    expect(page.root).toMatchSnapshot()
  })

  it('renders with custom icon', async () => {
    const page = await newSpecPage({
      components: [
        LdUploadItemInternal,
        LdUploadProgressInternal,
        LdFileUpload,
      ],
      html: `<ld-file-upload>
        <ld-icon slot='icons' data-upload-icon='application/pdf' name='pdf' size='lg' />
        <ld-icon slot='icons' data-upload-icon='text/rtf' name='document' size='lg' />
      </ld-file-upload>`,
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
        fileName: 'file1.pdf',
        fileSize: 1024,
        fileType: 'application/pdf',
        progress: 0,
      },
      {
        file: undefined,
        state: 'uploading',
        fileName: 'file2.rtf',
        fileSize: 1024,
        fileType: 'text/rtf',
        progress: 0,
      },
    ]

    ldFileUpload.dispatchEvent(
      new CustomEvent('ldselectfiles', { detail: data, bubbles: true })
    )

    ldFileUpload.addEventListener(
      'ldselectfiles',
      await ldFileUpload.addUploadItems(data)
    )

    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  // TODO: check if node is cloned correctly
  it('clones custom icon', async () => {
    const page = await newSpecPage({
      components: [LdUploadItemInternal, LdFileUpload],
      html: `<ld-file-upload>
        <ld-icon slot='icons' data-upload-icon='application/pdf' name='pdf' size='lg' />
      </ld-file-upload>`,
    })
    expect(page.root).toMatchSnapshot()
  })

  describe('changes state according to props', () => {
    it('changes to state pending', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal state='pending' file-name='Liquid' file-size='1.28' />`,
      })
      expect(page.root.state).toBe('pending')
    })

    it('changes to state uploading', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal state='uploading' file-name='Liquid' file-size='1.28' />`,
      })
      expect(page.root.state).toBe('uploading')
    })

    it('changes to state uploaded', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal state='uploaded' file-name='Liquid' file-size='1.28' />`,
      })
      expect(page.root.state).toBe('uploaded')
    })

    it('changes to state upload failed', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal state='uploadFailed' file-name='Liquid' file-size='1.28' />`,
      })
      expect(page.root.state).toBe('uploadFailed')
    })
  })

  describe('emits events according to button click', () => {
    it('emits lduploaditemremove event', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal allow-pause state='pending' file-name='Liquid' file-size='1.28' />`,
      })
      const ldUploadItem = page.root
      const removeButton =
        ldUploadItem.shadowRoot.querySelector<HTMLLdButtonElement>(
          'ld-button[class="ld-upload-item__remove-button"]'
        )

      const lduploaditemremoveHandler = jest.fn()
      ldUploadItem.addEventListener(
        'lduploaditemremove',
        lduploaditemremoveHandler
      )

      removeButton.click()
      await page.waitForChanges()

      expect(lduploaditemremoveHandler).toHaveBeenCalled()
    })

    it('emits lduploaditemdownload event', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal allow-pause state='uploaded' file-name='Liquid' file-size='1.28' />`,
      })
      const ldUploadItem = page.root
      const downloadButton =
        ldUploadItem.shadowRoot.querySelector<HTMLLdButtonElement>(
          'ld-button[class="ld-upload-item__download-button"]'
        )

      const lduploaditemdownloadHandler = jest.fn()
      ldUploadItem.addEventListener(
        'lduploaditemdownload',
        lduploaditemdownloadHandler
      )

      downloadButton.click()
      await page.waitForChanges()

      expect(lduploaditemdownloadHandler).toHaveBeenCalled()
    })

    it('emits lduploaditemretry event', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal allow-pause state='uploadFailed' file-name='Liquid' file-size='1.28' />`,
      })
      const ldUploadItem = page.root
      const retryButton =
        ldUploadItem.shadowRoot.querySelector<HTMLLdButtonElement>(
          'ld-button[class="ld-upload-item__retry-button"]'
        )

      const lduploaditemretryHandler = jest.fn()
      ldUploadItem.addEventListener(
        'lduploaditemretry',
        lduploaditemretryHandler
      )

      retryButton.click()
      await page.waitForChanges()

      expect(lduploaditemretryHandler).toHaveBeenCalled()
    })

    it('emits lduploaditemremove event', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal allow-pause state='uploaded' file-name='Liquid' file-size='1.28' />`,
      })
      const ldUploadItem = page.root
      const removeButton =
        ldUploadItem.shadowRoot.querySelector<HTMLLdButtonElement>(
          'ld-button[class="ld-upload-item__remove-button"]'
        )

      const lduploaditemremoveHandler = jest.fn()
      ldUploadItem.addEventListener(
        'lduploaditemremove',
        lduploaditemremoveHandler
      )

      removeButton.click()
      await page.waitForChanges()

      expect(lduploaditemremoveHandler).toHaveBeenCalled()
    })
  })

  describe('changes size unit according to props', () => {
    it('changes to size KB', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal state='pending' file-name='Liquid' file-size='1024' />`,
      })
      const fileSize = page.root.shadowRoot.querySelector<HTMLLdTypoElement>(
        'ld-typo[class="ld-upload-item__file-size"]'
      )
      expect(fileSize.innerText).toBe('1 KB')
    })

    it('changes to size MB if progress is being shown', async () => {
      const page = await newSpecPage({
        components: [LdUploadItemInternal],
        html: `<ld-upload-item-internal show-progress state='uploading' file-name='Liquid' file-size='1048576' progress='0' />`,
      })
      const fileSize = page.root.shadowRoot.querySelector<HTMLLdTypoElement>(
        'ld-typo[class="ld-upload-item__file-size"]'
      )
      expect(fileSize.innerText).toBe('0 Bytes / 1 MB')
    })
  })
})
