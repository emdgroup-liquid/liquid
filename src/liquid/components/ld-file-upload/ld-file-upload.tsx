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
import { getClassNames } from '../../utils/getClassNames'

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

  /** Contains all files that have been chosen but the upload has not started yet. */
  @State() allChosenFiles: UploadItem[] = []

  /** Names of files that cannot be chosen by the user since a file of the same name has been chosen already. */
  @State() cannotBeChosen: string[] = []

  @State() renderOnlyChooseFile = true

  // @Event() ldchoosefiles: EventEmitter<FileList>
  @Event() ldchoosefiles: EventEmitter<UploadItem[]>

  @Event() ldfileuploadready: EventEmitter<UploadItem[]>

  @Event() ldfileuploaddeleteall: EventEmitter

  @Listen('lduploaditempause')
  pauseClickHandler(ev: CustomEvent<UploadItem>) {
    // console.log(this.uploadItems)
    // console.log('Received the pauseClick event: ', ev.detail)
    const itemToPauseIndex = this.uploadItems.findIndex(
      (item) => item.fileName === ev.detail.fileName
    )

    ev.detail.state = 'pending'

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToPauseIndex),
      ev.detail,
      ...this.uploadItems.slice(itemToPauseIndex + 1),
    ]

    // console.log('uploadItems after pauseClick', this.uploadItems)
  }

  @Listen('lduploaditemremove')
  @Listen('lduploaditemdelete')
  removeClickHandler(ev: CustomEvent<UploadItem>) {
    // console.log('Received the stopClick event: ', ev.detail)
    const itemToRemoveIndex = this.uploadItems.findIndex(
      (item) => item.fileName === ev.detail.fileName
    )

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToRemoveIndex),
      ...this.uploadItems.slice(itemToRemoveIndex + 1),
    ]
    // console.log('uploadItems after stopClick', this.uploadItems)
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
  /** After the ldfileuploadready event is emitted, the list of all schosen files is cleared */
  clearChosenFiles() {
    this.allChosenFiles = []
  }

  @Listen('ldchoosefiles')
  updateComponentAppearance() {
    if (this.renderOnlyChooseFile) {
      this.renderOnlyChooseFile = false
    }
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
    if (!itemToUpdateIndex && itemToUpdateIndex != 0) {
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

  /**
   * Accepts a file list from component consumer (name, progress, state etc.)
   * and deletes the upload items.
   */
  @Method()
  async deleteUploadItems() {
    /* for (let i = 0; i < uploadItems.length; i++) {
      const itemToDeleteIndex = this.uploadItems.findIndex(
        (item) => item.fileName === uploadItems[i].fileName
      )
      if (!itemToDeleteIndex && itemToDeleteIndex != 0) {
        throw new Error(
          `Upload item with name ${uploadItems[i].fileName} not found in upload list.`
        )
      }

      this.uploadItems = [
        ...this.uploadItems.slice(0, itemToDeleteIndex),
        ...this.uploadItems.slice(itemToDeleteIndex + 1),
      ]
    } */
    this.uploadItems = []
  }

  /**
   * Accepts a file from component consumer (name, progress, state etc.)
   * and deletes the upload items.
   */
  @Method()
  async deleteUploadItem(uploadItem: UploadItem) {
    const itemToDeleteIndex = this.uploadItems.findIndex(
      (item) => item.fileName === uploadItem.fileName
    )
    if (!itemToDeleteIndex && itemToDeleteIndex != 0) {
      throw new Error(
        `Upload item with name ${uploadItem.fileName} not found in upload list.`
      )
    }

    this.uploadItems = [
      ...this.uploadItems.slice(0, itemToDeleteIndex),
      ...this.uploadItems.slice(itemToDeleteIndex + 1),
    ]
  }

  @Watch('uploadItems')
  changeChooseFile() {
    if (this.uploadItems.length == 0 && this.renderOnlyChooseFile == false) {
      this.renderOnlyChooseFile = true
    }
  }

  @Watch('dirname')
  @Watch('form')
  @Watch('name')
  @Watch('value')
  updateFileInput() {
    const outerForm = this.el.closest('form')
    if (!this.fileInput && this.name && (outerForm || this.form)) {
      this.createFileInput()
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

  /* private addChosenFiles(chosenFiles: FileList) {
    // const newChosenFiles: UploadItem[] = []
    for (let i = 0; i < chosenFiles.length; i++) {
      this.allChosenFiles.push({
        state: 'pending',
        fileName: chosenFiles[i].name,
        fileSize: chosenFiles[i].size,
        fileType: chosenFiles[i].type,
        progress: 0,
      })
    }
    // this.chosenFiles = [...this.chosenFiles.slice(), ...newChosenFiles.slice()]
  } */
  private addChosenFiles(chosenFiles: UploadItem[]) {
    for (let i = 0; i < chosenFiles.length; i++) {
      this.allChosenFiles.push(chosenFiles[i])
    }
    // this.chosenFiles = [...this.chosenFiles.slice(), ...newChosenFiles.slice()]
  }

  private removeDuplicateChosenFiles(chosenFiles: FileList) {
    this.chosenFiles = []
    this.cannotBeChosen = []
    for (let i = 0; i < chosenFiles.length; i++) {
      if (
        !this.chosenFiles.some(
          (chosenFile) => chosenFile.fileName == chosenFiles[i].name
        ) &&
        !this.uploadItems.some(
          (uploadFile) => uploadFile.fileName == chosenFiles[i].name
        )
      ) {
        this.chosenFiles.push({
          state: 'pending',
          fileName: chosenFiles[i].name,
          fileSize: chosenFiles[i].size,
          fileType: chosenFiles[i].type,
          progress: 0,
        })
      } else {
        /* TODO: Show error message to the user */
        console.log(
          `${chosenFiles[i].name} cannot be chosen since a file with the same name has been chosen already.`
        )
        // this.cannotBeChosen.concat(chosenFiles[i].name)
        this.cannotBeChosen.push(chosenFiles[i].name)
        console.log('cannotbechosen', this.cannotBeChosen)
      }
    }
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

    // console.log(files)

    this.fileList = files
    // console.log('filelist input getFile', this.fileList)
    this.removeDuplicateChosenFiles(files)
    this.ldchoosefiles.emit(this.chosenFiles)
    this.addChosenFiles(this.chosenFiles)
    if (this.startUpload) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /* mehrere Input Felder vom Typ file erstellen, alle mit name=file[], wenn Files gedropped
  werden soll ein neuer Input erstellt werden */
  private createFileInput() {
    this.fileInput = document.createElement('input')
    this.fileInput.type = 'file'
    this.fileInput.tabIndex = -1
    this.fileInput.multiple = true
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
    // console.log('filelist handleChooseFiles', this.fileList)
    /* const chosenFiles: UploadItem[] = []
    for (let i = 0; i < chosenFiles.length; i++) {
      this.chosenFiles.push({
        state: 'pending',
        fileName: chosenFiles[i].name,
        fileSize: chosenFiles[i].size,
        fileType: chosenFiles[i].type,
        progress: 0,
      })
    } */
    /* const chosenFiles = Array.from(ev.detail)
    const updatedFiles = chosenFiles.filter(
      (file) =>
        !this.chosenFiles.some(
          (chosenFile) => chosenFile.fileName == file.name
        ) &&
        !this.uploadItems.some((uploadFile) => uploadFile.fileName == file.name)
    )
    console.log('updatedFiles:', updatedFiles)
    // this.fileList = new FileList(updatedFiles)
    // Create a new FileList using the updated array of files
    // return new FileList(updatedFiles) */

    ev.stopImmediatePropagation() // We stop the internal event...
    this.removeDuplicateChosenFiles(ev.detail)
    this.ldchoosefiles.emit(this.chosenFiles) // ...and dispatch the public one.
    this.addChosenFiles(this.chosenFiles)
    if (this.startUpload) {
      this.ldfileuploadready.emit(this.allChosenFiles)
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

  /* TODO: Continue nur einmal erlauben */
  private handleContinueClick = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!this.startUpload) {
      this.ldfileuploadready.emit(this.allChosenFiles)
    }
  }

  /* TODO: State management dem user überlassen, hier nur Event emitten */
  private handleDeleteAllClick = () => {
    this.ldfileuploaddeleteall.emit(this.uploadItems)
    /* this.uploadItems = [] */
    this.allChosenFiles = []
  }

  componentWillLoad() {
    this.createFileInput()
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
    if (this.renderOnlyChooseFile) {
      const cl = getClassNames([
        'ld-file-upload',
        this.renderOnlyChooseFile && 'ld-file-upload--only-choose-file',
      ])
      return (
        <Host class={cl}>
          <ld-choose-file
            class="ld-file-upload__choose-file"
            size="bg"
            onLdchoosefiles={this.handleChooseFiles}
          >
            <slot>
              <pre>Upload button</pre>
            </slot>
          </ld-choose-file>
        </Host>
      )
    }

    return (
      <Host class="ld-file-upload">
        <ld-choose-file
          class="ld-file-upload__choose-file"
          size="sm"
          onLdchoosefiles={this.handleChooseFiles}
        >
          <slot>
            <pre>Upload button</pre>
          </slot>
        </ld-choose-file>
        {/* <div class="ld-file-upload__error">
          <ld-typo>
            Error: File cannot be chosen since a file with the same name has
            been chosen already. To upload this file please remove the file with
            the same name.
          </ld-typo>
        </div> */}
        {this.cannotBeChosen.length != 0 ? (
          <ld-typo class="ld-file-upload__error">
            Error: {this.cannotBeChosen.join(', ')} cannot be chosen since a
            file with the same name has been chosen already. To upload this file
            please remove the file with the same name.
          </ld-typo>
        ) : undefined}
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
