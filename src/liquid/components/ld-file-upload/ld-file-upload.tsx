import {
  Component,
  h,
  Host,
  Element,
  Method,
  State,
  Event,
  EventEmitter,
  Prop,
  Listen,
  Watch,
} from '@stencil/core'
import { LdUploadItemConfig } from './ld-upload-item/ld-upload-item.types'

export type UploadItem = {
  state: 'pending' | 'uploading' | 'uploaded' | 'upload failed'
  fileName: string
  fileSize: number
  fileType: string
  progress: number
}

/**
 * TODO:
 *   - listen for files chosen event (from ld-choose-file.tsx) with file list
 *     -> emit upload ready event (if startUpload prop is set to true)
 *   - listen for click event of continue button and emit upload ready event (if startUpload prop is set to false)
 *   - The upload ready event contains the file list as its payload
 *   - Keep a state of files chosen and pass them as a prop (uploadItems) to ld-upload-progress.tsx
 *   - Implement callback methods, which accept a file list (name, progress, state etc.) and update the upload items
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part list - `ul` element wrapping the default slot
 */
@Component({
  tag: 'ld-file-upload',
  styleUrl: 'ld-file-upload.css',
  shadow: true,
})
export class LdFileUpload {
  @Element() el: HTMLLdFileUploadElement

  private fileInput?: HTMLInputElement
  /* private fileButton?: HTMLLdButtonElement */
  private input: HTMLInputElement

  /** startUpload defines whether upload starts immediately after choosing files or after confirmation. */
  @Prop() startUpload?: boolean = false

  /** Maps file types to icon path */
  @Prop() icons?: Partial<LdUploadItemConfig> | string

  /** TODO: is used to display and validate maximum file size */
  @Prop() maxSize?: number

  /** Name of form field to use for sending the element's directionality in form submission. */
  @Prop() dirname?: string

  /** Associates the control with a form element. */
  @Prop() form?: string

  /** Used to specify the name of the control. */
  @Prop() name?: string

  /** The input value. */
  @Prop({ mutable: true }) value?: string

  @State() uploadItems: UploadItem[] = []
  @State() uploadItemTypes: {
    fileName: string
    fileType: string
  }[] = []
  @State() fileList: FileList

  /** Contains files that have been chosen but the upload has not started yet. */
  @State() chosenFiles: UploadItem[] = []

  @Event() ldchoosefiles: EventEmitter<FileList>

  @Event() ldfileuploadready: EventEmitter<UploadItem[]>

  @Listen('lduploaditempause')
  pauseClickHandler(ev: CustomEvent<UploadItem>) {
    console.log(this.uploadItems)
    console.log('Received the pauseClick event: ', ev.detail)
    const itemToPauseIndex = this.uploadItems.findIndex(
      (item) => item.fileName === ev.detail.fileName
    )

    ev.detail.state = 'pending'

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToPauseIndex),
      ev.detail,
      ...this.uploadItems.slice(itemToPauseIndex + 1),
    ]

    console.log('uploadItems after pauseClick', this.uploadItems)
  }

  @Listen('lduploaditemremove')
  @Listen('lduploaditemdelete')
  removeClickHandler(ev: CustomEvent<UploadItem>) {
    console.log('Received the stopClick event: ', ev.detail)
    const itemToRemoveIndex = this.uploadItems.findIndex(
      (item) => item.fileName === ev.detail.fileName
    )

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToRemoveIndex),
      ...this.uploadItems.slice(itemToRemoveIndex + 1),
    ]
    console.log('uploadItems after stopClick', this.uploadItems)
  }

  @Listen('lduploadclick')
  handleUploadClick() {
    if (this.fileInput) {
      this.fileInput.click()
    }
  }

  @Listen('ldfileuploadready')
  updateFileTypes() {
    const fileListArray = Array.from(this.fileList)
    fileListArray.forEach((file) =>
      this.uploadItemTypes.push({
        fileName: file.name,
        fileType: file.type,
      })
    )
  }

  @Listen('ldfileuploadready')
  /** After the ldfileuploadready event is emitted, the list of chosen files is cleared */
  clearChosenFiles() {
    this.chosenFiles = []
  }

  /**
   * Accepts a file list from component consumer (name, progress, state etc.)
   * and updates the upload items state.
   */
  @Method()
  async updateUploadItems(uploadItems: UploadItem[]) {
    if (this.uploadItems.length == 0) {
      this.uploadItems = uploadItems
    } else {
      this.uploadItems = [...this.uploadItems.slice(), ...uploadItems.slice()]
    }
  }

  /**
   * Accepts a file from component consumer (name, progress, state etc.)
   * and updates the upload item state.
   */
  @Method()
  async updateUploadItem(uploadItem: UploadItem) {
    const itemToUpdateIndex = this.uploadItems.findIndex(
      (item) => item.fileName === uploadItem.fileName
    )
    if (!itemToUpdateIndex) {
      throw new Error(
        `Upload item with name ${uploadItem.fileName} not found in upload list.`
      )
    }

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToUpdateIndex),
      uploadItem,
      ...this.uploadItems.slice(itemToUpdateIndex + 1),
    ]
  }

  @Watch('dirname')
  @Watch('form')
  @Watch('name')
  @Watch('value')
  updateHiddenInput() {
    const outerForm = this.el.closest('form')
    if (!this.fileInput && this.name && (outerForm || this.form)) {
      this.createHiddenInput()
    }

    if (this.fileInput) {
      if (this.dirname) {
        this.fileInput.dirName = this.dirname
      }

      if (this.name) {
        this.fileInput.name = this.name
      } else if (this.fileInput.name) {
        this.fileInput.remove()
        this.fileInput = undefined
        return
      }

      if (this.form) {
        this.fileInput.setAttribute('form', this.form)
      } else if (this.fileInput.getAttribute('form')) {
        if (outerForm) {
          this.fileInput.removeAttribute('form')
        } else {
          this.fileInput.remove()
          this.fileInput = undefined
          return
        }
      }

      if (this.isInputTypeFile(this.input)) {
        // Clone input field in shadow dom to hidden input field.
        const clonedInput = this.input.cloneNode() as HTMLInputElement
        clonedInput.style.display = 'none'
        this.fileInput.replaceWith(clonedInput)
        this.fileInput = clonedInput
      } else {
        // Update value.
        if (this.value) {
          this.fileInput.value = this.value
        } else if (this.fileInput.value) {
          this.fileInput.removeAttribute('value')
        }
      }
    }
  }

  private parsedIcons: Partial<LdUploadItemConfig>

  private addChosenFiles(chosenFiles: FileList) {
    // const newChosenFiles: UploadItem[] = []
    for (let i = 0; i < chosenFiles.length; i++) {
      this.chosenFiles.push({
        state: 'pending',
        fileName: chosenFiles[i].name,
        fileSize: chosenFiles[i].size,
        fileType: chosenFiles[i].type,
        progress: 0,
      })
    }
    // this.chosenFiles = [...this.chosenFiles.slice(), ...newChosenFiles.slice()]
  }

  /* private handleUploadClick = async () => {
    // if (this.el.querySelector('input')) {
      // this.el.querySelector('input').click()
    // }
    if (this.fileInput) {
      this.fileInput.click()
    }
  } */

  private handleInputClick = async (ev) => {
    if (!ev.isTrusted) {
      // ev.preventDefault()
    }
  }

  private handleInputChange = async (ev) => {
    const files = (ev.target as HTMLInputElement).files
    if (!files || !files.length) return

    console.log(files)

    this.fileList = files
    console.log('filelist input getFile', this.fileList)
    this.ldchoosefiles.emit(this.fileList)
    this.addChosenFiles(this.fileList)
    if (this.startUpload) {
      this.ldfileuploadready.emit(this.chosenFiles)
    }
  }

  private createHiddenInput() {
    this.fileInput = document.createElement('input')
    this.fileInput.type = 'file'
    this.fileInput.tabIndex = -1
    this.fileInput.style.visibility = 'hidden'
    this.fileInput.style.position = 'absolute'
    this.fileInput.style.inset = '0'
    this.fileInput.style.opacity = '0'
    this.fileInput.onclick = this.handleInputClick
    this.fileInput.onchange = this.handleInputChange
    // console.log('input')
    this.el.appendChild(this.fileInput)
    /* this.fileButton = document.createElement('ld-button')
    this.fileButton.textContent = 'Upload a file'
    this.fileButton.onclick = this.handleUploadClick
    this.el.appendChild(this.fileButton) */
  }

  private isInputTypeFile = (
    input: HTMLInputElement
  ): input is HTMLInputElement => {
    return (input as HTMLInputElement).type === 'file'
  }

  /** Emits filesChosen event to component consumer. */
  private handleChooseFiles = (ev: CustomEvent<FileList>) => {
    this.fileList = ev.detail
    console.log('filelist handleChooseFiles', this.fileList)
    ev.stopImmediatePropagation() // We stop the internal event...
    this.ldchoosefiles.emit(this.fileList) // ...and dispatch the public one.
    this.addChosenFiles(this.fileList)
    if (this.startUpload) {
      this.ldfileuploadready.emit(this.chosenFiles)
    }
    /* const file = ev.detail[0]
    for (let i = 0; i < ev.detail.length; i++) {
      if (
        // ev.detail[i].size <= this.maxSize &&
        !this.uploadItems.some(
          (uploadedfile) => uploadedfile.fileName === ev.detail[i].name
        )
      ) {
        this.uploadItems.push({
          state: 'pending',
          fileName: ev.detail[i].name,
          fileSize: ev.detail[i].size,
          progress: 0,
        })
      } */
    /* if (
      file.size <= this.maxSize &&
      !this.uploadItems.some(
        (uploadedfile) => uploadedfile.fileName === file.name
      )
    ) {
      this.uploadItems.push({
        state: 'pending',
        fileName: file.name,
        fileSize: file.size,
        progress: 0,
      })
    } */
    /* this.updateUploadItems(this.uploadItems) */
  }

  private handleContinueClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!this.startUpload) {
      this.ldfileuploadready.emit(this.chosenFiles)
    }
  }

  private handleDeleteAllClick = () => {
    this.uploadItems = []
  }

  componentWillLoad() {
    this.createHiddenInput()
    this.fileInput.name = this.name

    if (this.dirname) {
      this.fileInput.dirName = this.dirname
    }

    if (this.form) {
      this.fileInput.setAttribute('form', this.form)
    }

    if (this.value) {
      this.fileInput.value = this.value
    }

    const parsedIcons: Partial<LdUploadItemConfig> =
      typeof this.icons === 'string' ? JSON.parse(this.icons) : this.icons

    this.parsedIcons = parsedIcons
  }

  render() {
    return (
      <Host class="ld-file-upload">
        <ld-choose-file onLdchoosefiles={this.handleChooseFiles}>
          <slot>
            <pre>Upload button</pre>
          </slot>
        </ld-choose-file>
        <ld-upload-progress
          class="ld-file-upload__progress"
          uploadItems={this.uploadItems}
          uploadItemTypes={this.uploadItemTypes}
          start-upload="false"
          icons={this.parsedIcons}
        />
        {!this.startUpload && (
          <ld-button
            class="ld-file-upload__continue-button"
            onClick={this.handleContinueClick}
          >
            Continue
          </ld-button>
        )}
        <ld-button
          class="ld-file-upload__delete-button"
          onClick={this.handleDeleteAllClick}
          mode="secondary"
        >
          Delete all files
        </ld-button>
      </Host>
    )
  }
}
